import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useWebsiteAkses } from './useWebsiteAkses'
import { useEffect, useState } from 'react'
import { usePathname } from '@/hooks/usePathname'
import {
  EditGambarSchema,
  KategoriSchema,
  TambahGambarSchema,
  TambahKategoriSchema,
} from '@/schemas/website/kategoriSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import {
  GetWebsiteDashboardBerita,
  GetWebsiteKategoriDetailType,
  GetWebsiteKategoriType,
  KategoriGambarType,
} from '@/types/website/kategoriType'
import { Meta } from '@/store/api'
import {
  useCreateGambarMutation,
  useCreateKategoriMutation,
  useDeleteGambarMutation,
  useDeleteKategoriMutation,
  useGetDashboardBeritaQuery,
  useGetKategoriDetailQuery,
  useGetKategoriQuery,
  useUpdateGambarMutation,
  useUpdatePublishMutation,
} from '@/store/slices/website/kategoriAPI'
import { Bounce, toast } from 'react-toastify'
import { convertSlugToText } from '@/utils/formatText'

export function useWebsiteKategori() {
  const navigate = useNavigate()
  const { secondPathname, lastPathname } = usePathname()
  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } =
    useWebsiteAkses()

  const [menu, setMenu] = useState<string>('')

  const defaultMenus = {
    pengumuman: 'Publish',
    mading: 'Publish',
    berita: 'Dashboard',
    agenda: 'Publish',
    prestasi: 'Publish',
  }

  useEffect(() => {
    if (secondPathname) {
      setMenu(defaultMenus[secondPathname] || '')
    }
  }, [secondPathname, setMenu])

  const [search, setSearch] = useState<string>('')
  const [id_kategori, setIdKategori] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [isShowPublish, setIsShowPublish] = useState<boolean>(false)
  const [isShowTambahGambar, setIsShowTambahGambar] = useState<boolean>(false)
  const [isShowTambahKategori, setIsShowTambahKategori] =
    useState<boolean>(false)
  const [isShowEditGambar, setIsShowEditGambar] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null
  const idKategori = localStorage.getItem('ID') ?? ''

  const formPublish = useForm<zod.infer<typeof KategoriSchema>>({
    resolver: zodResolver(KategoriSchema),
    defaultValues: {},
  })

  const formTambahGambar = useForm<zod.infer<typeof TambahGambarSchema>>({
    resolver: zodResolver(TambahGambarSchema),
    defaultValues: {},
  })

  const formTambahKategori = useForm<zod.infer<typeof TambahKategoriSchema>>({
    resolver: zodResolver(TambahKategoriSchema),
    defaultValues: {},
  })

  const formEditGambar = useForm<zod.infer<typeof EditGambarSchema>>({
    resolver: zodResolver(EditGambarSchema),
    defaultValues: {},
  })

  // --- Data Kategori ---
  const [dataKategori, setDataKategori] = useState<GetWebsiteKategoriType[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataKategoriSekolah,
    isFetching: isFetchingKategori,
    isLoading: isLoadingKategori,
    isError: isErrorKategori,
    error: errorKategori,
    isSuccess: isSuccessKategori,
  } = useGetKategoriQuery({
    id_kategori: id_kategori,
    search: search,
    page_number: pageNumber,
    page_size: pageSize,
    jenis: secondPathname,
    status: menu === 'Publish' ? '1' : menu === 'Draft' ? '0' : '',
  })

  const loadingKategori = isLoadingKategori || isFetchingKategori

  useEffect(() => {
    if (dataKategoriSekolah?.data) {
      setDataKategori(dataKategoriSekolah?.data?.data)
      setMeta(dataKategoriSekolah?.data?.meta)
    }
  }, [
    dataKategoriSekolah?.data,
    pageNumber,
    pageSize,
    search,
    id_kategori,
    menu,
  ])

  useEffect(() => {
    if (isSuccessKategori) {
      formPublish.reset()
      setIdKategori('')
    }
  }, [isSuccessKategori])

  useEffect(() => {
    if (isErrorKategori) {
      const errorMsg = errorKategori as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })

      if (errorMsg?.data?.message?.includes('Token')) {
        setTimeout(() => {
          Cookies.remove('token')
          navigate(`/`)
        }, 3000)
      }
    }
  }, [isErrorKategori, errorKategori])

  // --- Delete Kategori ---
  const [
    deleteKategori,
    {
      isError: isErrorDeleteKategori,
      isLoading: isLoadingDeleteKategori,
      isSuccess: isSuccessDeleteKategori,
      error: errorDeleteKategori,
    },
  ] = useDeleteKategoriMutation()

  const handleSubmitDelete = async (id: string) => {
    if (!isHakAksesHapus) {
      toast.error(`Maaf, anda tidak memiliki akses untuk menghapus data ini`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }

    try {
      await deleteKategori({ id: id, jenis: secondPathname })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteKategori) {
      toast.success(`Delete ${secondPathname} berhasil`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setIsShowDelete(false)
    }
  }, [isSuccessDeleteKategori])

  useEffect(() => {
    if (isErrorDeleteKategori) {
      const errorMsg = errorDeleteKategori as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setIsShowDelete(false)
    }
  }, [isErrorDeleteKategori, errorDeleteKategori])

  // --- Publish Kategori ---
  const [
    publishKategori,
    {
      isError: isErrorPublishKategori,
      isLoading: isLoadingPublishKategori,
      isSuccess: isSuccessPublishKategori,
      error: errorPublishKategori,
    },
  ] = useUpdatePublishMutation()

  const handleSubmitPublish = async (id: string, publish: string) => {
    const body = {
      id: id,
      publish: publish,
    }

    if (!isHakAksesUbah) {
      toast.error(`Maaf, anda tidak memiliki akses untuk mengubah data ini`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }

    try {
      await publishKategori({ body: body, jenis: secondPathname })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessPublishKategori) {
      toast.success(`Update ${secondPathname} berhasil`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setIsShowPublish(false)
    }
  }, [isSuccessPublishKategori])

  useEffect(() => {
    if (isErrorPublishKategori) {
      const errorMsg = errorPublishKategori as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setIsShowPublish(false)
    }
  }, [isErrorPublishKategori, errorPublishKategori])

  // --- Create Tambah Gambar ---
  const [
    createTambahGambar,
    {
      isError: isErrorTambahGambar,
      error: errorTambahGambar,
      isLoading: isLoadingTambahGambar,
      isSuccess: isSuccessTambahGambar,
    },
  ] = useCreateGambarMutation()

  const handleSubmitTambahGambar = async () => {
    const values = formTambahGambar.watch()

    const body = {
      id_pengumuman: idEdit,
      id_berita: idEdit,
      id_agenda: idEdit,
      id_prestasi: idEdit,
      id_mading: idEdit,
      gambar: values?.gambar,
    }

    if (!isHakAksesTambah) {
      toast.error(
        `Maaf, anda tidak memiliki akses untuk ${isEdit ? 'mengubah' : 'menambah'} data ini`,
        {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        },
      )
    }

    if (isSubmit && isShowTambahGambar) {
      try {
        await createTambahGambar({ body: body, jenis: secondPathname })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessTambahGambar) {
      toast.success(`${isEdit ? 'Edit' : 'Tambah'} gambar berhasil`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setIsSubmit(false)
      setIsShowTambahGambar(false)
      setTimeout(() => {
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessTambahGambar])

  useEffect(() => {
    if (isErrorTambahGambar) {
      const errorMsg = errorTambahGambar as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setIsSubmit(false)
      setIsShowTambahGambar(false)
    }
  }, [isErrorTambahGambar, errorTambahGambar])

  // --- Data DetailKategori ---
  const [dataDetailKategori, setDataDetailKategori] =
    useState<GetWebsiteKategoriDetailType>()
  const [dataGambarKategori, setDataGambarKategori] = useState<
    KategoriGambarType[]
  >([])

  const {
    data: dataDetailKategoriSekolah,
    isError: isErrorDetailKategoriSekolah,
    error: errorDetailKategoriSekolah,
  } = useGetKategoriDetailQuery(
    {
      id: idEdit,
      jenis: secondPathname,
    },
    { skip: !idEdit },
  )

  useEffect(() => {
    if (dataDetailKategoriSekolah?.data) {
      setDataDetailKategori(dataDetailKategoriSekolah?.data?.data)
      setDataGambarKategori(dataDetailKategoriSekolah?.data?.gambar)
    }
  }, [dataDetailKategoriSekolah?.data])

  useEffect(() => {
    if (isErrorDetailKategoriSekolah) {
      const errorMsg = errorDetailKategoriSekolah as {
        data?: { message?: string }
      }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })

      if (errorMsg?.data?.message?.includes('Token')) {
        setTimeout(() => {
          Cookies.remove('token')
          navigate(`/`)
        }, 3000)
      }
    }
  }, [isErrorDetailKategoriSekolah, errorDetailKategoriSekolah])

  // --- Create Tambah Kategori ---
  const [
    createUpdateKategori,
    {
      isError: isErrorUpdateKategori,
      error: errorUpdateKategori,
      isLoading: isLoadingUpdateKategori,
      isSuccess: isSuccessUpdateKategori,
    },
  ] = useCreateKategoriMutation()

  const handleSubmitUpdateKatefori = async () => {
    const values = formTambahKategori.watch()

    const body = {
      id: isEdit ? idEdit : null,
      id_kategori: values?.id_kategori,
      id_tags: values?.id_tags ?? [],
      tanggal: values?.tanggal ?? '',
      judul: values?.judul ?? '',
      deskripsi_singkat: values?.deskripsi_singkat ?? '',
      isi: values?.isi ?? '',
      publish: values?.publish ?? '1',
      gambar: values?.gambar ?? [],
    }

    if ((isEdit && !isHakAksesUbah) || (!isEdit && !isHakAksesTambah)) {
      toast.error(
        `Maaf, anda tidak memiliki akses untuk ${isEdit ? 'mengubah' : 'menambah'} data ini`,
        {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        },
      )
    }

    if (isSubmit && isShowTambahGambar) {
      try {
        await createUpdateKategori({
          body: body,
          jenis: secondPathname,
          aksi: isEdit ? 'edit' : 'tambah',
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessUpdateKategori) {
      toast.success(
        `${isEdit ? 'Update' : 'Tambah'} ${convertSlugToText(secondPathname).toLowerCase()} berhasil`,
        {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        },
      )
      setIsShowTambahGambar(false)
      setIsSubmit(false)
      setTimeout(() => {
        formTambahKategori.reset()
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessUpdateKategori])

  useEffect(() => {
    if (isErrorUpdateKategori) {
      const errorMsg = errorUpdateKategori as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorUpdateKategori, errorUpdateKategori])

  useEffect(() => {
    if (dataDetailKategori) {
      formTambahKategori.setValue('judul', dataDetailKategori?.judul)
      formTambahKategori.setValue(
        'id_kategori',
        dataDetailKategori?.id_kategori,
      )
      formTambahKategori.setValue(
        'deskripsi_singkat',
        dataDetailKategori?.deskripsi_singkat,
      )
      formTambahKategori.setValue('isi', dataDetailKategori?.isi)
      formTambahKategori.setValue('publish', dataDetailKategori?.publish)
      const date = dataDetailKategori?.tanggal
      const dateSplit = date?.split('-')
      const newDate = `${dateSplit[0]}-${dateSplit[1]}-${dateSplit[2]}`

      formTambahKategori.setValue(
        'tanggal',
        dataDetailKategori?.tanggal === '' || !dataDetailKategori?.tanggal
          ? ''
          : newDate,
      )

      const idArray = dataDetailKategori?.tags?.map((data) => data?.id)
      const namaArray = dataDetailKategori?.tags?.map((data) => data?.nama)

      formTambahKategori.setValue('id_tags', idArray)
      formTambahKategori.setValue('label_tags', namaArray)
    }
  }, [dataDetailKategori])

  // --- Delete ---
  const [
    deleteGambar,
    {
      isError: isErrorDeleteGambar,
      isLoading: isLoadingDeleteGambar,
      isSuccess: isSuccessDeleteGambar,
      error: errorDeleteGambar,
    },
  ] = useDeleteGambarMutation()

  const handleSubmitDeleteGambar = async (id: string) => {
    if (!isHakAksesUbah) {
      toast.error(`Maaf, anda tidak memiliki akses untuk mengubah data`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }

    try {
      await deleteGambar({ id: id, jenis: secondPathname })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteGambar) {
      toast.success('Delete gambar berhasil', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setIsShowDelete(false)
    }
  }, [isSuccessDeleteGambar])

  useEffect(() => {
    if (isErrorDeleteGambar) {
      const errorMsg = errorDeleteGambar as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorDeleteGambar, errorDeleteGambar])

  // --- Create Edit Gambar ---
  const [
    createEditGambar,
    {
      isError: isErrorEditGambar,
      error: errorEditGambar,
      isLoading: isLoadingEditGambar,
      isSuccess: isSuccessEditGambar,
    },
  ] = useUpdateGambarMutation()

  const handleSubmitEditGambar = async () => {
    const values = formEditGambar.getValues()

    const body = {
      id_pengumuman: idEdit,
      id_gambar: idKategori,
      id_mading: idEdit,
      id_prestasi: idEdit,
      id_agenda: idEdit,
      id_berita: idEdit,
      keterangan: values?.keterangan,
      url_gambar: values?.url_gambar,
    }

    if (!isHakAksesUbah) {
      toast.error(`Maaf, anda tidak memiliki akses untuk mengubah data ini`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }

    if (isSubmit && isShowEditGambar) {
      try {
        await createEditGambar({ body: body, jenis: secondPathname })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessEditGambar) {
      toast.success(`Update gambar berhasil`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setIsShowEditGambar(false)
      setIsSubmit(false)
      setTimeout(() => {
        localStorage.setItem('editID', idEdit)
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessEditGambar])

  useEffect(() => {
    if (isErrorEditGambar) {
      const errorMsg = errorEditGambar as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setIsShowEditGambar(false)
      setIsSubmit(false)
    }
  }, [isErrorEditGambar, errorEditGambar])

  const data = localStorage.getItem('editData') ?? ''

  useEffect(() => {
    if (data) {
      const item = JSON.parse(data)
      formEditGambar.setValue('keterangan', item?.keterangan)
      formEditGambar.setValue('url_gambar', item?.gambar)
    }
  }, [data])

  const [dataDashboard, setDataDashboard] =
    useState<GetWebsiteDashboardBerita>()

  const {
    data: dataDashboardSekolah,
    isFetching: isFetchingDashboard,
    isLoading: isLoadingDashboard,
  } = useGetDashboardBeritaQuery()

  const isLoadingBeritaDashboard = isFetchingDashboard || isLoadingDashboard

  useEffect(() => {
    if (dataDashboardSekolah) {
      setDataDashboard(dataDashboardSekolah?.data)
    }
  }, [dataDashboardSekolah?.data])

  return {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    search,
    setSearch,
    setIdKategori,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    isShowDelete,
    setIsShowDelete,
    isShowPublish,
    setIsShowPublish,
    dataKategori,
    loadingKategori,
    meta,
    handleSubmitDelete,
    isLoadingDeleteKategori,
    handleSubmitPublish,
    isLoadingPublishKategori,
    menu,
    setMenu,
    formPublish,
    isShowTambahGambar,
    setIsShowTambahGambar,
    isSubmit,
    setIsSubmit,
    handleSubmitTambahGambar,
    isLoadingTambahGambar,
    formTambahGambar,
    idEdit,
    isEdit,
    lastPathname,
    secondPathname,
    dataDetailKategori,
    isShowTambahKategori,
    setIsShowTambahKategori,
    handleSubmitUpdateKatefori,
    isLoadingUpdateKategori,
    formTambahKategori,
    handleSubmitDeleteGambar,
    isLoadingDeleteGambar,
    id: idEdit,
    dataGambarKategori,
    isShowEditGambar,
    setIsShowEditGambar,
    handleSubmitEditGambar,
    isLoadingEditGambar,
    formEditGambar,
    isLoadingBeritaDashboard,
    dataDashboard,
  }
}
