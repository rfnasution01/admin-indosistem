import { useTambahDataPegawaiMutation } from '@/store/slices/simpeg/dataPegawai/daftarPegawaiAPI'
import { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import {
  AlamatSchema,
  FisikSchema,
  IdentitasPekerjaanschema,
  IdentitasPersonalSchema,
  TambahPegawaiSchema,
} from '@/schemas/simpeg/daftarPegawaiSchema'
import { useNavigate } from 'react-router-dom'
import { useAksesSimpeg } from '../useAksesSimpeg'

export function useTambahPegawai() {
  const navigate = useNavigate()
  const { isHakAksesTambah } = useAksesSimpeg()

  const [isShowTambah, setIsShowTambah] = useState(false)

  const formIdentitasPersonal = useForm<
    zod.infer<typeof IdentitasPersonalSchema>
  >({
    resolver: zodResolver(IdentitasPersonalSchema),
    defaultValues: {},
  })

  const formIdentitasPekerjaan = useForm<
    zod.infer<typeof IdentitasPekerjaanschema>
  >({
    resolver: zodResolver(IdentitasPekerjaanschema),
    defaultValues: {},
  })

  const formAlamat = useForm<zod.infer<typeof AlamatSchema>>({
    resolver: zodResolver(AlamatSchema),
    defaultValues: {},
  })

  const formFisik = useForm<zod.infer<typeof FisikSchema>>({
    resolver: zodResolver(FisikSchema),
    defaultValues: {},
  })

  const formTambahPegawai = useForm<zod.infer<typeof TambahPegawaiSchema>>({
    resolver: zodResolver(TambahPegawaiSchema),
    defaultValues: {},
  })

  // --- Tambah Pegawai ---
  const dataPersonalParams = localStorage.getItem('Identitas Personal') ?? ''
  const dataPekerjaanParams = localStorage.getItem('Identitas Pekerjaan') ?? ''
  const dataAlamatParams = localStorage.getItem('Alamat Tempat Tinggal') ?? ''
  const dataKarakterParams = localStorage.getItem('Karakter Fisik') ?? ''

  const [
    tambahPegawai,
    {
      isError: isErrortambahPegawai,
      isLoading: isLoadingTambahPegawai,
      isSuccess: isSuccesstambahPegawai,
      error: errortambahPegawai,
    },
  ] = useTambahDataPegawaiMutation()

  const handleSubmitTambahPegawai = async () => {
    if (!isHakAksesTambah) {
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

    if (
      dataKarakterParams &&
      dataKarakterParams !== '' &&
      dataAlamatParams &&
      dataAlamatParams !== '' &&
      dataPekerjaanParams &&
      dataPekerjaanParams !== '' &&
      dataPersonalParams &&
      dataPersonalParams !== ''
    ) {
      const dataPersonal = JSON.parse(dataPersonalParams)
      const dataPekerjaan = JSON.parse(dataPekerjaanParams)
      const dataAlamat = JSON.parse(dataAlamatParams)
      const dataKarakter = JSON.parse(dataKarakterParams)

      const body = {
        id_pegawai: '',
        nip: dataPekerjaan?.nip ?? '',
        nama: dataPersonal?.nama ?? '',
        jk: dataPersonal?.jk ?? '',
        email: dataPersonal?.email ?? '',
        hp: dataPersonal?.hp ?? '',
        npwp: dataPersonal?.npwp ?? '',
        id_golongan: dataPekerjaan?.golongan ?? '',
        jabatan: dataPekerjaan?.jabatan ?? '',
        jenis_kepegawaian: dataPekerjaan?.jenis_pegawai ?? '',
        status_pegawai: dataPekerjaan?.status ?? '',
        tanggal_mulai_kerja: dataPekerjaan?.tanggal_mulai ?? '',
        nomor_urut: dataPekerjaan?.no_urut ?? '',
        tempat_lahir: dataPersonal?.tempatLahir ?? '',
        tgl_lahir: dataPersonal?.tanggalLahir ?? '',
        latitude: dataAlamat?.latitude ?? '',
        longitude: dataAlamat?.longitude ?? '',
        nik: dataPersonal?.nik ?? '',
        status_menikah: dataPersonal?.pernikahan ?? '',
        alamat: dataAlamat?.alamat_lengkap ?? '',
        prop: dataAlamat?.provinsi ?? '',
        kab: dataAlamat?.kabupaten ?? '',
        kec: dataAlamat?.kecamatan ?? '',
        kel: dataAlamat?.kelurahan ?? '',
        kodepos: dataAlamat?.kodepos ?? '',
        tinggi_badan: dataKarakter?.tinggi ?? '',
        berat_badan: dataKarakter?.berat ?? '',
        agama: dataKarakter?.agama ?? '',
        rambut: dataKarakter?.rambut ?? '',
        bentuk_muka: dataKarakter?.bentuk ?? '',
        warna_kulit: dataKarakter?.warna ?? '',
        ciri_khas: dataKarakter?.ciri ?? '',
        cacat_tubuh: dataKarakter?.cacat ?? '',
        gol_darah: dataKarakter?.darah ?? '',
        hobi: dataKarakter?.hobi ?? '',
        suku: dataKarakter?.suku ?? '',
        asal_usul_kepegawaian: dataPekerjaan?.asal_pegawai ?? '',
        kategori_kepegawaian: dataPekerjaan?.kategori_pegawai ?? '',
        id_jenisptk: dataPekerjaan?.jenis_pegawai ?? '',
        nuptk: dataPekerjaan?.nuptk ?? '',
        karpeg: dataPekerjaan?.no_karpeg ?? '',
        gambar: dataPersonal?.photo ?? '',
        dokumen: dataPekerjaan?.sk ?? '',
      }

      try {
        await tambahPegawai({ body: body })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccesstambahPegawai) {
      toast.success(`Tambah pegawai berhasil`, {
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
      setIsShowTambah(false)

      setTimeout(() => {
        formTambahPegawai.reset()
        formAlamat.reset()
        formFisik.reset()
        formIdentitasPekerjaan.reset()
        formIdentitasPersonal.reset()
        localStorage.removeItem('status')
        localStorage.removeItem('Alamat Tempat Tinggal')
        localStorage.removeItem('Karakter Fisik')
        localStorage.removeItem('Identitas Pekerjaan')
        localStorage.removeItem('Identitas Personal')
        navigate(-1)
      }, 3000)
    }
  }, [isSuccesstambahPegawai])

  useEffect(() => {
    if (isErrortambahPegawai) {
      const errorMsg = errortambahPegawai as {
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
  }, [isErrortambahPegawai, errortambahPegawai])

  return {
    isHakAksesTambah,
    isLoadingTambahPegawai,
    handleSubmitTambahPegawai,
    isShowTambah,
    setIsShowTambah,
    formAlamat,
    formFisik,
    formIdentitasPekerjaan,
    formIdentitasPersonal,
    formTambahPegawai,
  }
}
