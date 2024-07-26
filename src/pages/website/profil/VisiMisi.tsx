import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Loading } from '@/components/Loading'
import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'
import { ComingSoonPage } from '@/routes/loadables'
import FormTambahProfil from '@/components/Form/website/profil/FormTambahProfil'
import {
  VisiMisiMain,
  VisiMisiTab,
} from '@/features/website/profil/visiMisiSekolah'
import { useWebsiteAkses } from '@/hooks/website/websiteAkses'
import {
  useWebsiteTentangSekolah,
  useWebsiteVisiMisi,
} from '@/hooks/website/profilSekolah'

export default function VisiMisi() {
  const { isHakAksesUbah } = useWebsiteAkses()
  const {
    menu,
    setMenu,
    isShowUpdate,
    setIsShowUpdate,
    isSubmit,
    setIsSubmit,
    formTambahProfil,
    isLoadingTambahProfil,
    handleSubmitTambahProfil,
  } = useWebsiteTentangSekolah()
  const { loadingVisiMisiSekolah, dataVisiMisi } = useWebsiteVisiMisi()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
      {loadingVisiMisiSekolah ? (
        <Loading />
      ) : (
        <>
          <div className="flex">
            <VisiMisiTab menu={menu} setMenu={setMenu} />
          </div>
          <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48 pb-48">
            {menu === 'Preview' ? (
              <VisiMisiMain
                data={dataVisiMisi}
                setMenu={setMenu}
                isUbah={isHakAksesUbah}
              />
            ) : menu === 'Visi' || menu === 'Misi' ? (
              <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto ">
                <p className="font-roboto text-[2.4rem] text-warna-dark">
                  Form Edit {capitalizeFirstLetterFromLowercase(menu)}
                </p>
                <FormTambahProfil
                  form={formTambahProfil}
                  isLoading={isLoadingTambahProfil}
                  handleSubmit={handleSubmitTambahProfil}
                  setIsShow={setIsShowUpdate}
                  setIsSubmit={setIsSubmit}
                  isShow={isShowUpdate}
                  isSubmit={isSubmit}
                  isEdit
                  menu={menu}
                  isTambah={false}
                  isUbah={isHakAksesUbah}
                />
              </div>
            ) : (
              <ComingSoonPage />
            )}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  )
}
