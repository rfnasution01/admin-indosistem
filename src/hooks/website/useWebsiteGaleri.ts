import { useNavigate } from 'react-router-dom'
import { useWebsiteAkses } from './useWebsiteAkses'
import { usePathname } from '../usePathname'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Meta } from '@/store/api'
import {
  useCreateAlbumMutation,
  useCreateGambarAlbumMutation,
  useDeleteAlbumMutation,
  useDeleteGambarAlbumMutation,
  useGetAlbumDetailQuery,
  useGetAlbumQuery,
  useUpdateGambarAlbumMutation,
} from '@/store/slices/website/galeriAPI'
import { Bounce, toast } from 'react-toastify'
import { GetAWebsitelbumType } from '@/types/website/galeriType'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import {
  EditGambarAlbumSchema,
  TambahGaleriSchema,
  TambahGambarAlbumSchema,
} from '@/schemas/website/galeriSchema'
import { convertSlugToText } from '@/utils/formatText'

export function useWebsiteGaleri() {
  const navigate = useNavigate()
  const { lastPathname, secondPathname } = usePathname()

  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } =
    useWebsiteAkses()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null
  const idKategori = localStorage.getItem('ID') ?? ''

  const [menu, setMenu] = useState<string>('Album')
  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [isShowUpdate, setIsShowUpdate] = useState<boolean>(false)
  const [isShowTambahGambar, setIsShowTambahGambar] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  const [pageNumberDetail, setPageNumberDetail] = useState<number>(1)
  const [pageSizeDetail, setPageSizeDetail] = useState<number>(12)
  const [isShowDeleteDetail, setIsShowDeleteDetail] = useState<boolean>(false)
  const [isShowEditGambar, setIsShowEditGambar] = useState<boolean>(false)

  const formUpdateGaleri = useForm<zod.infer<typeof TambahGaleriSchema>>({
    resolver: zodResolver(TambahGaleriSchema),
    defaultValues: {},
  })

  const formEditGambar = useForm<zod.infer<typeof EditGambarAlbumSchema>>({
    resolver: zodResolver(EditGambarAlbumSchema),
    defaultValues: {},
  })

  const formTambahGambar = useForm<zod.infer<typeof TambahGambarAlbumSchema>>({
    resolver: zodResolver(TambahGambarAlbumSchema),
    defaultValues: {},
  })

  // --- Data Galeri ---
  const [dataGaleri, setDataGaleri] = useState<GetAWebsitelbumType[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataGaleriSekolah,
    isFetching: isFetchingGaleri,
    isLoading: isLoadingGaleri,
    isError: isErrorGaleri,
    error: errorGaleri,
  } = useGetAlbumQuery({
    page_number: pageNumber,
    page_size: pageSize,
    search: search,
  })

  const loadingGaleri = isLoadingGaleri || isFetchingGaleri

  useEffect(() => {
    if (dataGaleriSekolah?.data) {
      setDataGaleri(dataGaleriSekolah?.data?.data)
      setMeta(dataGaleriSekolah?.data?.meta)
    }
  }, [dataGaleriSekolah?.data, pageNumber, pageSize, search, menu])

  useEffect(() => {
    if (isErrorGaleri) {
      const errorMsg = errorGaleri as { data?: { message?: string } }

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
  }, [isErrorGaleri, errorGaleri])

  // --- Delete Album ---
  const [
    deleteGaleri,
    {
      isError: isErrorDeleteGaleri,
      isLoading: isLoadingDeleteGaleri,
      isSuccess: isSuccessDeleteGaleri,
      error: errorDeleteGaleri,
    },
  ] = useDeleteAlbumMutation()

  const handleSubmitDeleteAlbum = async (id: string) => {
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
      await deleteGaleri({ id: id, jenis: secondPathname })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteGaleri) {
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
  }, [isSuccessDeleteGaleri])

  useEffect(() => {
    if (isErrorDeleteGaleri) {
      const errorMsg = errorDeleteGaleri as { data?: { message?: string } }

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
  }, [isErrorDeleteGaleri, errorDeleteGaleri])

  // --- Data DetailGaleri ---
  const [dataDetailGaleri, setDataDetailGaleri] =
    useState<GetAWebsitelbumType>()
  const [dataPhoto, setDataPhoto] = useState<GetAWebsitelbumType[]>()
  const [metaDetail, setMetaDetail] = useState<Meta>()

  const {
    data: dataDetailGaleriSekolah,
    isLoading: isLoadingDetailGaleriSekolah,
    isFetching: isFetchingDetailGaleriSekolah,
    isError: isErrorDetailGaleriSekolah,
    error: errorDetailGaleriSekolah,
  } = useGetAlbumDetailQuery(
    {
      id: idEdit,
      page_number: pageNumberDetail,
      page_size: pageSizeDetail,
    },
    { skip: !idEdit || idEdit === 'undefined' },
  )

  const loadingDetail =
    isFetchingDetailGaleriSekolah || isLoadingDetailGaleriSekolah

  useEffect(() => {
    if (dataDetailGaleriSekolah?.data) {
      setDataDetailGaleri(dataDetailGaleriSekolah?.data?.data)
      setMetaDetail(dataDetailGaleriSekolah?.data?.meta)
      setDataPhoto(dataDetailGaleriSekolah?.data?.photo)
    }
  }, [dataDetailGaleriSekolah?.data, pageNumber, pageSize, idEdit])

  useEffect(() => {
    if (isErrorDetailGaleriSekolah) {
      const errorMsg = errorDetailGaleriSekolah as {
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
  }, [isErrorDetailGaleriSekolah, errorDetailGaleriSekolah])

  // --- Delete Detail ---
  const [
    deleteGambar,
    {
      isError: isErrorDeleteGambar,
      isSuccess: isSuccessDeleteGambar,
      error: errorDeleteGambar,
    },
  ] = useDeleteGambarAlbumMutation()

  const handleSubmitDeleteGambar = async (id: string) => {
    if (!isHakAksesHapus) {
      toast.error(`Maaf, anda tidak memiliki akses untuk menghapus data`, {
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
      await deleteGambar({ id: id })
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
      setIsShowDeleteDetail(false)
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
      setIsShowDeleteDetail
    }
  }, [isErrorDeleteGambar, errorDeleteGambar])

  // --- Create Tambah Galeri ---
  const [
    createUpdateGaleri,
    {
      isError: isErrorUpdateGaleri,
      error: errorUpdateGaleri,
      isLoading: isLoadingUpdateGaleri,
      isSuccess: isSuccessUpdateGaleri,
    },
  ] = useCreateAlbumMutation()

  const handleSubmitUpdate = async () => {
    const values = formUpdateGaleri.getValues()

    const body = {
      id: isEdit ? idEdit : null,
      judul: values?.judul ?? '',
      url_gambar: values?.url_gambar,
      photo: values?.gambar ?? [],
    }

    if ((isEdit && !isHakAksesUbah) || (!isEdit && !isHakAksesTambah)) {
      toast.error(
        `Maaf, anda tidak memiliki akses untuk ${isEdit ? 'mengubah' : 'menambah'} data`,
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

    if (isSubmit && isShowUpdate) {
      try {
        await createUpdateGaleri({
          body: body,
          aksi: isEdit ? 'edit' : 'tambah',
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessUpdateGaleri) {
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
      setIsSubmit(false)
      setIsShowUpdate(false)
      setTimeout(() => {
        formUpdateGaleri.reset()
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessUpdateGaleri])

  useEffect(() => {
    if (isErrorUpdateGaleri) {
      const errorMsg = errorUpdateGaleri as { data?: { message?: string } }

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
      setIsShowUpdate(false)
      setIsSubmit(false)
    }
  }, [isErrorUpdateGaleri, errorUpdateGaleri])

  useEffect(() => {
    if (dataDetailGaleri) {
      const data = dataDetailGaleri

      formUpdateGaleri.setValue('judul', data?.judul)
      formUpdateGaleri.setValue('url_gambar', data?.url_gambar)
    }
  }, [dataDetailGaleri])

  // --- Create Edit Gambar ---
  const [
    createEditGambar,
    {
      isError: isErrorEditGambar,
      error: errorEditGambar,
      isLoading: isLoadingEditGambar,
      isSuccess: isSuccessEditGambar,
    },
  ] = useUpdateGambarAlbumMutation()

  const handleSubmitEditGambar = async () => {
    const values = formEditGambar.getValues()

    const body = {
      id_galeri: idEdit,
      id_gambar: idKategori,
      judul: values?.judul,
      url_gambar: values?.url_gambar,
    }

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

    if (isSubmit && isShowEditGambar) {
      try {
        await createEditGambar({ body: body })
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
      console.log({ item })

      formEditGambar.setValue('judul', item?.judul)
      formEditGambar.setValue('url_gambar', item?.url_gambar)
    }
  }, [data])

  // --- Create Tambah Gambar ---
  const [
    createTambahGambar,
    {
      isError: isErrorTambahGambar,
      error: errorTambahGambar,
      isLoading: isLoadingTambahGambar,
      isSuccess: isSuccessTambahGambar,
    },
  ] = useCreateGambarAlbumMutation()

  const handleSubmitTambahGambar = async () => {
    const values = formTambahGambar.getValues()

    const body = {
      id_galeri: idEdit,
      gambar: values?.gambar,
    }

    if (!isHakAksesTambah) {
      toast.error(
        `Maaf, anda tidak memiliki akses untuk ${isEdit ? 'mengubah' : 'menambah'} data`,
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
        await createTambahGambar({ body: body })
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
      setIsShowTambahGambar(false)
    }
  }, [isErrorTambahGambar, errorTambahGambar])

  return {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    menu,
    setMenu,
    search,
    setSearch,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    isShowDelete,
    setIsShowDelete,
    dataGaleri,
    meta,
    loadingGaleri,
    handleSubmitDeleteAlbum,
    isLoadingDeleteGaleri,
    lastPathname,
    secondPathname,
    pageNumberDetail,
    pageSizeDetail,
    setPageNumberDetail,
    setPageSizeDetail,
    isShowDeleteDetail,
    setIsShowDeleteDetail,
    dataDetailGaleri,
    metaDetail,
    dataPhoto,
    loadingDetail,
    handleSubmitDeleteGambar,
    isLoadingDetailGaleriSekolah,
    idEdit,
    isShowUpdate,
    setIsShowUpdate,
    isLoadingUpdateGaleri,
    handleSubmitUpdate,
    formUpdateGaleri,
    isSubmit,
    setIsSubmit,
    isEdit,
    formEditGambar,
    handleSubmitEditGambar,
    isLoadingEditGambar,
    isShowEditGambar,
    setIsShowEditGambar,
    isShowTambahGambar,
    setIsShowTambahGambar,
    handleSubmitTambahGambar,
    isLoadingTambahGambar,
    formTambahGambar,
  }
}
