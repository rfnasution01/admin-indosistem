import {
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
  useUpdateProfilSekolahMutation,
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
import {
  IdentitasSekolahSchema,
  TentangSekolahSchema,
} from '@/schemas/website/tentangSekolahSchema'
import FormUpdateIdentitas from '@/components/Form/website/profil/FormEditIdentitas'
import { GetMenuWebsiteType } from '@/types/website/menuType'
import { useGetMenuWebsiteQuery } from '@/store/slices/website/menuAPI'
import { getPaths, usePathname } from '@/hooks/usePathname'

export default function TentangSekolah() {
  const navigate = useNavigate()
  const { pathname } = usePathname()

  const [menu, setMenu] = useState<string>('Preview')
  const [urls, setUrls] = useState<string>()
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TentangSekolahSchema>>({
    resolver: zodResolver(TentangSekolahSchema),
    defaultValues: {},
  })

  const formIdentitas = useForm<zod.infer<typeof IdentitasSekolahSchema>>({
    resolver: zodResolver(IdentitasSekolahSchema),
    defaultValues: {},
  })

  const [menuUtama, setMenuUtama] = useState<GetMenuWebsiteType[]>([])
  const { data } = useGetMenuWebsiteQuery()

  useEffect(() => {
    if (data) {
      setMenuUtama(data?.data)
    }
  }, [data])

  const path = getPaths(pathname.slice(1, pathname?.length))

  const hakAkses = menuUtama?.find((item) => item?.link === path)
  const isHakAksesHapus = hakAkses?.hapus === '1'
  const isHakAksesUbah = hakAkses?.ubah === '1'
  const isHakAksesTambah = hakAkses?.ubah === '1'

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
    if (!isHakAksesHapus) {
      toast.error('Maaf, anda tidak memiliki akses untuk hapus data', {
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
    item.urutan = (index + 1)?.toString()
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

    if (!isHakAksesTambah) {
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
      toast.success(`Tambah profil berhasil`, {
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

  // --- Create Update Profil ---
  const [
    createUpdateProfil,
    {
      isError: isErrorUpdateProfil,
      error: errorUpdateProfil,
      isLoading: isLoadingUpdateProfil,
      isSuccess: isSuccessUpdateProfil,
    },
  ] = useUpdateProfilSekolahMutation()

  const handleSubmitIdentitas = async () => {
    const values = formIdentitas.watch()

    const body = {
      jenis: 'Identitas',
      sk_pendirian: values?.sk_pendirian ?? '',
      tgl_sk_pendirian: values?.tgl_sk_pendirian ?? '',
      sk_operasional: values?.sk_operasional ?? '',
      tgl_sk_operasional: values?.tgl_sk_operasional ?? '',
      id_akreditasi: values?.id_akreditasi ?? '',
      tgl_mulai_akreditasi: values?.tgl_mulai_akreditasi ?? '',
      tgl_akhir_akreditasi: values?.tgl_akhir_akreditasi ?? '',
      penyelenggaraan: values?.penyelenggaraan ?? '',
      penyelenggaraan_mulai: values?.penyelenggaraan_mulai ?? '',
      penyelenggaraan_akhir: values?.penyelenggaraan_akhir ?? '',
      nis: values?.nis ?? '',
      nss: values?.nss ?? '',
      alamat: values?.alamat ?? '',
      email: values?.email ?? '',
      telepon: values?.telepon ?? '',
      nama_pimpinan: values?.nama_pimpinan ?? '',
      nip_pimpinan: values?.nip_pimpinan ?? '',
      photo_pimpinan: urls,
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

    if (isShow && isSubmit) {
      try {
        await createUpdateProfil({ body: body })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessUpdateProfil) {
      toast.success(`Update profil berhasil`, {
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
        setIsShow(false)
        setIsSubmit(false)
        setMenu('Preview')
      }, 3000)
    }
  }, [isSuccessUpdateProfil])

  useEffect(() => {
    if (isErrorUpdateProfil) {
      const errorMsg = errorUpdateProfil as { data?: { message?: string } }

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
  }, [isErrorUpdateProfil, errorUpdateProfil])

  useEffect(() => {
    if (dataTentang?.identitas) {
      const identitas = dataTentang?.identitas

      formIdentitas.setValue('sk_pendirian', identitas?.sk_pendirian)
      const tglSKPendirian = identitas?.tgl_sk_pendirian
      const splitSKPendirian = tglSKPendirian?.split('-')
      formIdentitas.setValue(
        'tgl_sk_pendirian',
        `${splitSKPendirian?.[0]}-${splitSKPendirian?.[1]}-${splitSKPendirian?.[2]}`,
      )

      formIdentitas.setValue('sk_operasional', identitas?.sk_operasional)

      const tglSKOperasional = identitas?.tgl_sk_operasional
      const splitSKOperasional = tglSKOperasional?.split('-')
      formIdentitas.setValue(
        'tgl_sk_operasional',
        `${splitSKOperasional?.[0]}-${splitSKOperasional?.[1]}-${splitSKOperasional?.[2]}`,
      )

      const tglMulai = identitas?.tgl_mulai_akreditasi
      const splitTglMulai = tglMulai?.split('-')
      formIdentitas.setValue(
        'tgl_mulai_akreditasi',
        `${splitTglMulai?.[0]}-${splitTglMulai?.[1]}-${splitTglMulai?.[2]}`,
      )

      const tglAkhir = identitas?.tgl_akhir_akreditasi
      const splitTglAkhir = tglAkhir?.split('-')
      formIdentitas.setValue(
        'tgl_akhir_akreditasi',
        `${splitTglAkhir?.[0]}-${splitTglAkhir?.[1]}-${splitTglAkhir?.[2]}`,
      )

      formIdentitas.setValue('nis', identitas?.nis)
      formIdentitas.setValue('nss', identitas?.nss)
      formIdentitas.setValue('alamat', identitas?.alamat)
      formIdentitas.setValue('email', identitas?.email)
      formIdentitas.setValue('email', identitas?.email)
      formIdentitas.setValue('telepon', identitas?.telepon)
      formIdentitas.setValue('id_akreditasi', identitas?.id_akreditasi)
      formIdentitas.setValue('penyelenggaraan', identitas?.penyelenggaraan)
      formIdentitas.setValue('photo_pimpinan', identitas?.photo_pimpinan)
      setUrls(identitas?.photo_pimpinan)
      formIdentitas.setValue('nama_pimpinan', identitas?.nama_pimpinan)
      formIdentitas.setValue('nip_pimpinan', identitas?.nip_pimpinan)
      formIdentitas.setValue(
        'penyelenggaraan_mulai',
        identitas?.penyelenggaraan_mulai,
      )
      formIdentitas.setValue(
        'penyelenggaraan_akhir',
        identitas?.penyelenggaraan_akhir,
      )
    }
  }, [dataTentang?.identitas])

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
                isUbah={isHakAksesUbah}
                isHapus={isHakAksesHapus}
                isTambah={isHakAksesTambah}
              />
            ) : menu === 'Identitas' ? (
              <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto ">
                <p className="font-roboto text-[2.4rem] text-warna-dark">
                  Form Edit {capitalizeFirstLetterFromLowercase(menu)}
                </p>
                <FormUpdateIdentitas
                  form={formIdentitas}
                  isLoading={isLoadingUpdateProfil}
                  handleSubmit={handleSubmitIdentitas}
                  setUrls={setUrls}
                  urls={urls}
                  setIsShow={setIsShow}
                  setIsSubmit={setIsSubmit}
                  isShow={isShow}
                  isSubmit={isSubmit}
                  isUbah={isHakAksesUbah}
                />
              </div>
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
                  isUbah={isHakAksesUbah}
                  isTambah={isHakAksesTambah}
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
