import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { Loading } from '@/components/Loading'
import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'
import { ComingSoonPage } from '@/routes/loadables'
import FormTambahProfil from '@/components/Form/website/profil/FormTambahProfil'
import { TentangSekolahSchema } from '@/schemas/website/tentangSekolahSchema'
import { useGetVisiMisiQuery } from '@/store/slices/website/profilAPI/visiMisiAPI'
import { ProfilSekolahType } from '@/types/website/profil/tentangSekolahType'
import { useCreateTentangSekolahMutation } from '@/store/slices/website/profilAPI/tentangAPI'
import {
  VisiMisiMain,
  VisiMisiTab,
} from '@/features/website/profil/visiMisiSekolah'
import { useAkses } from '@/hooks/useAkses'

export default function VisiMisi() {
  const navigate = useNavigate()
  const { isHakAksesUbah } = useAkses()

  const [menu, setMenu] = useState<string>('Preview')
  const [urls, setUrls] = useState<string>()
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TentangSekolahSchema>>({
    resolver: zodResolver(TentangSekolahSchema),
    defaultValues: {},
  })

  // --- Data VisiMisi ---
  const [dataVisiMisi, setDataVisiMisi] = useState<ProfilSekolahType[]>()

  const {
    data: dataVisiMisiSekolah,
    isFetching: isFetchingVisiMisiSekolah,
    isLoading: isLoadingVisiMisiSekolah,
    isError: isErrorVisiMisiSekolah,
    error: errorVisiMisiSekolah,
  } = useGetVisiMisiQuery()

  const loadingVisiMisiSekolah =
    isLoadingVisiMisiSekolah || isFetchingVisiMisiSekolah

  useEffect(() => {
    if (dataVisiMisiSekolah?.data) {
      setDataVisiMisi(dataVisiMisiSekolah?.data)
    }
  }, [dataVisiMisiSekolah?.data])

  useEffect(() => {
    if (isErrorVisiMisiSekolah) {
      const errorMsg = errorVisiMisiSekolah as { data?: { message?: string } }

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
  }, [isErrorVisiMisiSekolah, errorVisiMisiSekolah])

  const visiSekolah = dataVisiMisi?.find((item) => item?.jenis === 'Visi')
  const misiSekolah = dataVisiMisi?.find((item) => item?.jenis === 'Misi')

  const item =
    menu === 'Visi' ? visiSekolah : menu === 'Misi' ? misiSekolah : visiSekolah

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
    item.urutan = (index + 1)?.toString()
  })

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: item?.id,
      jenis: menu === 'Visi' ? 'Visi' : menu === 'Misi' ? 'Misi' : '',
      keterangan: values?.keterangan ?? '',
      sub_keterangan: values?.sub_keterangan ?? '',
      gambar_url: urls ?? '',
      list: values?.list ?? [],
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
      toast.success(`Edit profil berhasil`, {
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
        setIsSubmit(false)
        setIsShow(false)
        setMenu('Preview')
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
    if (item) {
      form.setValue('keterangan', item?.keterangan)
      form.setValue('sub_keterangan', item?.sub_keterangan)
      form.setValue('jenis', item?.jenis)
      form.setValue('gambar_url', item?.gambar_url)
      setUrls(item?.gambar_url)
      form.setValue('list', item?.list)
    }
  }, [item])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
      {loadingVisiMisiSekolah ? (
        <Loading />
      ) : (
        <>
          <div className="flex">
            <VisiMisiTab menu={menu} setMenu={setMenu} />
          </div>
          <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48 pb-48">
            {menu === 'Preview' ? (
              <VisiMisiMain
                data={dataVisiMisi}
                setMenu={setMenu}
                isUbah={isHakAksesUbah}
              />
            ) : menu === 'Visi' || menu === 'Misi' ? (
              <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto ">
                <p className="font-roboto text-[2.4rem] text-warna-dark">
                  Form Edit {capitalizeFirstLetterFromLowercase(menu)}
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
                  isEdit
                  menu={menu}
                  isTambah={false}
                  isUbah={isHakAksesUbah}
                />
              </div>
            ) : (
              <ComingSoonPage />
            )}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  )
}
