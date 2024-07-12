import DefaultImg from '@/assets/images/default.jpg'

export function PreviewHalaman({
  judul,
  gambar,
  name_jenis,
  isi,
}: {
  judul?: string
  gambar?: string
  name_jenis?: string
  isi?: string
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      <img
        src={gambar !== '' && gambar ? gambar : DefaultImg}
        alt={judul}
        className="h-[30rem] rounded-2xl filter phones:h-[20rem] phones:w-full"
        loading="lazy"
      />

      <div className="flex flex-1 flex-col gap-16">
        {judul && <p className="font-roboto">{judul}</p>}
        <div className="flex flex-wrap items-center  gap-24">
          {name_jenis && (
            <p className="rounded-2xl bg-warna-grey px-24 py-12 text-[1.8rem] text-white">
              {name_jenis}
            </p>
          )}
          {isi && (
            <div
              style={{ lineHeight: '130%' }}
              dangerouslySetInnerHTML={{ __html: isi }}
              className="article-content"
            />
          )}
        </div>
      </div>
    </div>
  )
}
