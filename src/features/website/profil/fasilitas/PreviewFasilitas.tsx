import DefaultImg from '@/assets/images/default.jpg'

export function PreviewFasilitas({
  photo,
  nama,
  keterangan,
  jam_mulai,
  jam_selesai,
  alamat,
  telepon,
}: {
  photo?: string
  nama?: string
  keterangan?: string
  jam_mulai?: string
  jam_selesai?: string
  alamat?: string
  telepon?: string
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      <img
        src={photo !== '' && photo ? photo : DefaultImg}
        alt={nama}
        className="h-full w-1/4 rounded-2xl filter phones:w-full"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-16">
        {nama && <p className="font-roboto">{nama}</p>}
        {jam_mulai && jam_selesai && (
          <p>
            {jam_mulai} s/d {jam_selesai} WIB
          </p>
        )}
        {alamat && (
          <p>
            {alamat} | {telepon}
          </p>
        )}
        {keterangan && (
          <div
            dangerouslySetInnerHTML={{ __html: keterangan }}
            className="article-content"
          />
        )}
      </div>
    </div>
  )
}
