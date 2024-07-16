import DefaultImg from '@/assets/images/default.jpg'

export function PreviewGaleri({
  gambar,
  judul,
  cover,
}: {
  judul?: string
  cover?: string
  gambar?: { url_gambar: string; keterangan: string }[]
}) {
  return (
    <div className="scrollbar flex h-full flex-col gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      {
        <img
          src={cover === '' || !cover ? DefaultImg : cover}
          alt="Cover"
          className="w-full object-cover"
          loading="lazy"
        />
      }
      <div className="flex flex-1 flex-col gap-16">
        {judul && <p className="font-roboto text-[3.2rem]">Galeri {judul}</p>}
      </div>
      {gambar?.length > 0 && (
        <div className="grid w-full grid-cols-6 gap-32">
          {gambar &&
            gambar?.map((item, idx) => (
              <div className="col-span-1 phones:col-span-3" key={idx}>
                <div className="flex flex-col gap-12">
                  <img
                    src={
                      item?.url_gambar !== '' && item?.url_gambar
                        ? item?.url_gambar
                        : DefaultImg
                    }
                    alt={item?.keterangan}
                    className="w-full rounded-2xl filter phones:w-full"
                    loading="lazy"
                  />
                  <p>{item?.keterangan}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
