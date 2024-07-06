import {
  IdentitasSekolah,
  PreviewMain,
  TentangSekolahTab,
} from '@/features/website/profil/tentangSekolah'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { GetTentangSekolahType } from '@/types/website/profil/tentangSekolahType'
import {
  useCreateTentangSekolahMutation,
  useDeleteTentangSekolahMutation,
  useGetTentangSekolahQuery,
} from '@/store/slices/website/profilAPI/tentangAPI'
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

export default function TentangSekolah() {
  const navigate = useNavigate()

  const [menu, setMenu] = useState<string>('Preview')
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
    isFetching: isFetchingTentangSekolah,
    isLoading: isLoadingTentangSekolah,
    isError: isErrorTentangSekolah,
    error: errorTentangSekolah,
  } = useGetTentangSekolahQuery()

  const loadingTentangSekolah =
    isLoadingTentangSekolah || isFetchingTentangSekolah

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
        }, 3000)
      }
    }
  }, [isErrorTentangSekolah, errorTentangSekolah])

  // --- Delete ---
  const [
    deleteTentang,
    {
      isError: isErrorDeleteTentang,
      isLoading: isLoadingDeleteTentang,
      isSuccess: isSuccessDeleteTentang,
      error: errorDeleteTentang,
    },
  ] = useDeleteTentangSekolahMutation()

  const handleSubmitDelete = async (id: string) => {
    try {
      await deleteTentang({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteTentang) {
      toast.success('Delete berhasil', {
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
      setMenu('Preview')
    }
  }, [isSuccessDeleteTentang])

  useEffect(() => {
    if (isErrorDeleteTentang) {
      const errorMsg = errorDeleteTentang as { data?: { message?: string } }

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
  }, [isErrorDeleteTentang, errorDeleteTentang])

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
    menu === 'Tujuan'
      ? tujuanSekolah
      : menu === 'Hasil'
        ? hasilSekolah
        : menu === 'Sasaran'
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
      id: item?.id,
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
      {loadingTentangSekolah ? (
        <Loading />
      ) : (
        <>
          <div className="flex">
            <TentangSekolahTab
              menu={menu}
              setMenu={setMenu}
              data={dataTentang}
            />
          </div>
          <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48 pb-48">
            {menu === 'Preview' ? (
              <PreviewMain
                data={dataTentang}
                setMenu={setMenu}
                handleSubmitDelete={handleSubmitDelete}
                isLoadingDelete={isLoadingDeleteTentang}
              />
            ) : menu === 'Identitas' ? (
              <IdentitasSekolah />
            ) : menu === 'Tujuan' || menu === 'Sasaran' || menu === 'Hasil' ? (
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
