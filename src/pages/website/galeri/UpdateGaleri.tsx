import { ToastContainer } from 'react-toastify'
import { Breadcrumb } from '@/components/Breadcrumb'
import { convertSlugToText } from '@/utils/formatText'
import 'react-toastify/dist/ReactToastify.css'
import FormTambahGaleri from '@/components/Form/website/galeri/FormTambahGaleri'
import { useWebsiteGaleri } from '@/hooks/website/useWebsiteGaleri'

export default function UpdateGaleri() {
  const {
    idEdit,
    lastPathname,
    secondPathname,
    formUpdateGaleri,
    isLoadingUpdateGaleri,
    handleSubmitUpdate,
    isShowUpdate,
    setIsShowUpdate,
    setIsSubmit,
    isSubmit,
    isEdit,
    isHakAksesTambah,
    isHakAksesUbah,
  } = useWebsiteGaleri()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb editID={idEdit} />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {convertSlugToText(lastPathname)}{' '}
          {convertSlugToText(secondPathname)}
        </p>
        <FormTambahGaleri
          form={formUpdateGaleri}
          isLoading={isLoadingUpdateGaleri}
          handleSubmit={handleSubmitUpdate}
          setIsShow={setIsShowUpdate}
          setIsSubmit={setIsSubmit}
          isShow={isShowUpdate}
          isSubmit={isSubmit}
          isEdit={isEdit}
          isUbah={isHakAksesUbah}
          isTambah={isHakAksesTambah}
        />
      </div>
      <ToastContainer />
    </div>
  )
}
