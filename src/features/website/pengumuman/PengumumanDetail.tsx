import { IconComponent } from '@/components/LabelComponent/IconComponent'
import { GetPengumumanDetailType } from '@/types/website/pengumumanType'
import {
  faCalendarDay,
  faEye,
  faPencil,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import 'dayjs/locale/id'

export function PengumumanDetail({
  detail,
}: {
  detail: GetPengumumanDetailType
}) {
  return (
    <div className="flex flex-col gap-32">
      <div className="flex items-center gap-32">
        <p className="font-roboto text-[2.4rem] text-warna-dark">
          {detail?.judul}
        </p>
        <Link
          to={'/website/pengumuman/edit'}
          className="flex items-center gap-12 rounded-2xl bg-warna-dark px-24 py-12 text-[1.8rem] text-white"
        >
          <FontAwesomeIcon icon={faPencil} />
          <p>Perbaharui Data</p>
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-32">
        <IconComponent
          icon={<FontAwesomeIcon icon={faCalendarDay} />}
          label={dayjs(detail?.tanggal).locale('id').format('DD MMMM YYYY')}
        />
        <IconComponent
          icon={<FontAwesomeIcon icon={faUser} />}
          label={detail?.mod_user}
        />
        <IconComponent
          icon={<FontAwesomeIcon icon={faEye} />}
          label={`${detail?.hits} Views`}
        />
      </div>
      {detail?.isi && (
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: detail?.isi }}
        />
      )}
      {detail?.tags?.length > 0 && (
        <div className="flex items-center gap-16">
          {detail?.tags?.map((item, idx) => (
            <p
              className="rounded-2xl bg-warna-dark px-24 py-12 text-white"
              key={idx}
            >
              #{item?.nama}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
