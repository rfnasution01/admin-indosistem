import { Breadcrumb } from '@/components/Breadcrumb'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Loading } from '@/components/Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faCaretUp,
  faEye,
  faEyeSlash,
  faPlus,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import FormTambahProgram from '@/components/Form/website/profil/FormTambahProgram'

import FormTambahLayanan from '@/components/Form/website/profil/FormTambahLayanan'
import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'
import { ValidasiDelete } from '@/components/Dialog/ValidasiDelete'
import { useWebsiteProgramSekolah } from '@/hooks/website/profilSekolah'

export default function TambahProgram() {
  const {
    loadingProgram,
    loadingLayanan,
    handleSubmit,
    isLoadingTambahLayanan,
    isLoadingTambahProgram,
    setProgramByID,
    setLayananByID,
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    jenis,
    handleSubmitDeleteLayanan,
    handleSubmitDeleteProgram,
    setIsShowDelete,
    isShowDelete,
    isLoadingDeleteLayanan,
    isLoadingDeleteProgram,
    toggleAccordion,
    item,
    deleteID,
    formLayanan,
    formProgram,
    activeAccordion,
    isShow,
    setIsShow,
    isSubmit,
    setIsSubmit,
    setDeleteID,
  } = useWebsiteProgramSekolah()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="flex flex-col gap-32">
        <div className="flex">
          <button
            disabled={!isHakAksesTambah}
            onClick={() => {
              toggleAccordion('tambah')
              if (jenis === 'program') {
                formProgram?.reset()
                setProgramByID(null)
              }
              if (jenis === 'layanan') {
                formLayanan?.reset()
                setLayananByID(null)
              }
            }}
            className="flex items-center gap-24 rounded-2xl bg-warna-dark px-24 py-12 text-white hover:cursor-pointer hover:bg-opacity-80 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faPlus} />
            <p>Tambah {capitalizeFirstLetterFromLowercase(jenis)}</p>
          </button>
        </div>
        {activeAccordion === 'tambah' && (
          <div className="flex flex-col gap-32 transition-all duration-300 ease-in-out">
            {jenis === 'program' ? (
              <FormTambahProgram
                form={formProgram}
                isLoading={isLoadingTambahProgram}
                handleSubmit={handleSubmit}
                setIsShow={setIsShow}
                setIsSubmit={setIsSubmit}
                isShow={isShow}
                isSubmit={isSubmit}
                isTambah={isHakAksesTambah}
                isUbah={isHakAksesUbah}
              />
            ) : (
              <FormTambahLayanan
                form={formLayanan}
                isLoading={isLoadingTambahLayanan}
                handleSubmit={handleSubmit}
                setIsShow={setIsShow}
                setIsSubmit={setIsSubmit}
                isShow={isShow}
                isSubmit={isSubmit}
                isTambah={isHakAksesTambah}
                isUbah={isHakAksesUbah}
              />
            )}
          </div>
        )}
      </div>
      {loadingLayanan || loadingProgram ? (
        <Loading />
      ) : item?.length > 0 ? (
        <div className="flex flex-col gap-32">
          {item?.map((list, idx) => {
            const isOpen = activeAccordion === list?.id
            return (
              <div className="flex flex-col gap-32" key={idx}>
                <div
                  onClick={() => {
                    toggleAccordion(list?.id)
                    if (jenis === 'program') {
                      setProgramByID(list)
                    }
                    if (jenis === 'layanan') {
                      setLayananByID(list)
                    }
                  }}
                  className="flex w-full items-center justify-between gap-24 hover:cursor-pointer phones:w-full"
                >
                  <div className="flex items-center gap-24">
                    <button
                      disabled={!isHakAksesHapus}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setIsShowDelete(true)
                        setDeleteID(list?.id)
                      }}
                      className="text-warna-red hover:cursor-pointer disabled:cursor-not-allowed"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    {jenis === 'program' && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        // className="hover:cursor-pointer hover:text-warna-primary"
                      >
                        {list?.aktif === '1' ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        )}
                      </button>
                    )}
                    {jenis === 'program' && list?.judul && (
                      <p className="font-roboto text-warna-dark">
                        {list?.judul}
                      </p>
                    )}
                    {jenis === 'layanan' && list?.nama_layanan && (
                      <p className="font-roboto text-warna-dark">
                        {list?.nama_layanan}
                      </p>
                    )}
                    <span>
                      {isOpen ? (
                        <FontAwesomeIcon icon={faCaretUp} />
                      ) : (
                        <FontAwesomeIcon icon={faCaretDown} />
                      )}
                    </span>
                  </div>
                </div>
                {isOpen && (
                  <div className="flex flex-col gap-32 transition-all duration-300 ease-in-out">
                    {jenis === 'program' ? (
                      <FormTambahProgram
                        form={formProgram}
                        isLoading={isLoadingTambahProgram}
                        handleSubmit={handleSubmit}
                        setIsShow={setIsShow}
                        setIsSubmit={setIsSubmit}
                        isShow={isShow}
                        isSubmit={isSubmit}
                        isTambah={isHakAksesTambah}
                        isUbah={isHakAksesUbah}
                        isEdit
                      />
                    ) : (
                      <FormTambahLayanan
                        form={formLayanan}
                        isLoading={isLoadingTambahLayanan}
                        handleSubmit={handleSubmit}
                        setIsShow={setIsShow}
                        setIsSubmit={setIsSubmit}
                        isShow={isShow}
                        isSubmit={isSubmit}
                        isTambah={isHakAksesTambah}
                        isUbah={isHakAksesUbah}
                        isEdit
                      />
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <p>Belum ada data</p>
      )}
      <ValidasiDelete
        isOpen={isShowDelete}
        setIsOpen={setIsShowDelete}
        child={
          <button
            type="button"
            disabled={
              jenis === 'program'
                ? isLoadingDeleteProgram
                : isLoadingDeleteLayanan
            }
            onClick={() => {
              jenis === 'program'
                ? handleSubmitDeleteProgram(deleteID)
                : handleSubmitDeleteLayanan(deleteID)
            }}
            className="flex items-center gap-12 rounded-2xl bg-warna-red px-24 py-12 text-white hover:bg-opacity-80"
          >
            {isLoadingDeleteProgram || isLoadingDeleteLayanan ? (
              <span className="animate-spin duration-300">
                <FontAwesomeIcon icon={faSpinner} />
              </span>
            ) : (
              <FontAwesomeIcon icon={faTrash} />
            )}
            <p className="font-sf-pro">Hapus</p>
          </button>
        }
      />
      <ToastContainer />
    </div>
  )
}
