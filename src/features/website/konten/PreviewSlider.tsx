import DefaultImg from '@/assets/images/default.jpg'

export function PreviewSlider({
  judul,
  gambar,
  url,
  aktif,
}: {
  judul?: string
  gambar?: string
  url?: string
  aktif?: string
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
          {url && (
            <p className="rounded-2xl bg-warna-grey px-24 py-12 text-[1.8rem] text-white">
              {url}
            </p>
          )}
          {aktif === '1' || !aktif ? (
            <p className="rounded-2xl bg-warna-primary px-24 py-12 text-[1.8rem] text-white">
              Publish
            </p>
          ) : (
            <p className="rounded-2xl bg-warna-red px-24 py-12 text-[1.8rem] text-white">
              Draft
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
