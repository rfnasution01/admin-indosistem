import DefaultImg from '@/assets/images/default.jpg'
import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'
import { Link } from 'react-router-dom'

export function CardBerita({
  id,
  gambar,
  judul,
  penulis,
  view,
}: {
  id: string
  gambar: string
  judul: string
  penulis: string
  view: string
}) {
  return (
    <Link
      to={'detail'}
      onClick={() => {
        localStorage.setItem('editID', id)
      }}
      className="flex transform gap-16 transition-transform duration-300 ease-in-out hover:scale-105 phones:flex-col"
    >
      <img
        src={gambar === '' || !gambar ? DefaultImg : gambar}
        alt={judul}
        className="h-[8rem] w-[10rem] rounded-2xl"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-8">
        {judul && (
          <p
            className="line-clamp-2 font-roboto text-[2.2rem]"
            style={{ lineHeight: '130%' }}
          >
            {judul}
          </p>
        )}
        {penulis && (
          <p className="text-warna-grey">
            Oleh {capitalizeFirstLetterFromLowercase(penulis)}
          </p>
        )}
      </div>
      {view && (
        <div className="flex flex-col items-end justify-start text-warna-grey phones:flex-row phones:justify-end phones:gap-8">
          <p>{view}</p>
          <p>Kali Dibaca</p>
        </div>
      )}
    </Link>
  )
}
