import { ComingSoonPage } from '@/routes/loadables'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  KategoriTab,
  KategoriTable,
  KategoriPublish,
  BeritaDashboard,
} from '@/features/website/kategori'
import { convertSlugToText } from '@/utils/formatText'
import { useWebsiteKategori } from '@/hooks/website/useWebsiteKategori'

export default function Kategori() {
  const {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    search,
    setSearch,
    setIdKategori,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    isShowDelete,
    setIsShowDelete,
    isShowPublish,
    setIsShowPublish,
    loadingKategori,
    meta,
    handleSubmitDelete,
    isLoadingDeleteKategori,
    handleSubmitPublish,
    isLoadingPublishKategori,
    menu,
    setMenu,
    formPublish,
    secondPathname,
    dataKategori,
  } = useWebsiteKategori()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white">
      <div className="flex">
        <KategoriTab
          menu={menu}
          setMenu={setMenu}
          setPageNumber={setPageNumber}
          setPageSize={setPageSize}
          setSearch={setSearch}
        />
      </div>

      <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48">
        {menu === `Semua ${convertSlugToText(secondPathname)}` ? (
          <KategoriTable
            data={dataKategori}
            meta={meta}
            setPageNumber={setPageNumber}
            setPageSize={setPageSize}
            setSearch={setSearch}
            setIdKategori={setIdKategori}
            search={search}
            isLoading={loadingKategori}
            pageNumber={pageNumber}
            pageSize={pageSize}
            isShowDelete={isShowDelete}
            setIsShowDelete={setIsShowDelete}
            handleSubmitDelete={handleSubmitDelete}
            isLoadingDelete={isLoadingDeleteKategori}
            isLoadingPublish={isLoadingPublishKategori}
            setIsShowPublish={setIsShowPublish}
            isShowPublish={isShowPublish}
            handleSubmitPublish={handleSubmitPublish}
            form={formPublish}
            isUbah={isHakAksesUbah}
            isHapus={isHakAksesHapus}
            isTambah={isHakAksesTambah}
          />
        ) : menu === 'Publish' ? (
          <KategoriPublish
            isPublish
            loadingKategori={loadingKategori}
            kategori={dataKategori}
            search={search}
            setPageNumber={setPageNumber}
            setSearch={setSearch}
            handleSubmitDelete={handleSubmitDelete}
            handleSubmitPublish={handleSubmitPublish}
            isShowDelete={isShowDelete}
            isShowPublish={isShowPublish}
            setIsShowDelete={setIsShowDelete}
            setIsShowPublish={setIsShowPublish}
            isLoadingDelete={isLoadingDeleteKategori}
            isLoadingPublish={isLoadingPublishKategori}
            pageNumber={pageNumber}
            setPageSize={setPageSize}
            meta={meta}
            isHapus={isHakAksesHapus}
            isTambah={isHakAksesTambah}
            isUbah={isHakAksesUbah}
            pageSize={pageSize}
          />
        ) : menu === 'Draft' ? (
          <KategoriPublish
            loadingKategori={loadingKategori}
            kategori={dataKategori}
            search={search}
            setPageNumber={setPageNumber}
            setSearch={setSearch}
            handleSubmitDelete={handleSubmitDelete}
            handleSubmitPublish={handleSubmitPublish}
            isShowDelete={isShowDelete}
            isShowPublish={isShowPublish}
            setIsShowDelete={setIsShowDelete}
            setIsShowPublish={setIsShowPublish}
            isLoadingDelete={isLoadingDeleteKategori}
            isLoadingPublish={isLoadingPublishKategori}
            pageNumber={pageNumber}
            setPageSize={setPageSize}
            meta={meta}
            isHapus={isHakAksesHapus}
            isTambah={isHakAksesTambah}
            isUbah={isHakAksesUbah}
            pageSize={pageSize}
          />
        ) : menu === 'Dashboard' ? (
          <BeritaDashboard />
        ) : (
          <ComingSoonPage />
        )}
      </div>

      <ToastContainer />
    </div>
  )
}
