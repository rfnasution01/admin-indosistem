import 'react-toastify/dist/ReactToastify.css'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Loading } from '@/components/Loading'
import { GaleriDetail } from '@/features/website/galeri'
import { useWebsiteGaleri } from '@/hooks/website/useWebsiteGaleri'

export default function DetailGaleri() {
  const {
    pageNumberDetail,
    pageSizeDetail,
    setPageNumberDetail,
    setPageSizeDetail,
    isShowDeleteDetail,
    setIsShowDeleteDetail,
    dataDetailGaleri,
    metaDetail,
    dataPhoto,
    loadingDetail,
    handleSubmitDeleteGambar,
    isLoadingDetailGaleriSekolah,
    isHakAksesHapus,
    isHakAksesUbah,
    isHakAksesTambah,
    idEdit,
  } = useWebsiteGaleri()
  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        {loadingDetail ? (
          <Loading />
        ) : (
          <GaleriDetail
            detail={dataDetailGaleri}
            photo={dataPhoto}
            meta={metaDetail}
            setPageNumber={setPageNumberDetail}
            setPageSize={setPageSizeDetail}
            setIsShowDelete={setIsShowDeleteDetail}
            isShowDelete={isShowDeleteDetail}
            isLoadingDeleteGaleri={isLoadingDetailGaleriSekolah}
            handleSubmitDeleteGambar={handleSubmitDeleteGambar}
            pageNumber={pageNumberDetail}
            editID={idEdit}
            isHapus={isHakAksesHapus}
            isUbah={isHakAksesUbah}
            isTambah={isHakAksesTambah}
            pageSize={pageSizeDetail}
          />
        )}
      </div>
    </div>
  )
}
