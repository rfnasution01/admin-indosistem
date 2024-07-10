import { usePathname } from '@/hooks/usePathname'
import { convertSlugToText } from '@/utils/formatText'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

export function Breadcrumb({ editID }: { editID?: string }) {
  const navigate = useNavigate()

  const { secondPathname, thirdPathname, lastPathname } = usePathname()

  return (
    <div className="flex items-center gap-12 text-warna-grey">
      <p
        className="hover:cursor-pointer"
        onClick={() => {
          localStorage.setItem('editID', editID)
          navigate(-1)
        }}
      >
        {thirdPathname === 'tentang'
          ? 'Tentang Sekolah'
          : secondPathname === 'pengumuman' ||
              secondPathname === 'berita' ||
              secondPathname === 'agenda' ||
              secondPathname === 'prestasi' ||
              secondPathname === 'mading' ||
              secondPathname === 'galeri' ||
              secondPathname === 'kontak'
            ? convertSlugToText(secondPathname)
            : convertSlugToText(thirdPathname)}
      </p>
      <p className="text-[1.6rem]">
        <FontAwesomeIcon icon={faChevronRight} />
      </p>
      <p className="text-warna-primary hover:cursor-not-allowed">
        {convertSlugToText(lastPathname)}
      </p>
    </div>
  )
}
