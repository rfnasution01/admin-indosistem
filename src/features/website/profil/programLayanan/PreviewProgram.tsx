import DefaultImg from '@/assets/images/default.jpg'
import clsx from 'clsx'

export function PreviewProgram({
  photo,
  judul,
  isi_lengkap,
  isi_singkat,
  aktif,
}: {
  judul?: string
  photo?: string
  isi_singkat?: string
  isi_lengkap?: string
  aktif?: string
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      <img
        src={photo !== '' && photo ? photo : DefaultImg}
        alt={judul}
        className="h-[30rem] w-[50rem] rounded-2xl filter"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-16">
        {judul && <p className="font-roboto">{judul}</p>}
        {aktif && (
          <div className="flex">
            <p
              className={clsx(
                'rounded-2xl px-24 py-8 text-[1.6rem] text-white',
                {
                  'bg-warna-dark': aktif === '1',
                  'bg-warna-red': aktif !== '1',
                },
              )}
            >
              {aktif === '1' ? 'Aktif' : 'Tidak Aktif'}
            </p>
          </div>
        )}
        {isi_singkat && <p style={{ lineHeight: '130%' }}>{isi_singkat}</p>}
        {isi_lengkap && (
          <div
            dangerouslySetInnerHTML={{ __html: isi_lengkap }}
            className="article-content"
          />
        )}
      </div>
    </div>
  )
}
