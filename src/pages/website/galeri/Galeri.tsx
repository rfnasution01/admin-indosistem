import { ComingSoonPage } from '@/routes/loadables'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GaleriAlbum, GaleriTab } from '@/features/website/galeri'
import { useWebsiteGaleri } from '@/hooks/website/useWebsiteGaleri'

export default function Galeri() {
  const {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    menu,
    setMenu,
    search,
    setSearch,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    isShowDelete,
    setIsShowDelete,
    dataGaleri,
    meta,
    loadingGaleri,
    handleSubmitDeleteAlbum,
    isLoadingDeleteGaleri,
  } = useWebsiteGaleri()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white">
      <div className="flex">
        <GaleriTab
          menu={menu}
          setMenu={setMenu}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          setSearch={setSearch}
        />
      </div>

      <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48">
        {menu === `Album` ? (
          <GaleriAlbum
            data={dataGaleri}
            isLoadingGaleri={loadingGaleri}
            isLoadingDeleteGaleri={isLoadingDeleteGaleri}
            handleSubmitDelete={handleSubmitDeleteAlbum}
            meta={meta}
            isShowDelete={isShowDelete}
            setPageNumber={setPageNumber}
            setSearch={setSearch}
            search={search}
            setIsShowDelete={setIsShowDelete}
            setPageSize={setPageSize}
            pageNumber={pageNumber}
            isHapus={isHakAksesHapus}
            isTambah={isHakAksesTambah}
            isUbah={isHakAksesUbah}
            pageSize={pageSize}
          />
        ) : (
          <ComingSoonPage />
        )}
      </div>

      <ToastContainer />
    </div>
  )
}
