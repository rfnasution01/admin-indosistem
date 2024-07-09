import DefaultImg from '@/assets/images/default.jpg'

export function PreviewTambahGambar({
  gambar,
}: {
  gambar: { url_gambar: string; keterangan: string }[]
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      <div className="flex flex-wrap items-center justify-center gap-32">
        {gambar &&
          gambar?.map((item, idx) => (
            <div className="flex flex-col gap-12" key={idx}>
              <img
                src={
                  item?.url_gambar !== '' && item?.url_gambar
                    ? item?.url_gambar
                    : DefaultImg
                }
                alt={item?.keterangan}
                className="h-[30rem] w-[50rem] rounded-2xl filter"
                loading="lazy"
              />
              <p>{item?.keterangan}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
