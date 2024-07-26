import { Breadcrumb } from '@/components/Breadcrumb'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { convertSlugToText } from '@/utils/formatText'
import FormTambahGambar from '@/components/Form/website/kategori/FormTambahGambar'
import { useWebsiteKategori } from '@/hooks/website/kategori'

export default function TambahGambar() {
  const {
    isHakAksesTambah,
    isSubmit,
    setIsSubmit,
    handleSubmitTambahGambar,
    isLoadingTambahGambar,
    formTambahGambar,
    isShowTambahGambar,
    setIsShowTambahGambar,
    idEdit,
    lastPathname,
  } = useWebsiteKategori()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb editID={idEdit} />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {convertSlugToText(lastPathname)}
        </p>
        <FormTambahGambar
          form={formTambahGambar}
          isLoading={isLoadingTambahGambar}
          handleSubmit={handleSubmitTambahGambar}
          setIsShow={setIsShowTambahGambar}
          setIsSubmit={setIsSubmit}
          isShow={isShowTambahGambar}
          isSubmit={isSubmit}
          isTambah={isHakAksesTambah}
        />
      </div>
      <ToastContainer />
    </div>
  )
}
