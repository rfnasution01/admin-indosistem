import { GetWebsiteTentangSekolahType } from '@/types/website/profil/tentangSekolahType'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { PreviewHeader } from './PreviewHeader'
import { PreviewIdentitas } from './PreviewIdentitas'
import { PreviewProfil } from './PreviewProfil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlusCircle,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { ValidasiDelete } from '@/components/Dialog/ValidasiDelete'
import { useGetJenisProfilQuery } from '@/store/slices/referensiAPI'
import { Link } from 'react-router-dom'

export function PreviewMain({
  data,
  setMenu,
  handleSubmitDelete,
  isLoadingDelete,
  isUbah,
  isHapus,
  isTambah,
}: {
  data: GetWebsiteTentangSekolahType
  setMenu: Dispatch<SetStateAction<string>>
  handleSubmitDelete: (id: string) => Promise<void>
  isLoadingDelete: boolean
  isUbah?: boolean
  isHapus?: boolean
  isTambah?: boolean
}) {
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)
  const [id, setId] = useState<string>()

  // --- Jenis Profil ---
  const [jenisProfil, setJenisProfil] = useState<string[]>([])
  const { data: dataJenisProfil } = useGetJenisProfilQuery()

  useEffect(() => {
    if (dataJenisProfil?.data) {
      setJenisProfil(dataJenisProfil?.data)
    }
  }, [dataJenisProfil?.data])

  return (
    <div className="flex w-full flex-col gap-32 text-[2rem]">
      {/* --- Identitas --- */}
      <div className="flex w-full flex-col gap-32 rounded-2x bg-warna-pale-blue p-32 text-warna-dark phones:bg-transparent phones:p-0">
        <PreviewHeader setMenu={setMenu} jenis="Identitas" isUbah={isUbah} />
        <PreviewIdentitas
          kode={data?.identitas?.kode}
          nama={data?.identitas?.nama}
          sk_pendirian={data?.identitas?.sk_pendirian}
          tgl_sk_pendirian={data?.identitas?.tgl_sk_pendirian}
          sk_operasional={data?.identitas?.sk_operasional}
          tgl_sk_operasional={data?.identitas?.tgl_sk_operasional}
          tgl_akhir_akreditasi={data?.identitas?.tgl_akhir_akreditasi}
          tgl_mulai_akreditasi={data?.identitas?.tgl_mulai_akreditasi}
          akreditasi={data?.identitas?.akreditasi}
          alamat={data?.identitas?.alamat}
          nama_pimpinan={data?.identitas?.nama_pimpinan}
          nip_pimpinan={data?.identitas?.nip_pimpinan}
          nis={data?.identitas?.nis}
          nss={data?.identitas?.nss}
          email={data?.identitas?.email}
          telepon={data?.identitas?.telepon}
          penyelenggaraan={data?.identitas?.penyelenggaraan}
          penyelenggaraan_akhir={data?.identitas?.penyelenggaraan_akhir}
          penyelenggaraan_mulai={data?.identitas?.penyelenggaraan_mulai}
          photo_pimpinan={data?.identitas?.photo_pimpinan}
        />
      </div>

      <hr className="hidden border phones:block" />

      {/* --- Profil --- */}
      <div className="flex flex-col gap-32">
        {data?.profil?.map((item, idx) => (
          <div
            key={idx}
            className="flex w-full flex-col gap-32 rounded-2x bg-warna-pale-blue p-32 text-warna-dark phones:bg-transparent phones:p-0"
          >
            <PreviewHeader
              setMenu={setMenu}
              jenis={item?.jenis}
              isUbah={isUbah}
              isHapus={isHapus}
              hapus={
                <button
                  className="flex items-center gap-12 rounded-2xl bg-warna-red px-24 py-12 text-white hover:bg-opacity-80"
                  type="button"
                  onClick={() => {
                    setIsShowDelete(true)
                    setId(item?.id)
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <p className="phones:hidden">Hapus</p>
                </button>
              }
            />
            <PreviewProfil
              keterangan={item?.keterangan}
              list={item?.list}
              gambar_url={item?.gambar_url}
              jenis={item?.jenis}
            />
            <hr className="hidden border phones:block" />
          </div>
        ))}
      </div>

      {isTambah && data?.profil?.length < jenisProfil?.length && (
        <Link
          to={'tambah'}
          className="flex items-center justify-center gap-12 rounded-xl bg-slate-700 py-12 text-white hover:bg-slate-900"
        >
          <FontAwesomeIcon icon={faPlusCircle} />
          <p>Tambah Profil</p>
        </Link>
      )}

      <ValidasiDelete
        isOpen={isShowDelete}
        setIsOpen={setIsShowDelete}
        child={
          <button
            type="button"
            disabled={isLoadingDelete}
            onClick={() => handleSubmitDelete(id)}
            className="flex items-center gap-12 rounded-2xl bg-warna-red px-24 py-12 text-white hover:bg-opacity-80"
          >
            {isLoadingDelete ? (
              <span className="animate-spin duration-300">
                <FontAwesomeIcon icon={faSpinner} />
              </span>
            ) : (
              <FontAwesomeIcon icon={faTrash} />
            )}
            <p className="font-sf-pro">Hapus</p>
          </button>
        }
      />
    </div>
  )
}
