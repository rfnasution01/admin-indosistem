import { Breadcrumb } from '@/components/Breadcrumb'
import { usePathname } from '@/hooks/usePathname'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'
import FormTambahProfil from '@/components/Form/website/profil/FormTambahProfil'
import { useWebsiteAkses } from '@/hooks/website/websiteAkses'
import { useWebsiteTentangSekolah } from '@/hooks/website/profilSekolah'

export default function WebsiteTambahTentangSekolah() {
  const { lastPathname, secondPathname } = usePathname()
  const { isHakAksesUbah, isHakAksesTambah } = useWebsiteAkses()
  const {
    formTambahProfil,
    isLoadingTambahProfil,
    handleSubmitTambahProfil,
    setIsShowUpdate,
    isShowUpdate,
    isSubmit,
    setIsSubmit,
  } = useWebsiteTentangSekolah()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {capitalizeFirstLetterFromLowercase(lastPathname)}{' '}
          {capitalizeFirstLetterFromLowercase(secondPathname)}
        </p>
        <FormTambahProfil
          form={formTambahProfil}
          isLoading={isLoadingTambahProfil}
          handleSubmit={handleSubmitTambahProfil}
          setIsShow={setIsShowUpdate}
          setIsSubmit={setIsSubmit}
          isShow={isShowUpdate}
          isSubmit={isSubmit}
          isUbah={isHakAksesUbah}
          isTambah={isHakAksesTambah}
        />
      </div>
      <ToastContainer />
    </div>
  )
}
