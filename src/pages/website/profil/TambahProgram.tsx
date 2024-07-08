import { Breadcrumb } from '@/components/Breadcrumb'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import {
  GetLayananType,
  GetProgramType,
} from '@/types/website/profil/programLayananType'
import {
  useCreateLayananMutation,
  useCreateProgramMutation,
  useGetLayananQuery,
  useGetProgramQuery,
} from '@/store/slices/website/profilAPI/programLayananAPI'
import { Loading } from '@/components/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faCaretUp,
  faEye,
  faEyeSlash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import FormTambahProgram from '@/components/Form/website/profil/FormTambahProgram'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import {
  LayananSchema,
  ProgramSchema,
} from '@/schemas/website/programLayananSchema'
import FormTambahLayanan from '@/components/Form/website/profil/FormTambahLayanan'
import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'

export default function TambahProgram() {
  const navigate = useNavigate()

  const jenis = localStorage.getItem('jenisID') ?? ''

  const [program, setProgram] = useState<GetProgramType[]>([])
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)
  const [programById, setProgramByID] = useState<GetProgramType>()
  const [layananById, setLayananByID] = useState<GetLayananType>()

  const [urls, setUrls] = useState<string>()
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
    const valuesProgram = formProgram.getValues()
    const valuesLayanan = formLayanan.getValues()

    const bodyProgram = {
      id: programById ? programById?.id : null,
      judul: valuesProgram?.judul ?? '',
      icon: valuesProgram?.icon ?? '',
      photo: urls ?? '',
      isi_singkat: valuesProgram?.isi_singkat,
      isi_lengkap: valuesProgram?.isi_lengkap,
      aktif: valuesProgram?.aktif ?? '1',
    }

    const bodyLayanan = {
      id: layananById ? layananById?.id : null,
      nama_layanan: valuesLayanan?.nama_layanan ?? '',
      icon: urls ?? '',
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
    }
  }, [isErrorTambahLayanan, errorTambahLayanan])

  const {
    data: dataProgram,
    isFetching: isFetchingProgram,
    isLoading: isLoadingProgram,
    isError: isErrorProgram,
    error: errorProgram,
  } = useGetProgramQuery()

  const loadingProgram = isLoadingProgram || isFetchingProgram

  useEffect(() => {
    if (dataProgram?.data) {
      setProgram(dataProgram?.data)
    }
  }, [dataProgram?.data])

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

  const [layanan, setLayanan] = useState<GetLayananType[]>([])

  const {
    data: dataLayanan,
    isFetching: isFetchingLayanan,
    isLoading: isLoadingLayanan,
  } = useGetLayananQuery()

  const loadingLayanan = isLoadingLayanan || isFetchingLayanan

  useEffect(() => {
    if (dataLayanan?.data) {
      setLayanan(dataLayanan?.data)
    }
  }, [dataLayanan?.data])

  const item =
    jenis === 'program' ? program : jenis === 'layanan' ? layanan : []

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id)
  }

  useEffect(() => {
    if (programById && activeAccordion) {
      formProgram?.setValue('judul', programById?.judul)
      formProgram?.setValue('isi_singkat', programById?.isi_singkat)
      formProgram?.setValue('isi_lengkap', programById?.isi_lengkap)
      formProgram?.setValue('photo', programById?.photo)
      setUrls(programById?.photo)
      formProgram?.setValue('aktif', programById?.aktif)
    }
  }, [layananById, activeAccordion])

  useEffect(() => {
    if (layananById && activeAccordion) {
      formLayanan?.setValue('icon', layananById?.icon)
      formLayanan?.setValue('keterangan', layananById?.keterangan)
      formLayanan?.setValue('nama_layanan', layananById?.nama_layanan)
      formLayanan?.setValue('url', layananById?.url)
      setUrls(layananById?.icon)
    }
  }, [layananById, activeAccordion])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="flex flex-col gap-32">
        <div className="flex">
          <div
            onClick={() => {
              toggleAccordion('tambah')
              if (jenis === 'program') {
                formProgram?.reset()
                setProgramByID(null)
                setUrls(null)
              }
              if (jenis === 'layanan') {
                formLayanan?.reset()
                setLayananByID(null)
                setUrls(null)
              }
            }}
            className="flex items-center gap-24 rounded-2xl bg-warna-dark px-24 py-12 text-white hover:cursor-pointer hover:bg-opacity-80"
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>Tambah {capitalizeFirstLetterFromLowercase(jenis)}</p>
          </div>
        </div>
        {activeAccordion === 'tambah' && (
          <div className="flex flex-col gap-32 transition-all duration-300 ease-in-out">
            {jenis === 'program' ? (
              <FormTambahProgram
                form={formProgram}
                isLoading={isLoadingTambahProgram}
                handleSubmit={handleSubmit}
                setUrls={setUrls}
                urls={urls}
                setIsShow={setIsShow}
                setIsSubmit={setIsSubmit}
                isShow={isShow}
                isSubmit={isSubmit}
              />
            ) : (
              <FormTambahLayanan
                form={formLayanan}
                isLoading={isLoadingTambahLayanan}
                handleSubmit={handleSubmit}
                setUrls={setUrls}
                urls={urls}
                setIsShow={setIsShow}
                setIsSubmit={setIsSubmit}
                isShow={isShow}
                isSubmit={isSubmit}
              />
            )}
          </div>
        )}
      </div>
      {loadingLayanan || loadingProgram ? (
        <Loading />
      ) : item?.length > 0 ? (
        <div className="flex flex-col gap-32">
          {item?.map((list, idx) => {
            const isOpen = activeAccordion === list?.id
            return (
              <div className="flex flex-col gap-32" key={idx}>
                <div
                  onClick={() => {
                    toggleAccordion(list?.id)
                    if (jenis === 'program') {
                      setProgramByID(list)
                    }
                    if (jenis === 'layanan') {
                      setLayananByID(list)
                    }
                  }}
                  className="flex items-center gap-24 hover:cursor-pointer"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    className="hover:cursor-pointer hover:text-warna-primary"
                  >
                    {list?.aktif === '1' ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </button>
                  {jenis === 'program' && list?.judul && (
                    <p className="font-roboto text-warna-dark">{list?.judul}</p>
                  )}
                  {jenis === 'layanan' && list?.nama_layanan && (
                    <p className="font-roboto text-warna-dark">
                      {list?.nama_layanan}
                    </p>
                  )}
                  <span>
                    {isOpen ? (
                      <FontAwesomeIcon icon={faCaretUp} />
                    ) : (
                      <FontAwesomeIcon icon={faCaretDown} />
                    )}
                  </span>
                </div>
                {isOpen && (
                  <div className="flex flex-col gap-32 transition-all duration-300 ease-in-out">
                    {jenis === 'program' ? (
                      <FormTambahProgram
                        form={formProgram}
                        isLoading={isLoadingTambahProgram}
                        handleSubmit={handleSubmit}
                        setUrls={setUrls}
                        urls={urls}
                        setIsShow={setIsShow}
                        setIsSubmit={setIsSubmit}
                        isShow={isShow}
                        isSubmit={isSubmit}
                      />
                    ) : (
                      <FormTambahLayanan
                        form={formLayanan}
                        isLoading={isLoadingTambahLayanan}
                        handleSubmit={handleSubmit}
                        setUrls={setUrls}
                        urls={urls}
                        setIsShow={setIsShow}
                        setIsSubmit={setIsSubmit}
                        isShow={isShow}
                        isSubmit={isSubmit}
                      />
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <p>Belum ada data</p>
      )}
      <ToastContainer />
    </div>
  )
}
