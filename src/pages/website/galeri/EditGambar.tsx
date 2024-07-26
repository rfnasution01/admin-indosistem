import { Breadcrumb } from '@/components/Breadcrumb'
import { convertSlugToText } from '@/utils/formatText'
import { ToastContainer } from 'react-toastify'
import FormEditGambar from '@/components/Form/website/kategori/FormEditGambar'
import { useWebsiteGaleri } from '@/hooks/website/useWebsiteGaleri'

export default function EditGambar() {
  const {
    idEdit,
    lastPathname,
    formEditGambar,
    isLoadingEditGambar,
    setIsShowEditGambar,
    isShowEditGambar,
    isSubmit,
    setIsSubmit,
    handleSubmitEditGambar,
    isHakAksesUbah,
  } = useWebsiteGaleri()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb editID={idEdit} />
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
