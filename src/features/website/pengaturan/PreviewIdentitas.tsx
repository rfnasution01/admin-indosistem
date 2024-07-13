import { LabelList } from '@/components/LabelComponent/LabelList'
import DefaultImg from '@/assets/images/default.jpg'

export function PreviewIdentitas({
  nama_website,
  logo,
  favicon,
  footer,
  deskripsi,
  keyword,
}: {
  nama_website?: string
  logo?: string
  favicon?: string
  footer?: string
  deskripsi?: string
  keyword?: string
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      <div className="scrollbar flex h-full w-full gap-32 overflow-y-auto phones:flex-col phones:gap-48">
        <div className="flex w-full flex-col gap-12 phones:w-full">
          <LabelList label="Nama Website" value={nama_website ?? '-'} />
          <LabelList label="Footer" value={footer ?? '-'} />
          <LabelList label="Deskripsi" value={deskripsi ?? '-'} />
          <LabelList label="Keyword" value={keyword ?? '-'} />
        </div>
        <div className="flex w-full flex-col gap-12">
          <p className="font-roboto text-warna-dark">Logo</p>
          <img
            src={logo === '' || !logo ? DefaultImg : logo}
            className="h-[50rem] w-full filter phones:h-[35rem]"
            loading="lazy"
            alt={nama_website}
          />
        </div>
        <div className="flex w-full flex-col gap-12">
          <p className="font-roboto text-warna-dark">Favicon</p>
          <img
            src={favicon === '' || !favicon ? DefaultImg : favicon}
            className="h-[50rem] w-full filter phones:h-[35rem]"
            loading="lazy"
            alt={nama_website}
          />
        </div>
      </div>
    </div>
  )
}
