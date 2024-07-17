import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import BgImageLayer1 from '@/assets/images/asset-bg1.jpg'
import { Outlet } from 'react-router-dom'

export default function ProfileLayout() {
  return (
    <div
      className="flex h-screen items-center justify-center text-[2rem] phones:text-[2.4rem]"
      style={{ backgroundImage: `url(${BgImageLayer1})` }}
    >
      <div className="scrollbar flex h-auto max-h-[98vh] w-[80%] flex-col gap-32 overflow-y-auto rounded-4x border-4 border-warna-pale-blue bg-white p-32 phones:h-full phones:max-h-full phones:w-full phones:rounded-none phones:border-0">
        <Outlet />
      </div>

      <ToastContainer />
    </div>
  )
}
