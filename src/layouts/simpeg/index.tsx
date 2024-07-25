import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx'
import { SimpegMainHeader } from './MainLayoutAside'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import Time from '@/components/Time'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { MenubarProfil } from '@/components/Menubar/MenubarProfile'
import { useLogout } from '@/hooks/useLogout'
import { ValidasiLogout } from '@/components/Dialog/ValidasiLogout'
import { useSimpegIdentitas } from '@/hooks/simpeg'
import { usePathname } from '@/hooks/usePathname'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function SimpegMainLayout() {
  const navigate = useNavigate()
  const { splittedPath, firstPathname, secondPathname, thirdPathname } =
    usePathname()
  const { isShowLogout, setIsShowLogout, handleLogout } = useLogout()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { simpegIdentitas } = useSimpegIdentitas()

  return (
    <HelmetProvider>
      <div className="flex h-screen w-full bg-background-secondary text-[2rem] phones:flex-col phones:text-[2.4rem]">
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
          <div className="flex h-auto items-center justify-between gap-32 bg-white px-64 py-12 phones:hidden phones:p-32">
            <span
              onClick={() => {
                if (splittedPath?.length > 4) {
                  navigate(
                    `/${firstPathname}/${secondPathname}/${thirdPathname}`,
                  )
                } else {
                  navigate(-1)
                }
              }}
              className="hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </span>
            <div className="flex flex-col items-center justify-center gap-4">
              <p>{dayjs().locale('id').format('dddd, DD MMMM YYYY')}</p>
              <Time />
            </div>
            <MenubarProfil setIsShowLogout={setIsShowLogout} />
          </div>
          <div className="scrollbar flex h-full w-full flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{simpegIdentitas?.nama_aplikasi}</title>
          <link rel="canonical" href="https://demolaman1.avnet.id/" />
          <meta name="description" content={simpegIdentitas?.deskripsi} />
          <meta name="keywords" content="keyword1, keyword2, keyword3" />
          <meta property="og:title" content={simpegIdentitas?.nama_aplikasi} />
          <meta
            property="og:description"
            content={simpegIdentitas?.deskripsi}
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://demolaman1.avnet.id/" />
          <meta property="og:image" content={simpegIdentitas?.logo} />
          <meta name="twitter:card" content={simpegIdentitas?.nama_aplikasi} />
          <meta name="twitter:title" content={simpegIdentitas?.nama_aplikasi} />
          <meta
            name="twitter:description"
            content={simpegIdentitas?.deskripsi}
          />
          <meta name="twitter:image" content={simpegIdentitas?.logo} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="icon"
            href={simpegIdentitas?.favicon}
            type="image/x-icon"
          />
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
        <ValidasiLogout
          isOpen={isShowLogout}
          setIsOpen={setIsShowLogout}
          child={
            <button
              onClick={handleLogout}
              className="flex items-center gap-12 rounded-2xl bg-warna-red px-24 py-12 text-white"
            >
              <FontAwesomeIcon icon={faDoorClosed} />
              <p>Logout</p>
            </button>
          }
        />
        <ToastContainer />
      </div>
    </HelmetProvider>
  )
}
