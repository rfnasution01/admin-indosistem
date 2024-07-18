import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { DaftarPegawai } from '@/types/simpeg/dataPegawai/daftarPegawaiType'
import { Meta } from '@/store/api'
import {
  useDeleteDaftarPegawaiMutation,
  useGetDaftarPegawaiQuery,
  useResetPasswordMutation,
} from '@/store/slices/simpeg/dataPegawai/daftarPegawaiAPI'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { FilterSchema, ResetSchema } from '@/schemas/simpeg/filterSchema'
import { Bounce, toast } from 'react-toastify'
import { useAksesSimpeg } from './useAksesSimpeg'

export function useDaftarPegawai() {
  const navigate = useNavigate()

  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } = useAksesSimpeg()

  const currentYear = new Date().getFullYear().toString()
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0')

  const [search, setSearch] = useState<string>('')
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [jenisKepegawaian, setJenisKepegawaian] = useState<string>('')
  const [statusPegawai, setStatusPegawai] = useState<string>('Aktif')
  const [validasi, setValidasi] = useState<string>('')
  const [tahun, setTahun] = useState<string>(currentYear)
  const [bulan, setBulan] = useState<string>(currentMonth)

  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [isShowReset, setIsShowReset] = useState(false)
  const [id, setId] = useState<string>()

  // --- Data daftarPegawai ---
  const [daftarPegawai, setDaftarPegawai] = useState<DaftarPegawai[]>()
  const [meta, setMeta] = useState<Meta>()

  const {
    data: dataDaftarPegawai,
    isFetching: isFetchingDaftarPegawai,
    isLoading: isLoadingDaftarPegawai,
    isError: isErrorDaftarPegawai,
    error: errorDaftarPegawai,
  } = useGetDaftarPegawaiQuery({
    search: search ?? '',
    page_number: pageNumber,
    page_size: pageSize,
    jenis_kepegawaian: jenisKepegawaian ?? '',
    status_pegawai: statusPegawai ?? '',
    validasi: validasi ?? '',
    tahun: tahun,
    bulan: bulan,
  })

  const loadingDaftarPegawai = isLoadingDaftarPegawai || isFetchingDaftarPegawai

  useEffect(() => {
    if (dataDaftarPegawai?.data) {
      setDaftarPegawai(dataDaftarPegawai?.data?.data)
      setMeta(dataDaftarPegawai?.data?.meta)
    }
  }, [
    dataDaftarPegawai?.data,
    pageNumber,
    pageSize,
    search,
    jenisKepegawaian,
    statusPegawai,
    validasi,
    tahun,
    bulan,
  ])

  const formFilter = useForm<zod.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {},
  })

  const formReset = useForm<zod.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (isErrorDaftarPegawai) {
      const errorMsg = errorDaftarPegawai as { data?: { message?: string } }

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
  }, [isErrorDaftarPegawai, errorDaftarPegawai])

  // --- Delete ---
  const [
    deleteDaftarPegawai,
    {
      isError: isErrorDeleteDaftarPegawai,
      isLoading: isLoadingDeleteDaftarPegawai,
      isSuccess: isSuccessDeleteDaftarPegawai,
      error: errorDeleteDaftarPegawai,
    },
  ] = useDeleteDaftarPegawaiMutation()

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
      await deleteDaftarPegawai({ id_pegawai: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteDaftarPegawai) {
      toast.success(`Delete pegawai berhasil`, {
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
  }, [isSuccessDeleteDaftarPegawai])

  useEffect(() => {
    if (isErrorDeleteDaftarPegawai) {
      const errorMsg = errorDeleteDaftarPegawai as {
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
    }
  }, [isErrorDeleteDaftarPegawai, errorDeleteDaftarPegawai])

  // --- ResetPassword ---
  const [
    resetPasswordDaftarPegawai,
    {
      isError: isErrorResetPasswordDaftarPegawai,
      isLoading: isLoadingResetPasswordDaftarPegawai,
      isSuccess: isSuccessResetPasswordDaftarPegawai,
      error: errorResetPasswordDaftarPegawai,
    },
  ] = useResetPasswordMutation()

  const handleSubmitResetPassword = async () => {
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

    const values = formReset?.watch()

    const body = {
      id_pegawai: id,
      password: values?.password,
    }

    try {
      await resetPasswordDaftarPegawai({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessResetPasswordDaftarPegawai) {
      toast.success(`ResetPassword pegawai berhasil`, {
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
      formReset.reset()
      setIsShowReset(false)
    }
  }, [isSuccessResetPasswordDaftarPegawai])

  useEffect(() => {
    if (isErrorResetPasswordDaftarPegawai) {
      const errorMsg = errorResetPasswordDaftarPegawai as {
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
    }
  }, [isErrorResetPasswordDaftarPegawai, errorResetPasswordDaftarPegawai])

  return {
    search,
    setSearch,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    jenisKepegawaian,
    setJenisKepegawaian,
    statusPegawai,
    setStatusPegawai,
    validasi,
    setValidasi,
    tahun,
    setTahun,
    bulan,
    setBulan,
    data: daftarPegawai,
    meta,
    loadingDaftarPegawai,
    formFilter,
    formReset,
    isHapus: isHakAksesHapus,
    isTambah: isHakAksesTambah,
    isUbah: isHakAksesUbah,
    setIsShowDelete,
    isShowDelete,
    setIsShowReset,
    isShowReset,
    handleSubmitDelete,
    isLoadingDeleteDaftarPegawai,
    isLoadingResetPasswordDaftarPegawai,
    handleSubmitResetPassword,
    setId,
    id,
  }
}
