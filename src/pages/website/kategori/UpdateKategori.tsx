import { ToastContainer } from 'react-toastify'
import { Breadcrumb } from '@/components/Breadcrumb'
import { convertSlugToText } from '@/utils/formatText'
import FormTambahKategori from '@/components/Form/website/kategori/FormTambahKategori'
import 'react-toastify/dist/ReactToastify.css'
import { useWebsiteKategori } from '@/hooks/website/kategori'
export default function UpdateKategori() {
  const {
    isHakAksesTambah,
    isHakAksesUbah,
    isSubmit,
    setIsSubmit,
    idEdit,
    isEdit,
    lastPathname,
    secondPathname,
    dataDetailKategori,
    isShowTambahKategori,
    setIsShowTambahKategori,
    handleSubmitUpdateKatefori,
    isLoadingUpdateKategori,
    formTambahKategori,
  } = useWebsiteKategori()

  const transformedData = dataDetailKategori?.tags?.map((item) => ({
    value: item?.id,
    label: item?.nama,
  }))

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb editID={idEdit} />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {convertSlugToText(lastPathname)}{' '}
          {convertSlugToText(secondPathname)}
        </p>
        <FormTambahKategori
          form={formTambahKategori}
          isLoading={isLoadingUpdateKategori}
          handleSubmit={handleSubmitUpdateKatefori}
          setIsShow={setIsShowTambahKategori}
          setIsSubmit={setIsSubmit}
          isShow={isShowTambahKategori}
          isSubmit={isSubmit}
          defaultValues={transformedData}
          isEdit={isEdit}
          isTambah={isHakAksesTambah}
          isUbah={isHakAksesUbah}
        />
      </div>
      <ToastContainer />
    </div>
  )
}
