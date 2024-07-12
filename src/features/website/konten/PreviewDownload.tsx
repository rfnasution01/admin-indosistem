import DefaultImg from '@/assets/images/default.jpg'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export function PreviewDownload({
  judul,
  name_jenis,
  jenis_file,
  gambar,
}: {
  judul?: string
  gambar?: string
  jenis_file?: string
  name_jenis?: string
}) {
  return (
    <div className="scrollbar flex h-full gap-48 overflow-y-auto phones:flex-col phones:items-start phones:gap-32">
      {jenis_file === 'Upload' && (
        <img
          src={gambar !== '' && gambar ? gambar : DefaultImg}
          alt={judul}
          className="h-[30rem] rounded-2xl filter phones:h-[20rem] phones:w-full"
          loading="lazy"
        />
      )}

      <div className="flex flex-1 flex-col gap-16">
        {judul && <p className="font-roboto">{judul}</p>}
        <div className="flex flex-wrap items-center  gap-24">
          <div className="flex items-center gap-12">
            {name_jenis && (
              <p className="rounded-2xl bg-warna-grey px-24 py-12 text-[1.8rem] text-white">
                {name_jenis}
              </p>
            )}
            {jenis_file && (
              <p className="rounded-2xl bg-warna-primary px-24 py-12 text-[1.8rem] text-white">
                {jenis_file}
              </p>
            )}
          </div>
          {jenis_file === 'Link' && (
            <Link
              to={gambar}
              target="_blank"
              className="flex items-center gap-12 text-warna-dark"
            >
              <FontAwesomeIcon icon={faLink} />
              <p>{gambar}</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
