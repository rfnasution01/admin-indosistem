import {
  PreviewMain,
  TentangSekolahTab,
} from '@/features/website/profil/tentangSekolah'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Loading } from '@/components/Loading'
import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'
import { ComingSoonPage } from '@/routes/loadables'
import FormTambahProfil from '@/components/Form/website/profil/FormTambahProfil'
import FormUpdateIdentitas from '@/components/Form/website/profil/FormEditIdentitas'
import { useWebsiteTentangSekolah } from '@/hooks/website/profilSekolah'

export default function WebsiteTentangSekolah() {
  const {
    menu,
    setMenu,
    dataTentangSekolah,
    loadingTentangSekolah,
    handleSubmitDelete,
    isLoadingDeleteTentang,
    handleSubmitTambahProfil,
    isLoadingTambahProfil,
    handleSubmitUpdateProfil,
    isLoadingUpdateProfil,
    formIdentitas,
    formTambahProfil,
    isShowUpdate,
    isSubmit,
    setIsShowUpdate,
    setIsSubmit,
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
  } = useWebsiteTentangSekolah()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
      {loadingTentangSekolah ? (
        <Loading />
      ) : (
        <>
          <div className="flex">
            <TentangSekolahTab
              menu={menu}
              setMenu={setMenu}
              data={dataTentangSekolah}
            />
          </div>
          <div className="scrollbar flex h-full flex-1 overflow-y-auto px-48 pb-48">
            {menu === 'Preview' ? (
              <PreviewMain
                data={dataTentangSekolah}
                setMenu={setMenu}
                handleSubmitDelete={handleSubmitDelete}
                isLoadingDelete={isLoadingDeleteTentang}
                isUbah={isHakAksesUbah}
                isHapus={isHakAksesHapus}
                isTambah={isHakAksesTambah}
              />
            ) : menu === 'Identitas' ? (
              <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto ">
                <p className="font-roboto text-[2.4rem] text-warna-dark">
                  Form Edit {capitalizeFirstLetterFromLowercase(menu)}
                </p>
                <FormUpdateIdentitas
                  form={formIdentitas}
                  isLoading={isLoadingUpdateProfil}
                  handleSubmit={handleSubmitUpdateProfil}
                  setIsShow={setIsShowUpdate}
                  setIsSubmit={setIsSubmit}
                  isShow={isShowUpdate}
                  isSubmit={isSubmit}
                  isUbah={isHakAksesUbah}
                />
              </div>
            ) : menu === 'Tujuan' || menu === 'Sasaran' || menu === 'Hasil' ? (
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
                  isUbah={isHakAksesUbah}
                  isTambah={isHakAksesTambah}
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
