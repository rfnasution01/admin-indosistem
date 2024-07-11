import DefaultImg from '@/assets/images/default.jpg'

export function PreviewTambahGambar({
  gambar,
}: {
  gambar: { url_gambar: string; keterangan: string; judul: string }[]
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
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
                    className="h-[15rem] w-full rounded-2xl filter"
                    loading="lazy"
                  />
                  {item?.keterangan && (
                    <p className="line-clamp-1">{item?.keterangan}</p>
                  )}
                  {item?.judul && <p className="line-clamp-1">{item?.judul}</p>}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
