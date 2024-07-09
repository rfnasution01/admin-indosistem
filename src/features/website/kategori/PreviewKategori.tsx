import DefaultImg from '@/assets/images/default.jpg'

export function PreviewKategori({
  kategori,
  taq,
  tanggal,
  judul,
  isi,
  publish,
  gambar,
  deskripsi_singkat,
}: {
  kategori?: string
  taq?: string[]
  tanggal?: string
  judul?: string
  isi?: string
  publish?: string
  gambar: { url_gambar: string; keterangan: string }[]
  deskripsi_singkat: string
}) {
  return (
    <div className="scrollbar flex h-full flex-col gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      {gambar?.length > 0 && (
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
      )}
      <div className="flex flex-1 flex-col gap-16">
        {judul && <p className="font-roboto">{judul}</p>}
        <div className="flex flex-wrap items-center  gap-24">
          {tanggal && (
            <p className="rounded-2xl bg-warna-grey px-24 py-12 text-[1.8rem] text-white">
              {tanggal}
            </p>
          )}
          {kategori && (
            <p className="rounded-2xl bg-warna-dark px-24 py-12 text-[1.8rem] text-white">
              {kategori}
            </p>
          )}
          {publish === '1' || !publish ? (
            <p className="rounded-2xl bg-warna-primary px-24 py-12 text-[1.8rem] text-white">
              Publish
            </p>
          ) : (
            <p className="rounded-2xl bg-warna-red px-24 py-12 text-[1.8rem] text-white">
              Tidak dpublish
            </p>
          )}
        </div>
        {deskripsi_singkat && (
          <p style={{ lineHeight: '130%' }}>{deskripsi_singkat}</p>
        )}
        {isi && (
          <div
            style={{ lineHeight: '130%' }}
            dangerouslySetInnerHTML={{ __html: isi }}
            className="article-content"
          />
        )}

        <div className="flex flex-wrap items-center gap-12">
          {taq?.map((item, idx) => (
            <p
              key={idx}
              className="rounded-2xl bg-warna-primary px-24 py-12 text-[1.8rem] text-white"
            >
              #{item}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
