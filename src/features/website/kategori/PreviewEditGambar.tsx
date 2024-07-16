import DefaultImg from '@/assets/images/default.jpg'

export function PreviewEditGambar({
  photo,
  keterangan,
}: {
  photo?: string
  keterangan?: string
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      <img
        src={photo !== '' && photo ? photo : DefaultImg}
        alt={keterangan}
        className="w-1/4 rounded-2xl filter"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-16">
        {keterangan && <p>{keterangan}</p>}
      </div>
    </div>
  )
}
