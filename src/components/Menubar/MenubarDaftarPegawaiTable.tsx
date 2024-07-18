import { Dispatch, SetStateAction, useState } from 'react'
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from './Menubar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBinoculars,
  faEllipsis,
  faKey,
  faPencil,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { ValidasiDelete } from '../Dialog/ValidasiDelete'
import { DaftarPegawai } from '../Table/TableDaftarPegawai'
import { UseFormReturn } from 'react-hook-form'
import { ValidasiReset } from '../Dialog/ValidasiReset'
import { FormResetPassword } from '../Form/simpeg/daftarPegawai'

type Props<T> = {
  data: T
  handleSubmitDelete: (id: string) => Promise<void>
  handleSubmitResetPassword: () => Promise<void>
  setIsShowDelete: Dispatch<SetStateAction<boolean>>
  setId: Dispatch<SetStateAction<string>>
  isShowDelete: boolean
  setIsShowReset: Dispatch<SetStateAction<boolean>>
  isShowReset: boolean
  isLoadingDelete: boolean
  isLoadingReset: boolean
  isUbah: boolean
  isHapus: boolean
  form: UseFormReturn
  id: string
}

export function MenubarActionDaftarPegawai<T extends DaftarPegawai>({
  data,
  handleSubmitDelete,
  handleSubmitResetPassword,
  isLoadingReset,
  setIsShowDelete,
  isLoadingDelete,
  isShowDelete,
  setIsShowReset,
  isShowReset,
  isHapus,
  isUbah,
  form,
  setId,
  id,
}: Props<T>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Menubar className="px-4">
      <MenubarMenu>
        <MenubarTrigger
          className="w-full text-center transition-all duration-300 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
          variant="nothing"
          layout="icon"
          size="fit"
          onClick={() => {
            setId(data?.id_pegawai)
            handleMenuClick()
          }}
        >
          <span className={`rounded-2xl`}>
            <FontAwesomeIcon icon={faEllipsis} size="xl" />
          </span>
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent className="absolute right-[2rem] top-[-11rem] w-[28rem] bg-white p-32 text-[2rem] text-warna-dark shadow-lg transition-all duration-300">
            <div className="flex flex-col gap-12">
              <Link
                to={'detail'}
                onClick={() => {
                  localStorage.setItem('editID', data?.id_pegawai)
                  localStorage.setItem('editData', JSON.stringify(data))
                }}
                className="flex items-center gap-12 border-l-4 border-transparent px-16 py-12 text-warna-primary hover:border-warna-primary hover:bg-warna-primary hover:bg-opacity-10"
              >
                <FontAwesomeIcon icon={faBinoculars} />
                <p>Detail</p>
              </Link>

              {isUbah && (
                <Link
                  to={'edit'}
                  onClick={() => {
                    localStorage.setItem('editID', data?.id_pegawai)
                    localStorage.setItem('editData', JSON.stringify(data))
                  }}
                  className="flex items-center gap-12 border-l-4 border-transparent px-16 py-12 hover:border-warna-dark hover:bg-warna-dark hover:bg-opacity-10"
                >
                  <FontAwesomeIcon icon={faPencil} />
                  <p>Edit</p>
                </Link>
              )}

              {isUbah && (
                <button
                  className="flex items-center gap-12 border-l-4 border-transparent px-16 py-12 text-warna-grey hover:border-warna-grey hover:bg-warna-grey hover:bg-opacity-10"
                  type="button"
                  onClick={() => {
                    setIsShowReset(true)
                  }}
                >
                  <FontAwesomeIcon icon={faKey} />
                  <p>Reset Pswd</p>
                </button>
              )}
              {isHapus && (
                <button
                  className="flex items-center gap-12 border-l-4 border-transparent px-16 py-12 text-warna-red hover:border-warna-red hover:bg-warna-red hover:bg-opacity-10"
                  type="button"
                  onClick={() => {
                    setIsShowDelete(true)
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <p>Hapus</p>
                </button>
              )}
              <ValidasiDelete
                isOpen={isShowDelete}
                setIsOpen={setIsShowDelete}
                child={
                  <button
                    type="button"
                    disabled={isLoadingDelete}
                    onClick={() => handleSubmitDelete(data?.id_pegawai)}
                    className="flex items-center gap-12 rounded-2xl bg-warna-red px-24 py-12 text-white hover:bg-opacity-80"
                  >
                    {isLoadingDelete ? (
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
              <ValidasiReset
                isOpen={isShowReset}
                setIsOpen={setIsShowReset}
                form={
                  <FormResetPassword
                    item={data?.id_pegawai === id && data}
                    form={form}
                    isLoading={isLoadingReset}
                    handleSubmit={handleSubmitResetPassword}
                    setIsOpen={setIsShowReset}
                  />
                }
              />
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
