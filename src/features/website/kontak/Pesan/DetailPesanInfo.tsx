import { KontakMasukDetail } from '@/types/website/profil/kontakType'
import { getInitials } from '@/utils/formatText'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { Link } from 'react-router-dom'

export function DetailPesanInfo({ detail }: { detail: KontakMasukDetail }) {
  return (
    <div className="scrollbar h-full w-1/3 overflow-y-auto border-r border-warna-pale-grey py-32 pr-32 phones:h-auto phones:w-full phones:overflow-visible phones:border-none">
      <div className="flex gap-32 phones:h-auto">
        <div className="flex h-[7rem] w-[7rem] items-center justify-center rounded-full bg-warna-primary text-white">
          {getInitials(`${detail?.nama_depan} ${detail?.nama_belakang}`)}
        </div>
        <div className="flex flex-1 flex-col gap-32">
          <div className="flex gap-32">
            <div className="flex flex-1 flex-col gap-8">
              <p className="font-roboto text-[2.4rem] text-warna-dark">
                {detail?.nama_depan} {detail?.nama_belakang}
              </p>
              <p className="text-warna-grey">
                {dayjs(detail?.create_at)
                  .locale('id')
                  .format('DD MMMM YYYY HH:mm')}
              </p>
            </div>
            <div className="">
              <p
                className={clsx(
                  'rounded-2xl px-24 py-8 text-center text-[1.8rem] text-white',
                  {
                    'bg-orange-300': detail?.status === 0,
                    'bg-warna-dark': detail?.status === 1,
                    'bg-warna-red': detail?.status === 2,
                  },
                )}
              >
                {detail?.status === 0
                  ? 'Menunggu'
                  : detail?.status === 1
                    ? 'Diproses'
                    : detail?.status === 2
                      ? 'Ditutup'
                      : '-'}
              </p>
            </div>
          </div>
          <p>Kode: {detail?.kode_tiket}</p>

          {detail?.lampiran?.length > 0 && (
            <>
              <p className="border-b border-warna-pale-grey pb-8">
                {detail?.lampiran?.length} Atttachment
              </p>
              <div className="grid grid-cols-4 gap-32">
                {detail?.lampiran?.map((item, idx) => (
                  <Link
                    to={item?.dokumen}
                    key={idx}
                    target="_blank"
                    className="col-span-2 transform transition-transform duration-300 ease-in-out hover:scale-105 phones:col-span-2"
                  >
                    <img
                      src={item?.dokumen}
                      alt="Lampiran"
                      className="h-[12rem] w-full rounded-2xl object-cover filter"
                      loading="lazy"
                    />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
