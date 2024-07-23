import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import { Form } from '@/components/Form'
import { LabelData } from '@/components/LabelComponent/LabelData'
import { GetDaftarPegawaDetailType } from '@/types/simpeg/dataPegawai/daftarPegawaiType'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'

export function PreviewDataPegawai({
  handleSubmitTambahPegawai,
  isShowTambah,
  setIsShowTambah,
  form,
  setCurrentIdx,
  setMenu,
  menuList,
  detailPegawai,
  isEdit,
}: {
  handleSubmitTambahPegawai: () => Promise<void>
  isShowTambah: boolean
  setIsShowTambah: Dispatch<SetStateAction<boolean>>
  setMenu: Dispatch<SetStateAction<string>>
  setCurrentIdx: Dispatch<SetStateAction<number>>
  form: UseFormReturn
  menuList: string[]
  detailPegawai: GetDaftarPegawaDetailType
  isEdit: boolean
}) {
  const dataPersonalParams = localStorage.getItem('Identitas Personal') ?? ''
  const dataPekerjaanParams = localStorage.getItem('Identitas Pekerjaan') ?? ''
  const dataAlamatParams = localStorage.getItem('Alamat Tempat Tinggal') ?? ''
  const dataKarakterParams = localStorage.getItem('Karakter Fisik') ?? ''

  const dataPersonal = dataPersonalParams && JSON.parse(dataPersonalParams)
  const dataPekerjaan = dataPekerjaanParams && JSON.parse(dataPekerjaanParams)
  const dataAlamat = dataAlamatParams && JSON.parse(dataAlamatParams)
  const dataKarakter = dataKarakterParams && JSON.parse(dataKarakterParams)

  const handleClick = (idx: number) => {
    setCurrentIdx(idx)
    setMenu(menuList?.[idx])
  }

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
      {/* --- Identitas Personal --- */}
      <div className="flex flex-col gap-24">
        <div className="flex items-center justify-between">
          <p className="font-roboto text-[2.4rem] text-primary-100">
            Identitas Personal
          </p>
          <div
            onClick={() => {
              handleClick(0)
            }}
            className="flex items-center gap-12 text-primary-inactive hover:cursor-pointer hover:text-primary-active"
          >
            <FontAwesomeIcon icon={faPencil} />
            Ubah Informasi
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-16 phones:w-full">
          <LabelData
            label="NIK"
            value={
              !isEdit
                ? dataPersonal?.nik
                : form.watch('nik') || detailPegawai?.nik
            }
          />
          <LabelData
            label="Nama Lengkap dan Gelat"
            value={
              !isEdit
                ? dataPersonal?.nama
                : form.watch('nama') || detailPegawai?.nama
            }
          />
          <LabelData
            label="Jenis Kelamin"
            value={
              !isEdit ? dataPersonal?.jk : form.watch('jk') || detailPegawai?.jk
            }
          />
          <LabelData
            label="Tempat Lahir"
            value={
              !isEdit
                ? dataPersonal?.tempatLahir
                : form.watch('tempatLahir') || detailPegawai?.tempat_lahir
            }
          />
          <LabelData
            label="Tanggal lahir"
            value={
              !isEdit
                ? dataPersonal?.tanggalLahir
                : form.watch('tanggalLahir') || detailPegawai?.tgl_lahir
            }
          />
          <LabelData
            label="Email"
            value={
              !isEdit
                ? dataPersonal?.email
                : form.watch('email') || detailPegawai?.email
            }
          />
          <LabelData
            label="No. Hp"
            value={
              !isEdit ? dataPersonal?.hp : form.watch('hp') || detailPegawai?.hp
            }
          />
          <LabelData
            label="NPWP"
            value={
              !isEdit
                ? dataPersonal?.npwp
                : form.watch('npwp') || detailPegawai?.npwp
            }
          />
          <LabelData
            label="Status Pernikahan"
            value={
              !isEdit
                ? dataPersonal?.nama_kategori_pernikahan
                : form.watch('nama_kategori_pernikahan') ||
                  detailPegawai?.status_menikah
            }
          />
          <LabelData
            label="Foto"
            value={
              !isEdit
                ? dataPersonal?.photo
                : form.watch('photo') || detailPegawai?.photo
            }
          />
        </div>
      </div>
      {/* --- Identitas Pekerjaan --- */}
      <div className="flex flex-col gap-24">
        <div className="flex items-center justify-between">
          <p className="font-roboto text-[2.4rem] text-primary-100">
            Identitas Pekerjaan
          </p>
          <div
            onClick={() => {
              handleClick(1)
            }}
            className="flex items-center gap-12 text-primary-inactive hover:cursor-pointer hover:text-primary-active"
          >
            <FontAwesomeIcon icon={faPencil} />
            Ubah Informasi
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-16 phones:w-full">
          <LabelData
            label="Asal Usul Kepegawaian"
            value={
              !isEdit
                ? dataPekerjaan?.nama_kategori_asal_pegawai
                : form.watch('nama_kategori_asal_pegawai') ||
                  detailPegawai?.asal_pegawai
            }
          />
          <LabelData
            label="NIP"
            value={
              !isEdit
                ? dataPekerjaan?.nip
                : form.watch('nip') || detailPegawai?.nip
            }
          />
          <LabelData
            label="Pangkat / Golongan"
            value={
              !isEdit
                ? dataPekerjaan?.nama_kategori_golongan
                : form.watch('nama_kategori_golongan') ||
                  detailPegawai?.golongan
            }
          />

          <LabelData
            label="Jenis PTK"
            value={
              !isEdit
                ? dataPekerjaan?.nama_kategori_jenis_ptk
                : form.watch('nama_kategori_jenis_ptk') ||
                  detailPegawai?.jenis_ptk
            }
          />

          <LabelData
            label="NUPTK"
            value={
              !isEdit
                ? dataPekerjaan?.nama_kategori_nuptk
                : form.watch('nama_kategori_nuptk') || detailPegawai?.nuptk
            }
          />

          <LabelData
            label="Jabatan"
            value={
              !isEdit
                ? dataPekerjaan?.jabatan
                : form.watch('jabatan') || detailPegawai?.jabatan
            }
          />
          <LabelData
            label="Kategori Kepegawaian"
            value={
              !isEdit
                ? dataPekerjaan?.nama_kategori_kategori_pegawai
                : form.watch('nama_kategori_kategori_pegawai') ||
                  detailPegawai?.kategori_pegawai
            }
          />
          <LabelData
            label="No. Karpeg"
            value={
              !isEdit
                ? dataPekerjaan?.no_karpeg
                : form.watch('no_karpeg') || detailPegawai?.karpeg
            }
          />
          <LabelData
            label="Status Aktif"
            value={
              !isEdit
                ? dataPekerjaan?.status
                : form.watch('status') || detailPegawai?.status_pegawai
            }
          />
          <LabelData
            label="Tanggal Mulai Kerja"
            value={
              !isEdit
                ? dataPekerjaan?.tanggal_mulai
                : form.watch('tanggal_mulai') || detailPegawai?.tgl_mulai_kerja
            }
          />
          <LabelData
            label="Nomor Urut"
            value={
              !isEdit
                ? dataPekerjaan?.no_urut
                : form.watch('no_urut') || detailPegawai?.nomor_urut
            }
          />
          <LabelData
            label="Dokumen SK"
            value={
              !isEdit
                ? dataPekerjaan?.sk
                : form.watch('sk') || detailPegawai?.dok_sk
            }
          />
        </div>
      </div>
      {/* --- Alamat --- */}
      <div className="flex flex-col gap-24">
        <div className="flex items-center justify-between">
          <p className="font-roboto text-[2.4rem] text-primary-100">
            Alamat Tempat Tinggal
          </p>
          <div
            onClick={() => {
              handleClick(2)
            }}
            className="flex items-center gap-12 text-primary-inactive hover:cursor-pointer hover:text-primary-active"
          >
            <FontAwesomeIcon icon={faPencil} />
            Ubah Informasi
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-16 phones:w-full">
          <LabelData
            label="Alamat Lengkap"
            value={
              !isEdit
                ? dataAlamat?.alamat_lengkap
                : form.watch('alamat_lengkap') || detailPegawai?.alamat
            }
          />
          <LabelData
            label="Provinsi"
            value={
              !isEdit
                ? dataAlamat?.nama_provinsi
                : form.watch('nama_provinsi') || detailPegawai?.propinsi
            }
          />
          <LabelData
            label="Kabupaten"
            value={
              !isEdit
                ? dataAlamat?.nama_kabupaten
                : form.watch('nama_kabupaten') || detailPegawai?.kabupaten
            }
          />
          <LabelData
            label="Kecamatan"
            value={
              !isEdit
                ? dataAlamat?.nama_kecamatan
                : form.watch('nama_kecamatan') || detailPegawai?.kecamatan
            }
          />
          <LabelData
            label="Kelurahan"
            value={
              !isEdit
                ? dataAlamat?.nama_kelurahan
                : form.watch('nama_kelurahan') || detailPegawai?.kel
            }
          />
          <LabelData
            label="Kode Pos"
            value={
              !isEdit
                ? dataAlamat?.kodepos
                : form.watch('kodepos') || detailPegawai?.kodepos
            }
          />
          <p className="font-roboto">Lokasi Rumah</p>
          <LabelData
            label="Longitude"
            value={
              !isEdit
                ? dataAlamat?.longitude
                : form.watch('longitude') || detailPegawai?.longitude
            }
          />
          <LabelData
            label="Latitude"
            value={
              !isEdit
                ? dataAlamat?.latitude
                : form.watch('latitude') || detailPegawai?.latitude
            }
          />
        </div>
      </div>
      {/* --- Karakter Fisik --- */}
      <div className="flex flex-col gap-24">
        <div className="flex items-center justify-between">
          <p className="font-roboto text-[2.4rem] text-primary-100">
            Karakter Fisik
          </p>
          <div
            onClick={() => {
              handleClick(3)
            }}
            className="flex items-center gap-12 text-primary-inactive hover:cursor-pointer hover:text-primary-active"
          >
            <FontAwesomeIcon icon={faPencil} />
            Ubah Informasi
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-16 phones:w-full">
          <LabelData
            label="Tinggi Badan (cm)"
            value={
              !isEdit
                ? dataKarakter?.tinggi
                : form.watch('tinggi') || detailPegawai?.tinggi_badan
            }
          />
          <LabelData
            label="Berat Badan (cm)"
            value={
              !isEdit
                ? dataKarakter?.berat
                : form.watch('berat') || detailPegawai?.berat_badan
            }
          />
          <LabelData
            label="Agama"
            value={
              !isEdit
                ? dataKarakter?.nama_kategori_agama
                : form.watch('nama_kategori_agama') || detailPegawai?.agama
            }
          />
          <LabelData
            label="Suku"
            value={
              !isEdit
                ? dataKarakter?.nama_kategori_suku
                : form.watch('nama_kategori_suku') || detailPegawai?.suku
            }
          />
          <LabelData
            label="Rambut"
            value={
              !isEdit
                ? dataKarakter?.nama_kategori_rambut
                : form.watch('nama_kategori_rambut') || detailPegawai?.rambut
            }
          />
          <LabelData
            label="Bentuk Muka"
            value={
              !isEdit
                ? dataKarakter?.nama_kategori_bentuk
                : form.watch('nama_kategori_bentuk') ||
                  detailPegawai?.bentuk_muka
            }
          />
          <LabelData
            label="Warna Kulit"
            value={
              !isEdit
                ? dataKarakter?.nama_kategori_warna
                : form.watch('nama_kategori_warna') ||
                  detailPegawai?.warna_kulit
            }
          />
          <LabelData
            label="Ciri Khas"
            value={
              !isEdit
                ? dataKarakter?.ciri
                : form.watch('ciri') || detailPegawai?.ciri_khas
            }
          />
          <LabelData
            label="Cacat tubuh"
            value={
              !isEdit
                ? dataKarakter?.cacat
                : form.watch('cacat') || detailPegawai?.cacat_tubuh
            }
          />
          <LabelData
            label="Golongan Darah"
            value={
              !isEdit
                ? dataKarakter?.nama_kategori_darah
                : form.watch('nama_kategori_darah') || detailPegawai?.goldarah
            }
          />
          <LabelData
            label="Hobi"
            value={
              !isEdit
                ? dataKarakter?.hobi
                : form.watch('hobi') || detailPegawai?.hobi
            }
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setIsShowTambah(true)}
          className="rounded-2xl bg-success px-24 py-12 text-white hover:bg-opacity-80"
        >
          Simpan
        </button>
      </div>
      <ValidasiKonfirmasi
        isOpen={isShowTambah}
        setIsOpen={setIsShowTambah}
        children={''}
        isAuto
        childrenButton={
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitTambahPegawai)}>
              <button
                type="submit"
                className="rounded-2xl bg-success px-24 py-12 text-white hover:bg-opacity-80"
              >
                Ya
              </button>
            </form>
          </Form>
        }
      />
    </div>
  )
}
