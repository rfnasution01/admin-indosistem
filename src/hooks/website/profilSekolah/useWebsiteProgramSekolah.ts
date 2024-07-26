import {
  useCreateLayananMutation,
  useCreateProgramMutation,
  useDeleteLayananMutation,
  useDeleteProgramMutation,
  useGetLayananQuery,
  useGetProgramQuery,
} from '@/store/slices/website/profilAPI/programLayananAPI'
import {
  GetWebsiteLayananType,
  GetWebsiteProgramType,
} from '@/types/website/profil/programLayananType'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import {
  LayananSchema,
  ProgramSchema,
} from '@/schemas/website/programLayananSchema'
import { useWebsiteAkses } from '../useWebsiteAkses'

export function useWebsiteProgramSekolah() {
  const navigate = useNavigate()
  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } =
    useWebsiteAkses()

  const jenis = localStorage.getItem('jenisID') ?? ''
  const [dataProgram, setDataProgram] = useState<GetWebsiteProgramType[]>([])
  const [programById, setProgramByID] = useState<GetWebsiteProgramType>()
  const [layananById, setLayananByID] = useState<GetWebsiteLayananType>()
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)

  const [deleteID, setDeleteID] = useState<string>()
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const formProgram = useForm<zod.infer<typeof ProgramSchema>>({
    resolver: zodResolver(ProgramSchema),
    defaultValues: {},
  })

  const formLayanan = useForm<zod.infer<typeof LayananSchema>>({
    resolver: zodResolver(LayananSchema),
    defaultValues: {},
  })

  const {
    data: dataProgramSekolah,
    isFetching: isFetchingProgram,
    isLoading: isLoadingProgram,
    isError: isErrorProgram,
    error: errorProgram,
  } = useGetProgramQuery()

  const loadingProgram = isLoadingProgram || isFetchingProgram

  useEffect(() => {
    if (dataProgramSekolah?.data) {
      setDataProgram(dataProgramSekolah?.data)
    }
  }, [dataProgramSekolah?.data])

  useEffect(() => {
    if (isErrorProgram) {
      const errorMsg = errorProgram as { data?: { message?: string } }

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
  }, [isErrorProgram, errorProgram])

  const [dataLayanan, setDataLayanan] = useState<GetWebsiteLayananType[]>([])

  const {
    data: dataLayananSekolah,
    isFetching: isFetchingLayanan,
    isLoading: isLoadingLayanan,
  } = useGetLayananQuery()

  const loadingLayanan = isLoadingLayanan || isFetchingLayanan

  useEffect(() => {
    if (dataLayananSekolah?.data) {
      setDataLayanan(dataLayananSekolah?.data)
    }
  }, [dataLayananSekolah?.data])

  const item =
    jenis === 'program' ? dataProgram : jenis === 'layanan' ? dataLayanan : []

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  // --- Create Tambah Program ---
  const [
    createTambahProgram,
    {
      isError: isErrorTambahProgram,
      error: errorTambahProgram,
      isLoading: isLoadingTambahProgram,
      isSuccess: isSuccessTambahProgram,
    },
  ] = useCreateProgramMutation()

  const [
    createTambahLayanan,
    {
      isError: isErrorTambahLayanan,
      error: errorTambahLayanan,
      isLoading: isLoadingTambahLayanan,
      isSuccess: isSuccessTambahLayanan,
    },
  ] = useCreateLayananMutation()

  const handleSubmit = async () => {
    const valuesProgram = formProgram.watch()
    const valuesLayanan = formLayanan.watch()

    const bodyProgram = {
      id: programById ? programById?.id : null,
      judul: valuesProgram?.judul ?? '',
      icon: valuesProgram?.icon ?? '',
      photo: valuesProgram?.photo ?? '',
      isi_singkat: valuesProgram?.isi_singkat,
      isi_lengkap: valuesProgram?.isi_lengkap,
      aktif: valuesProgram?.aktif ?? '1',
    }

    if (
      (programById && !isHakAksesUbah) ||
      (!programById && !isHakAksesTambah)
    ) {
      toast.error(
        `Maaf, anda tidak memiliki akses untuk ${programById ? 'mengubah' : 'menambah'} data ini`,
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

    if (!programById && !isHakAksesTambah) {
      toast.error(`Maaf, anda tidak memiliki akses untuk menambah data`, {
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

    const bodyLayanan = {
      id: layananById ? layananById?.id : null,
      nama_layanan: valuesLayanan?.nama_layanan ?? '',
      icon: valuesLayanan?.icon ?? '',
      url: valuesLayanan?.url ?? '',
      keterangan: valuesLayanan?.keterangan,
    }

    if (isSubmit && isShow) {
      try {
        {
          jenis === 'program'
            ? await createTambahProgram({ body: bodyProgram })
            : jenis === 'layanan'
              ? await createTambahLayanan({ body: bodyLayanan })
              : console.log(bodyProgram)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessTambahProgram) {
      toast.success(`${programById ? 'Edit' : 'Tambah'} program berhasil`, {
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
      setIsSubmit(false)
      setTimeout(() => {
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessTambahProgram])

  useEffect(() => {
    if (isErrorTambahProgram) {
      const errorMsg = errorTambahProgram as { data?: { message?: string } }

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
      setIsSubmit(false)
    }
  }, [isErrorTambahProgram, errorTambahProgram])

  useEffect(() => {
    if (isSuccessTambahLayanan) {
      toast.success(`${layananById ? 'Edit' : 'Tambah'} layanan berhasil`, {
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
      setIsSubmit(false)
      setTimeout(() => {
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessTambahLayanan])

  useEffect(() => {
    if (isErrorTambahLayanan) {
      const errorMsg = errorTambahLayanan as { data?: { message?: string } }

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
      setIsSubmit(false)
    }
  }, [isErrorTambahLayanan, errorTambahLayanan])

  useEffect(() => {
    if (programById && activeAccordion) {
      // Gunakan setTimeout untuk memastikan nilai diperbarui secara sinkron
      setTimeout(() => {
        formProgram?.setValue('judul', programById?.judul)
        formProgram?.setValue('isi_singkat', programById?.isi_singkat)
        formProgram?.setValue('isi_lengkap', programById?.isi_lengkap)
        formProgram?.setValue('photo', programById?.photo)
        formProgram?.setValue('aktif', programById?.aktif)
      }, 0)
    }
  }, [activeAccordion, programById])

  useEffect(() => {
    if (layananById && activeAccordion) {
      formLayanan?.setValue('icon', layananById?.icon)
      formLayanan?.setValue('keterangan', layananById?.keterangan)
      formLayanan?.setValue('nama_layanan', layananById?.nama_layanan)
      formLayanan?.setValue('url', layananById?.url)
    }
  }, [layananById, activeAccordion])

  // --- Delete Program---
  const [
    deleteProgram,
    {
      isError: isErrorDeleteProgram,
      isLoading: isLoadingDeleteProgram,
      isSuccess: isSuccessDeleteProgram,
      error: errorDeleteProgram,
    },
  ] = useDeleteProgramMutation()

  const handleSubmitDeleteProgram = async (id: string) => {
    if (!isHakAksesHapus) {
      toast.error('Maaf anda tidak memiliki akses untuk menghapus data ini', {
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
      await deleteProgram({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteProgram) {
      toast.success('Delete program berhasil', {
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
      setDeleteID(null)
    }
  }, [isSuccessDeleteProgram])

  useEffect(() => {
    if (isErrorDeleteProgram) {
      const errorMsg = errorDeleteProgram as { data?: { message?: string } }

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
      setDeleteID(null)
    }
  }, [isErrorDeleteProgram, errorDeleteProgram])

  // --- Delete ---
  const [
    deleteLayanan,
    {
      isError: isErrorDeleteLayanan,
      isLoading: isLoadingDeleteLayanan,
      isSuccess: isSuccessDeleteLayanan,
      error: errorDeleteLayanan,
    },
  ] = useDeleteLayananMutation()

  const handleSubmitDeleteLayanan = async (id: string) => {
    if (!isHakAksesHapus) {
      toast.error('Maaf, anda tidak memiliki akses untuk menghapus data ini', {
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
      await deleteLayanan({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteLayanan) {
      toast.success('Delete layanan berhasil', {
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
      setDeleteID(null)
    }
  }, [isSuccessDeleteLayanan])

  useEffect(() => {
    if (isErrorDeleteLayanan) {
      const errorMsg = errorDeleteLayanan as { data?: { message?: string } }

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
      setDeleteID(null)
    }
  }, [isErrorDeleteLayanan, errorDeleteLayanan])

  return {
    dataProgram,
    loadingProgram,
    dataLayanan,
    loadingLayanan,
    handleSubmit,
    isLoadingTambahLayanan,
    isLoadingTambahProgram,
    setProgramByID,
    setLayananByID,
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    jenis,
    handleSubmitDeleteLayanan,
    handleSubmitDeleteProgram,
    setIsShowDelete,
    isShowDelete,
    isLoadingDeleteLayanan,
    isLoadingDeleteProgram,
    toggleAccordion,
    item,
    deleteID,
    formLayanan,
    formProgram,
    activeAccordion,
    isShow,
    setIsShow,
    isSubmit,
    setIsSubmit,
    setDeleteID,
  }
}
