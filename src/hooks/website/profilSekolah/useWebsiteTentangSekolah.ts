import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import {
  IdentitasSekolahSchema,
  TentangSekolahSchema,
} from '@/schemas/website/tentangSekolahSchema'
import { GetWebsiteTentangSekolahType } from '@/types/website/profil/tentangSekolahType'
import {
  useCreateTentangSekolahMutation,
  useDeleteTentangSekolahMutation,
  useGetTentangSekolahQuery,
  useUpdateProfilSekolahMutation,
} from '@/store/slices/website/profilAPI/tentangAPI'
import { Bounce, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useWebsiteAkses } from '../websiteAkses'
import { usePathname } from '@/hooks/usePathname'
import { useWebsiteVisiMisi } from './useWebsiteVisiMisi'

export function useWebsiteTentangSekolah() {
  const navigate = useNavigate()
  const { lastPathname, secondPathname } = usePathname()
  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } =
    useWebsiteAkses()
  const { visiSekolah, misiSekolah } = useWebsiteVisiMisi()

  const isTambahProfil = lastPathname === 'tambah'
  const [menu, setMenu] = useState<string>('Preview')
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShowUpdate, setIsShowUpdate] = useState<boolean>(false)

  const formTambahProfil = useForm<zod.infer<typeof TentangSekolahSchema>>({
    resolver: zodResolver(TentangSekolahSchema),
    defaultValues: {},
  })

  const formIdentitas = useForm<zod.infer<typeof IdentitasSekolahSchema>>({
    resolver: zodResolver(IdentitasSekolahSchema),
    defaultValues: {},
  })

  // --- Data Tentang Sekolah ---
  const [dataTentangSekolah, setDataTentangSekolah] =
    useState<GetWebsiteTentangSekolahType>()

  const {
    data: dataTentang,
    isFetching: isFetchingTentangSekolah,
    isLoading: isLoadingTentangSekolah,
    isError: isErrorTentangSekolah,
    error: errorTentangSekolah,
  } = useGetTentangSekolahQuery()

  const loadingTentangSekolah =
    isLoadingTentangSekolah || isFetchingTentangSekolah

  useEffect(() => {
    if (dataTentang?.data) {
      setDataTentangSekolah(dataTentang?.data)
    }
  }, [dataTentang?.data])

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

  const tujuanSekolah = dataTentangSekolah?.profil?.find(
    (item) => item?.jenis === 'Tujuan',
  )
  const hasilSekolah = dataTentangSekolah?.profil?.find(
    (item) => item?.jenis === 'Hasil',
  )
  const sasaranSekolah = dataTentangSekolah?.profil?.find(
    (item) => item?.jenis === 'Sasaran',
  )

  const itemNow =
    menu === 'Tujuan'
      ? tujuanSekolah
      : menu === 'Hasil'
        ? hasilSekolah
        : menu === 'Sasaran'
          ? sasaranSekolah
          : menu === 'Visi'
            ? visiSekolah
            : menu === 'Misi'
              ? misiSekolah
              : null

  // --- Delete Tentang Sekolah ---
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
      toast.success('Hapus data berhasil', {
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

  const values = formTambahProfil.watch()
  values?.list?.forEach((item, index) => {
    item.urutan = (index + 1)?.toString()
  })

  const handleSubmitTambahProfil = async () => {
    const values = formTambahProfil.watch()

    const body = {
      id: isTambahProfil ? null : itemNow?.id,
      jenis:
        menu === 'Visi'
          ? 'Visi'
          : menu === 'Misi'
            ? 'Misi'
            : values?.jenis ?? '',
      keterangan: values?.keterangan ?? '',
      sub_keterangan: values?.sub_keterangan ?? '',
      gambar_url: values?.gambar_url ?? '',
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

    if (isSubmit && isShowUpdate) {
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
        `${isTambahProfil ? 'Tambah profil' : 'Update profil'} berhasil`,
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
        setMenu('Preview')
        if (isTambahProfil) {
          navigate(-1)
        }
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

      setIsSubmit(false)
      setIsShowUpdate(false)
    }
  }, [isErrorTambahProfil, errorTambahProfil])

  useEffect(() => {
    if (itemNow) {
      formTambahProfil.setValue('keterangan', itemNow?.keterangan)
      formTambahProfil.setValue('sub_keterangan', itemNow?.sub_keterangan)
      formTambahProfil.setValue('jenis', itemNow?.jenis)
      formTambahProfil.setValue('gambar_url', itemNow?.gambar_url)
      formTambahProfil.setValue('list', itemNow?.list)
    }
  }, [itemNow])

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

  const handleSubmitUpdateProfil = async () => {
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
      photo_pimpinan: values?.photo_pimpinan,
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

    if (isShowUpdate && isSubmit) {
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
      setIsShowUpdate(false)
      setIsSubmit(false)
      setTimeout(() => {
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
      setIsShowUpdate(false)
      setIsSubmit(false)
    }
  }, [isErrorUpdateProfil, errorUpdateProfil])

  useEffect(() => {
    if (dataTentangSekolah?.identitas) {
      const identitas = dataTentangSekolah?.identitas

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
  }, [dataTentangSekolah?.identitas])

  return {
    menu,
    setMenu,
    dataTentangSekolah,
    loadingTentangSekolah,
    handleSubmitDelete,
    isLoadingDeleteTentang,
    handleSubmitTambahProfil,
    isLoadingTambahProfil,
    handleSubmitUpdateProfil,
    isLoadingUpdateProfil,
    formIdentitas,
    formTambahProfil,
    setIsShowUpdate,
    isShowUpdate,
    isSubmit,
    setIsSubmit,
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    lastPathname,
    secondPathname,
  }
}
