import { ProfilSekolahType } from '@/types/website/profil/tentangSekolahType'

export function PreviewProfil({ data }: { data: ProfilSekolahType }) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      <img
        src={
          data?.gambar_url !== '' && data?.gambar_url
            ? data?.gambar_url
            : '/logo.png'
        }
        alt={data?.jenis}
        className="h-[30rem] w-[50rem] rounded-2xl filter"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-16">
        {data?.keterangan && (
          <p style={{ lineHeight: '130%' }}>{data?.keterangan}</p>
        )}
        {data?.list && data?.list?.length > 0 && (
          <ol className="ml-32 list-decimal">
            {data?.list?.map((item, idx) => (
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
