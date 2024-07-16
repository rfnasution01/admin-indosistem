import DefaultImg from '@/assets/images/default.jpg'

export function PreviewLayanan({
  nama_layanan,
  icon,
  url,
  keterangan,
}: {
  nama_layanan?: string
  icon?: string
  url?: string
  keterangan?: string
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      <img
        src={icon !== '' && icon ? icon : DefaultImg}
        alt={nama_layanan}
        className="w-1/4 rounded-2xl filter phones:w-full"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-16">
        {nama_layanan && <p className="font-roboto">{nama_layanan}</p>}
        {url && <p>{url}</p>}
        {keterangan && <p style={{ lineHeight: '130%' }}>{keterangan}</p>}
      </div>
    </div>
  )
}
