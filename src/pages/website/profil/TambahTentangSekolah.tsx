import { Breadcrumb } from '@/components/Breadcrumb'
import { usePathname } from '@/hooks/usePathname'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { TentangSekolahSchema } from '@/schemas/website/tentangSekolahSchema'
import { GetTentangSekolahType } from '@/types/website/profil/tentangSekolahType'
import {
  useCreateTentangSekolahMutation,
  useGetTentangSekolahQuery,
} from '@/store/slices/website/profilAPI/tentangAPI'
import Cookies from 'js-cookie'
import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'
import FormTambahProfil from '@/components/Form/website/profil/FormTambahProfil'

export default function TambahTentangSekolah() {
  const navigate = useNavigate()

  const id = localStorage.getItem('editID') ?? ''
  const jenisId = localStorage.getItem('jenisID') ?? ''

  const { lastPathname, secondPathname } = usePathname()

  const [urls, setUrls] = useState<string>()
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TentangSekolahSchema>>({
    resolver: zodResolver(TentangSekolahSchema),
    defaultValues: {},
  })

  // --- Data Tentang ---
  const [dataTentang, setDataTentang] = useState<GetTentangSekolahType>()

  const {
    data: dataTentangSekolah,
    isError: isErrorTentangSekolah,
    error: errorTentangSekolah,
  } = useGetTentangSekolahQuery()

  useEffect(() => {
    if (dataTentangSekolah?.data) {
      setDataTentang(dataTentangSekolah?.data)
    }
  }, [dataTentangSekolah?.data])

  useEffect(() => {
    if (isErrorTentangSekolah) {
      const errorMsg = errorTentangSekolah as { data?: { message?: string } }

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
        }, 5000)
      }
    }
  }, [isErrorTentangSekolah, errorTentangSekolah])

  const tujuanSekolah = dataTentang?.profil?.find(
    (item) => item?.jenis === 'Tujuan',
  )
  const hasilSekolah = dataTentang?.profil?.find(
    (item) => item?.jenis === 'Hasil',
  )
  const sasaranSekolah = dataTentang?.profil?.find(
    (item) => item?.jenis === 'Sasaran',
  )

  const item =
    jenisId === 'Tujuan'
      ? tujuanSekolah
      : jenisId === 'Hasil'
        ? hasilSekolah
        : jenisId === 'Sasaran'
          ? sasaranSekolah
          : tujuanSekolah

  // --- Create Tambah Profil ---
  const [
    createTambahProfil,
    {
      isError: isErrorTambahProfil,
      error: errorTambahProfil,
      isLoading: isLoadingTambahProfil,
      isSuccess: isSuccessTambahProfil,
    },
  ] = useCreateTentangSekolahMutation()

  const values = form.watch()
  values?.list?.forEach((item, index) => {
    item.urutan = (index + 1).toString()
  })

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: lastPathname === 'edit' ? id : null,
      jenis: values?.jenis ?? '',
      keterangan: values?.keterangan ?? '',
      sub_keterangan: values?.sub_keterangan ?? '',
      gambar_url: urls ?? '',
      list: values?.list ?? [],
    }

    if (isSubmit && isShow) {
      try {
        await createTambahProfil({ body: body })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessTambahProfil) {
      toast.success(
        `${lastPathname === 'edit' ? 'Edit' : 'Tambah'} profil berhasil`,
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
      setTimeout(() => {
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessTambahProfil])

  useEffect(() => {
    if (isErrorTambahProfil) {
      const errorMsg = errorTambahProfil as { data?: { message?: string } }

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
  }, [isErrorTambahProfil, errorTambahProfil])

  useEffect(() => {
    if (lastPathname === 'edit' && item) {
      form.setValue('keterangan', item?.keterangan)
      form.setValue('sub_keterangan', item?.sub_keterangan)
      form.setValue('jenis', item?.jenis)
      form.setValue('gambar_url', item?.gambar_url)
      setUrls(item?.gambar_url)
      form.setValue('list', item?.list)
    }
  }, [dataTentang, id])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {capitalizeFirstLetterFromLowercase(lastPathname)}{' '}
          {capitalizeFirstLetterFromLowercase(secondPathname)}
        </p>
        <FormTambahProfil
          form={form}
          isLoading={isLoadingTambahProfil}
          handleSubmit={handleSubmit}
          setUrls={setUrls}
          urls={urls}
          setIsShow={setIsShow}
          setIsSubmit={setIsSubmit}
          isShow={isShow}
          isSubmit={isSubmit}
        />
      </div>
      <ToastContainer />
    </div>
  )
}
