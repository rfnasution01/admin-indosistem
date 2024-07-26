import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useWebsiteAkses } from '../useWebsiteAkses'
import { useEffect, useState } from 'react'
import { GetWebsiteFasilitasType } from '@/types/website/profil/fasilitasType'
import { Meta } from '@/store/api'
import {
  useCreateFasilitasMutation,
  useDeleteFasilitasMutation,
  useGetFasilitasQuery,
} from '@/store/slices/website/profilAPI/fasilitasAPI'
import { Bounce, toast } from 'react-toastify'
import { usePathname } from '@/hooks/usePathname'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { FasilitasSekolahSchema } from '@/schemas/website/fasilitasSekolahSchema'

export function useWebsiteFasilitas() {
  const navigate = useNavigate()
  const { lastPathname, thirdPathname } = usePathname()
  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } =
    useWebsiteAkses()

  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [isShow, setIsShow] = useState<boolean>(false)

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null
  const editData = localStorage.getItem('editData') ?? ''

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShowUpdate, setIsShowUpdate] = useState<boolean>(false)

  const formUpdateFasilitas = useForm<zod.infer<typeof FasilitasSekolahSchema>>(
    {
      resolver: zodResolver(FasilitasSekolahSchema),
      defaultValues: {},
    },
  )

  const [dataFasilitas, setDataFasilitas] = useState<GetWebsiteFasilitasType[]>(
    [],
  )
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataFasilitasSekolah,
    isLoading: isLoadingFasilitas,
    isFetching: isFetchingFasilitas,
    isError: isErrorFasilitas,
    error: errorFasilitas,
  } = useGetFasilitasQuery({
    search: search ?? '',
    page_number: pageNumber,
    page_size: pageSize,
  })

  const loadingFasilitas = isLoadingFasilitas || isFetchingFasilitas

  useEffect(() => {
    if (dataFasilitasSekolah?.data) {
      setDataFasilitas(dataFasilitasSekolah?.data?.data)
      setMeta(dataFasilitasSekolah?.data?.meta)
    }
  }, [dataFasilitasSekolah?.data])

  useEffect(() => {
    if (isErrorFasilitas) {
      const errorMsg = errorFasilitas as { data?: { message?: string } }

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
  }, [isErrorFasilitas, errorFasilitas])

  // --- Delete Fasilitaas ---
  const [
    deleteFasilitas,
    {
      isError: isErrorDeleteFasilitas,
      isLoading: isLoadingDeleteFasilitas,
      isSuccess: isSuccessDeleteFasilitas,
      error: errorDeleteFasilitas,
    },
  ] = useDeleteFasilitasMutation()

  const handleSubmitDeleteFasilitas = async (id: string) => {
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
      await deleteFasilitas({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteFasilitas) {
      toast.success('Delete fasilitas berhasil', {
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
      setIsShow(false)
    }
  }, [isSuccessDeleteFasilitas])

  useEffect(() => {
    if (isErrorDeleteFasilitas) {
      const errorMsg = errorDeleteFasilitas as { data?: { message?: string } }

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
      setIsShow(false)
    }
  }, [isErrorDeleteFasilitas, errorDeleteFasilitas])

  // --- Create Tambah Fasilitas ---
  const [
    createTambahFasilitas,
    {
      isError: isErrorTambahFasilitas,
      error: errorTambahFasilitas,
      isLoading: isLoadingTambahFasilitas,
      isSuccess: isSuccessTambahFasilitas,
    },
  ] = useCreateFasilitasMutation()

  const handleSubmitUpdateFasilitas = async () => {
    const values = formUpdateFasilitas.watch()

    const body = {
      id: isEdit ? idEdit : null,
      photo: values?.photo ?? '',
      keterangan: values?.keterangan ?? '',
      nama: values?.nama ?? '',
      jam_operasional:
        values?.jam_mulai && values?.jam_selesai
          ? `${values?.jam_mulai} s/d ${values?.jam_selesai} WIB`
          : '-',
      alamat: values?.alamat ?? '',
      telepon: values?.telepon ?? '',
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
        await createTambahFasilitas({ body: body })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessTambahFasilitas) {
      toast.success(`${isEdit ? 'Edit' : 'Tambah'} Fasilitas berhasil`, {
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
  }, [isSuccessTambahFasilitas])

  useEffect(() => {
    if (isErrorTambahFasilitas) {
      const errorMsg = errorTambahFasilitas as { data?: { message?: string } }

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
  }, [isErrorTambahFasilitas, errorTambahFasilitas])

  useEffect(() => {
    if (isEdit && editData !== '' && idEdit) {
      const item = JSON.parse(editData)

      // Regular expression to match time patterns
      const timePattern = /(\d{2}:\d{2})\s+s\/d\s+(\d{2}:\d{2})/

      const match = item?.jam_operasional?.match(timePattern)

      if (match) {
        const jam_mulai = match[1]
        const jam_selesai = match[2]

        formUpdateFasilitas.setValue('jam_mulai', jam_mulai)
        formUpdateFasilitas.setValue('jam_selesai', jam_selesai)
      } else {
        console.log('Time pattern not found')
      }

      formUpdateFasilitas.setValue('nama', item?.nama)
      formUpdateFasilitas.setValue('keterangan', item?.keterangan)
      formUpdateFasilitas.setValue('alamat', item?.alamat)
      formUpdateFasilitas.setValue('telepon', item?.telepon)
      formUpdateFasilitas.setValue('photo', item?.photo)
    }
  }, [isEdit, editData, idEdit])

  return {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    search,
    setSearch,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    isShow,
    setIsShow,
    dataFasilitas,
    meta,
    loadingFasilitas,
    handleSubmitDeleteFasilitas,
    isLoadingDeleteFasilitas,
    handleSubmitUpdateFasilitas,
    isLoadingTambahFasilitas,
    formUpdateFasilitas,
    isShowUpdate,
    setIsShowUpdate,
    isSubmit,
    setIsSubmit,
    isEdit,
    lastPathname,
    thirdPathname,
  }
}
