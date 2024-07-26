import { Breadcrumb } from '@/components/Breadcrumb'
import { Loading } from '@/components/Loading'
import {
  KategoriDetail,
  KategoriDetailGambar,
} from '@/features/website/kategori'
import { useWebsiteKategori } from '@/hooks/website/kategori'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function DetailKategori() {
  const {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    isShowDelete,
    setIsShowDelete,
    loadingKategori,
    dataDetailKategori,
    handleSubmitDeleteGambar,
    isLoadingDeleteGambar,
    id,
    dataGambarKategori,
  } = useWebsiteKategori()

  console.log({ id })

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        {loadingKategori ? (
          <Loading />
        ) : (
          <>
            <KategoriDetail detail={dataDetailKategori} isUbah />
            <KategoriDetailGambar
              gambar={dataGambarKategori}
              setIsShowDelete={setIsShowDelete}
              handleSubmitDeleteGambar={handleSubmitDeleteGambar}
              isLoadingDeleteKategori={isLoadingDeleteGambar}
              isShowDelete={isShowDelete}
              editID={id}
              isHapus={isHakAksesHapus}
              isUbah={isHakAksesUbah}
              isTambah={isHakAksesTambah}
            />
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}
