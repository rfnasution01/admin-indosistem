import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useWebsiteAkses } from '../useWebsiteAkses'
import { useEffect, useState } from 'react'
import { GetWebsiteTestimoniType } from '@/types/website/profil/testimoniType'
import { Meta } from '@/store/api'
import {
  useCreateTestimoniMutation,
  useDeleteTestimoniMutation,
  useGetTestimoniQuery,
} from '@/store/slices/website/profilAPI/testimoniAPI'
import { Bounce, toast } from 'react-toastify'
import { usePathname } from '@/hooks/usePathname'
import { TestimoniSchema } from '@/schemas/website/testimoniSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'

export function useWebsiteTestimoni() {
  const navigate = useNavigate()
  const { lastPathname, thirdPathname } = usePathname()
  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } =
    useWebsiteAkses()

  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null
  const editData = localStorage.getItem('editData') ?? ''

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShowUpdate, setIsShowUpdate] = useState<boolean>(false)

  const formUpdateTestimoni = useForm<zod.infer<typeof TestimoniSchema>>({
    resolver: zodResolver(TestimoniSchema),
    defaultValues: {},
  })

  const [dataTestimoni, setDataTestimoni] = useState<GetWebsiteTestimoniType[]>(
    [],
  )
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataTestimoniSekolah,
    isLoading: isLoadingTestimoni,
    isFetching: isFetchingTestimoni,
    isError: isErrorTestimoni,
    error: errorTestimoni,
  } = useGetTestimoniQuery({
    search: search ?? '',
    page_number: pageNumber,
    page_size: pageSize,
  })

  const loadingTestimoni = isLoadingTestimoni || isFetchingTestimoni

  useEffect(() => {
    if (dataTestimoniSekolah?.data) {
      setDataTestimoni(dataTestimoniSekolah?.data?.data)
      setMeta(dataTestimoniSekolah?.data?.meta)
    }
  }, [dataTestimoniSekolah?.data])

  useEffect(() => {
    if (isErrorTestimoni) {
      const errorMsg = errorTestimoni as { data?: { message?: string } }

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
  }, [isErrorTestimoni, errorTestimoni])

  // --- Delete Testimoni ---
  const [
    deleteTestimoni,
    {
      isError: isErrorDeleteTestimoni,
      isLoading: isLoadingDeleteTestimoni,
      isSuccess: isSuccessDeleteTestimoni,
      error: errorDeleteTestimoni,
    },
  ] = useDeleteTestimoniMutation()

  const handleSubmitDelete = async (id: string) => {
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
      await deleteTestimoni({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteTestimoni) {
      toast.success('Delete Testimoni berhasil', {
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
  }, [isSuccessDeleteTestimoni])

  useEffect(() => {
    if (isErrorDeleteTestimoni) {
      const errorMsg = errorDeleteTestimoni as { data?: { message?: string } }

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
  }, [isErrorDeleteTestimoni, errorDeleteTestimoni])

  // --- Create Tambah Testimoni ---
  const [
    createTambahTestimoni,
    {
      isError: isErrorTambahTestimoni,
      error: errorTambahTestimoni,
      isLoading: isLoadingTambahTestimoni,
      isSuccess: isSuccessTambahTestimoni,
    },
  ] = useCreateTestimoniMutation()

  const handleSubmitUpdateTestimoni = async () => {
    const values = formUpdateTestimoni.watch()

    const body = {
      id: isEdit ? idEdit : null,
      url_photo: values?.url_photo ?? '',
      nama: values?.nama ?? '',
      keterangan_singkat: values?.keterangan_singkat ?? '',
      isi: values?.isi ?? '',
    }

    if (!isHakAksesTambah) {
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

    if (isSubmit && isShowUpdate) {
      try {
        await createTambahTestimoni({ body: body })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessTambahTestimoni) {
      toast.success(`${isEdit ? 'Edit' : 'Tambah'} testimoni berhasil`, {
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
      setTimeout(() => {
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessTambahTestimoni])

  useEffect(() => {
    if (isErrorTambahTestimoni) {
      const errorMsg = errorTambahTestimoni as { data?: { message?: string } }

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
      setIsShowUpdate(false)
    }
  }, [isErrorTambahTestimoni, errorTambahTestimoni])

  useEffect(() => {
    if (isEdit && editData !== '' && idEdit) {
      const item = JSON.parse(editData)

      formUpdateTestimoni.setValue('nama', item?.nama)
      formUpdateTestimoni.setValue(
        'keterangan_singkat',
        item?.keterangan_singkat,
      )
      formUpdateTestimoni.setValue('isi', item?.isi)
      formUpdateTestimoni.setValue('url_photo', item?.url_photo)
    }
  }, [isEdit, editData, idEdit])

  return {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    isShowDelete,
    setIsShowDelete,
    search,
    setSearch,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    dataTestimoni,
    meta,
    loadingTestimoni,
    handleSubmitDelete,
    isLoadingDeleteTestimoni,
    formUpdateTestimoni,
    handleSubmitUpdateTestimoni,
    isLoadingTambahTestimoni,
    setIsShowUpdate,
    isShowUpdate,
    isSubmit,
    setIsSubmit,
    isEdit,
    lastPathname,
    thirdPathname,
  }
}
