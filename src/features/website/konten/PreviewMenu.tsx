import DefaultImg from '@/assets/images/default.jpg'

export function PreviewMenu({
  jenis_menu,
  gambar,
  posisi,
  nama_menu,
  kategori,
  deskripsi,
}: {
  jenis_menu?: string
  gambar?: string
  posisi?: string
  nama_menu?: string
  kategori?: string
  deskripsi?: string
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      <img
        src={gambar !== '' && gambar ? gambar : DefaultImg}
        alt={nama_menu}
        className="h-[30rem] rounded-2xl filter phones:h-[20rem] phones:w-full"
        loading="lazy"
      />

      <div className="flex flex-1 flex-col gap-16">
        {nama_menu && <p className="font-roboto">{nama_menu}</p>}
        <div className="flex flex-wrap items-center gap-24">
          {jenis_menu && (
            <p className="rounded-2xl bg-warna-grey px-24 py-12 text-[1.8rem] text-white">
              {jenis_menu}
            </p>
          )}
          {posisi && (
            <p className="rounded-2xl bg-warna-primary px-24 py-12 text-[1.8rem] text-white">
              {posisi}
            </p>
          )}
          {kategori && (
            <p className="rounded-2xl bg-warna-dark px-24 py-12 text-[1.8rem] text-white">
              {kategori}
            </p>
          )}
        </div>

        {deskripsi && (
          <div style={{ lineHeight: '130%' }} className="text-warna-dark">
            {deskripsi}
          </div>
        )}
      </div>
    </div>
  )
}
