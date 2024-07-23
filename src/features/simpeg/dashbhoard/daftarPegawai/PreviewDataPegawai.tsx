import { ValidasiKonfirmasi } from '@/components/Dialog/ValidasiKonfirmasi'
import { Form } from '@/components/Form'
import { LabelData } from '@/components/LabelComponent/LabelData'
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
}: {
  handleSubmitTambahPegawai: () => Promise<void>
  isShowTambah: boolean
  setIsShowTambah: Dispatch<SetStateAction<boolean>>
  setMenu: Dispatch<SetStateAction<string>>
  setCurrentIdx: Dispatch<SetStateAction<number>>
  form: UseFormReturn
  menuList: string[]
}) {
  const dataPersonalParams = localStorage.getItem('Identitas Personal') ?? ''
  const dataPekerjaanParams = localStorage.getItem('Identitas Pekerjaan') ?? ''
  const dataAlamatParams = localStorage.getItem('Alamat Tempat Tinggal') ?? ''
  const dataKarakterParams = localStorage.getItem('Karakter Fisik') ?? ''

  const dataPersonal = JSON.parse(dataPersonalParams)
  const dataPekerjaan = JSON.parse(dataPekerjaanParams)
  const dataAlamat = JSON.parse(dataAlamatParams)
  const dataKarakter = JSON.parse(dataKarakterParams)

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
          <LabelData label="NIK" value={dataPersonal?.nik} />
          <LabelData
            label="Nama Lengkap dan Gelat"
            value={dataPersonal?.nama}
          />
          <LabelData label="Jenis Kelamin" value={dataPersonal?.jk} />
          <LabelData label="Tempat Lahir" value={dataPersonal?.tempatLahir} />
          <LabelData label="Tanggal lahir" value={dataPersonal?.tanggalLahir} />
          <LabelData label="Email" value={dataPersonal?.email} />
          <LabelData label="No. Hp" value={dataPersonal?.hp} />
          <LabelData label="NPWP" value={dataPersonal?.npwp} />
          <LabelData
            label="Status Pernikahan"
            value={dataPersonal?.nama_kategori_pernikahan}
          />
          <LabelData label="Foto" value={dataPersonal?.photo} />
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
            value={dataPekerjaan?.nama_kategori_asal_pegawai}
          />
          <LabelData label="NIP" value={dataPekerjaan?.nip} />
          <LabelData
            label="Pangkat / Golongan"
            value={dataPekerjaan?.nama_kategori_golongan}
          />
          {dataPekerjaan?.nama_kategori_jenis_ptk && (
            <LabelData
              label="Jenis PTK"
              value={dataPekerjaan?.nama_kategori_jenis_ptk}
            />
          )}

          {dataPekerjaan?.nama_kategori_nuptk && (
            <LabelData
              label="NUPTK"
              value={dataPekerjaan?.nama_kategori_nuptk}
            />
          )}

          <LabelData label="Jabatan" value={dataPekerjaan?.jabatan} />
          <LabelData
            label="Kategori Kepegawaian"
            value={dataPekerjaan?.nama_kategori_kategori_pegawai}
          />
          <LabelData label="No. Karpeg" value={dataPekerjaan?.no_karpeg} />
          <LabelData label="Status Aktif" value={dataPekerjaan?.status} />
          <LabelData
            label="Tanggal Mulai Kerja"
            value={dataPekerjaan?.tanggal_mulai}
          />
          <LabelData label="Nomor Urut" value={dataPekerjaan?.no_urut} />
          <LabelData label="Dokumen SK" value={dataPekerjaan?.sk} />
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
            value={dataAlamat?.alamat_lengkap}
          />
          <LabelData label="Provinsi" value={dataAlamat?.nama_provinsi} />
          <LabelData label="Kabupaten" value={dataAlamat?.nama_kabupaten} />
          <LabelData label="Kecamatan" value={dataAlamat?.nama_kecamatan} />
          <LabelData label="Kelurahan" value={dataAlamat?.nama_kelurahan} />
          <LabelData label="Kode Pos" value={dataAlamat?.kodepos} />
          <p className="font-roboto">Lokasi Rumah</p>
          <LabelData label="Longitude" value={dataAlamat?.longitude} />
          <LabelData label="Latitude" value={dataAlamat?.latitude} />
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
          <LabelData label="Tinggi Badan (cm)" value={dataKarakter?.tinggi} />
          <LabelData label="Berat Badan (cm)" value={dataKarakter?.berat} />
          <LabelData label="Agama" value={dataKarakter?.nama_kategori_agama} />
          <LabelData label="Suku" value={dataKarakter?.nama_kategori_suku} />
          <LabelData
            label="Rambut"
            value={dataKarakter?.nama_kategori_rambut}
          />
          <LabelData
            label="Bentuk Muka"
            value={dataKarakter?.nama_kategori_bentuk}
          />
          <LabelData
            label="Warna Kulit"
            value={dataKarakter?.nama_kategori_warna}
          />
          <LabelData label="Ciri Khas" value={dataKarakter?.ciri} />
          <LabelData label="Cacat tubuh" value={dataKarakter?.cacat} />
          <LabelData
            label="Golongan Darah"
            value={dataKarakter?.nama_kategori_darah}
          />
          <LabelData label="Hobi" value={dataKarakter?.hobi} />
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
