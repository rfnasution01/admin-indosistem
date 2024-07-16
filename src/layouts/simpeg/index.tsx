import Helmet from 'react-helmet'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { SimpegMainHeader } from './MainLayoutAside'
import { useGetSimpegIdentitasQuery } from '@/store/slices/simpeg/identitasType'
import { GetIdentitasWebsiteType } from '@/types/website/menuType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Time from '@/components/Time'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

export default function SimpegMainLayout() {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [identitas, setIdentitas] = useState<GetIdentitasWebsiteType>()
  const { data } = useGetSimpegIdentitasQuery()

  useEffect(() => {
    if (data?.data) {
      setIdentitas(data?.data)
    }
  }, [data])

  return (
    <div className="bg-background-secondary flex h-screen w-full text-[2rem] phones:flex-col phones:text-[2.4rem]">
      {/* --- Aside --- */}
      <SimpegMainHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={clsx(
          'scrollbar flex h-full flex-1 flex-col overflow-y-auto',
          {
            'phones:hidden': isOpen,
          },
        )}
      >
        <div className="flex h-auto items-center justify-between gap-32 bg-white px-64 py-32 phones:hidden phones:p-32">
          <span
            onClick={() => {
              navigate(-1)
            }}
            className="hover:cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
          <div className="flex flex-col items-center justify-center gap-4">
            <p>{dayjs().locale('id').format('dddd, DD MMMM YYYY')}</p>
            <Time />
          </div>
          <div className="flex items-center gap-12">
            <img
              src={identitas?.gambar}
              alt={identitas?.nama_aplikasi}
              loading="lazy"
              className="w-[5rem]"
            />
            <p>{identitas?.nama_aplikasi}</p>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        <div className="scrollbar flex h-full w-full flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{identitas?.nama_aplikasi}</title>
        <link rel="canonical" href="https://demolaman1.avnet.id/" />
        <meta name="description" content={identitas?.deskripsi} />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <meta property="og:title" content={identitas?.nama_aplikasi} />
        <meta property="og:description" content={identitas?.deskripsi} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://demolaman1.avnet.id/" />
        <meta property="og:image" content={identitas?.logo} />
        <meta name="twitter:card" content={identitas?.nama_aplikasi} />
        <meta name="twitter:title" content={identitas?.nama_aplikasi} />
        <meta name="twitter:description" content={identitas?.deskripsi} />
        <meta name="twitter:image" content={identitas?.logo} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={identitas?.favicon} type="image/x-icon" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://demolaman1.avnet.id/",
            "name": "Nama Website",
            "description": "Deskripsi singkat tentang website."
          }
        `}
        </script>
      </Helmet>
      <ToastContainer />
    </div>
  )
}
