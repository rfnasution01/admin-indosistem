export function PreviewPengumuman({
  kategori,
  taq,
  tanggal,
  judul,
  isi,
  publish,
}: {
  kategori?: string
  taq?: string[]
  tanggal?: string
  judul?: string
  isi?: string
  publish?: string
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      {/* <img
        src={photo !== '' && photo ? photo : DefaultImg}
        alt={nama}
        className="h-[30rem] w-[50rem] rounded-2xl filter"
        loading="lazy"
      /> */}
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
              Tidak dpublish {publish}
            </p>
          )}
        </div>
        {isi && (
          <div
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
