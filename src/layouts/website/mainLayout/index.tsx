import Helmet from 'react-helmet'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import { WebsiteMainHeader } from './MainLayoutAside'

export default function WebsiteMainLayout() {
  return (
    <div className="flex h-screen w-full bg-warna-pale-blue text-[2rem] phones:text-[2.4rem]">
      {/* --- Aside --- */}
      <WebsiteMainHeader />
      <div className="flex h-full flex-1 flex-col p-32">
        <Outlet />
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Website</title>
        <link rel="canonical" href="https://demolaman1.avnet.id/" />
      </Helmet>
      <ToastContainer />
    </div>
  )
}
