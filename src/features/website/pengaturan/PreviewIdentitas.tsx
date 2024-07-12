import { LabelList } from '@/components/LabelComponent/LabelList'
import { IdentitasLogo } from './IdentitasLogo'

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
      <div className="scrollbar flex h-full gap-32 overflow-y-auto phones:flex-col">
        <div className="flex w-3/4 flex-col gap-12 phones:w-full">
          <LabelList label="Nama Website" value={nama_website ?? '-'} />
          <LabelList label="Footer" value={footer ?? '-'} />
          <LabelList label="Deskripsi" value={deskripsi ?? '-'} />
          <LabelList label="Keyword" value={keyword ?? '-'} />
        </div>
        <IdentitasLogo logo={logo} favicon={favicon} />
      </div>
    </div>
  )
}
