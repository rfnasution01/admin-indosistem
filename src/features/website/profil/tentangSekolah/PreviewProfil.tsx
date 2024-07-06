import { ListProfilSekolahType } from '@/types/website/profil/tentangSekolahType'

export function PreviewProfil({
  gambar_url,
  jenis,
  keterangan,
  list,
}: {
  gambar_url?: string
  jenis?: string
  keterangan?: string
  list?: ListProfilSekolahType[]
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      <img
        src={gambar_url !== '' && gambar_url ? gambar_url : '/logo.png'}
        alt={jenis}
        className="h-[30rem] w-[50rem] rounded-2xl filter"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-16">
        {keterangan && <p style={{ lineHeight: '130%' }}>{keterangan}</p>}
        {list && list?.length > 0 && (
          <ol className="ml-32 list-decimal">
            {list?.map((item, idx) => (
              <li key={idx} style={{ lineHeight: '130%' }}>
                {item?.keterangan}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
