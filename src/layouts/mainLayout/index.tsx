import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import BgImageLayer1 from '@/assets/images/asset-bg1.jpg'
import { MainHeader } from './MainHeader'
import { MainAplikasi } from './MainAplikasi'

export default function RootLayout() {
  const [fitur, setFitur] = useState<string>()

  return (
    <div
      className="flex h-screen items-center justify-center text-[2rem] phones:text-[2.4rem]"
      style={{ backgroundImage: `url(${BgImageLayer1})` }}
    >
      <div className="scrollbar flex h-auto max-h-[98vh] w-[80%] flex-col overflow-y-auto rounded-4x border-4 border-warna-pale-blue phones:h-full phones:max-h-full phones:w-full phones:rounded-none phones:border-0">
        <div className="rounded-tl-4x rounded-tr-4x bg-warna-primary p-32 text-white phones:rounded-none">
          <MainHeader />
        </div>
        <div className="scrollbar flex h-full w-full overflow-y-auto">
          <div className="scrollbar h-full w-2/3 overflow-y-auto bg-white p-48 phones:w-full">
            <MainAplikasi setFitur={setFitur} />
          </div>
          <div className="w-1/3 bg-warna-pale-blue p-48 phones:hidden phones:w-full">
            <div className="flex flex-col gap-0">
              <p className="font-roboto text-[3.2rem] text-warna-dark">
                Keterangan
              </p>
              {fitur && (
                <div
                  dangerouslySetInnerHTML={{ __html: fitur }}
                  className="article-content"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}
