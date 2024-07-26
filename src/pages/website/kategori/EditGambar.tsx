import { Breadcrumb } from '@/components/Breadcrumb'
import { convertSlugToText } from '@/utils/formatText'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FormEditGambar from '@/components/Form/website/kategori/FormEditGambar'
import { useWebsiteKategori } from '@/hooks/website/useWebsiteKategori'

export default function EditGambar() {
  const {
    isShowEditGambar,
    setIsShowEditGambar,
    handleSubmitEditGambar,
    isLoadingEditGambar,
    id,
    lastPathname,
    formEditGambar,
    setIsSubmit,
    isSubmit,
    isHakAksesUbah,
  } = useWebsiteKategori()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb editID={id} />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {convertSlugToText(lastPathname)}
        </p>
        <FormEditGambar
          form={formEditGambar}
          isLoading={isLoadingEditGambar}
          handleSubmit={handleSubmitEditGambar}
          setIsShow={setIsShowEditGambar}
          setIsSubmit={setIsSubmit}
          isShow={isShowEditGambar}
          isSubmit={isSubmit}
          isUbah={isHakAksesUbah}
        />
      </div>
      <ToastContainer />
    </div>
  )
}
