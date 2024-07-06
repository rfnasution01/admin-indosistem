import { ProfilSekolahType } from '@/types/website/profil/tentangSekolahType'
import { Dispatch, SetStateAction } from 'react'
import { PreviewHeader } from '../tentangSekolah/PreviewHeader'
import { PreviewProfil } from '../tentangSekolah'

export function VisiMisiMain({
  data,
  setMenu,
}: {
  data: ProfilSekolahType[]
  setMenu: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="flex w-full flex-col gap-32 text-[2rem]">
      {/* --- Profil --- */}
      <div className="flex flex-col gap-32">
        {data?.map((item, idx) => (
          <div
            key={idx}
            className="flex w-full flex-col gap-32 rounded-2x bg-warna-pale-blue p-32 text-warna-dark phones:bg-transparent phones:p-0"
          >
            <PreviewHeader setMenu={setMenu} jenis={item?.jenis} />
            <PreviewProfil
              keterangan={item?.keterangan}
              list={item?.list}
              gambar_url={item?.gambar_url}
              jenis={item?.jenis}
              sub_keterangan={item?.sub_keterangan}
            />
            <hr className="hidden border phones:block" />
          </div>
        ))}
      </div>
    </div>
  )
}
