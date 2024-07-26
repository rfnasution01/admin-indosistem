import { Breadcrumb } from '@/components/Breadcrumb'
import { usePathname } from '@/hooks/usePathname'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'
import FormTambahFasilitas from '@/components/Form/website/profil/FormTambahFasilitas'
import { useWebsiteFasilitas } from '@/hooks/website/profilSekolah'

export default function WebsiteTambahFasilitasSekolah() {
  const { lastPathname, thirdPathname } = usePathname()
  const {
    isHakAksesTambah,
    isHakAksesUbah,
    handleSubmitUpdateFasilitas,
    isLoadingTambahFasilitas,
    formUpdateFasilitas,
    setIsSubmit,
    isSubmit,
    setIsShowUpdate,
    isShowUpdate,
    isEdit,
  } = useWebsiteFasilitas()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {capitalizeFirstLetterFromLowercase(lastPathname)}{' '}
          {capitalizeFirstLetterFromLowercase(thirdPathname)}
        </p>
        <FormTambahFasilitas
          form={formUpdateFasilitas}
          isLoading={isLoadingTambahFasilitas}
          handleSubmit={handleSubmitUpdateFasilitas}
          setIsShow={setIsShowUpdate}
          setIsSubmit={setIsSubmit}
          isShow={isShowUpdate}
          isSubmit={isSubmit}
          isEdit={isEdit}
          isTambah={isHakAksesTambah}
          isUbah={isHakAksesUbah}
        />
      </div>
      <ToastContainer />
    </div>
  )
}
