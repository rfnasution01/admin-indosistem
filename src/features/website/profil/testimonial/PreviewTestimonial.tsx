import DefaultImg from '@/assets/images/default.jpg'

export function PreviewTestimonial({
  photo,
  nama,
  keterangan,
  isi,
}: {
  photo?: string
  nama?: string
  keterangan?: string
  isi?: string
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      <img
        src={photo !== '' && photo ? photo : DefaultImg}
        alt={nama}
        className="w-1/4 rounded-2xl filter"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-16">
        {nama && <p className="font-roboto">{nama}</p>}
        {keterangan && <p style={{ lineHeight: '130%' }}>{keterangan}</p>}
        {isi && (
          <div
            dangerouslySetInnerHTML={{ __html: isi }}
            className="article-content"
          />
        )}
      </div>
    </div>
  )
}
