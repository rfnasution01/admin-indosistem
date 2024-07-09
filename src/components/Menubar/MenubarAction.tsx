import { Dispatch, SetStateAction, useState } from 'react'
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from './Menubar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBinoculars,
  faEllipsis,
  faPencil,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Fasilitas } from '../Table/TableFasilitas'
import { ValidasiDelete } from '../Dialog/ValidasiDelete'

type Props<T> = {
  data: T
  handleSubmitDelete: (id: string) => Promise<void>
  setIsShow: Dispatch<SetStateAction<boolean>>
  isShow: boolean
  isLoadingDelete: boolean
}

export function MenubarAction<T extends Fasilitas>({
  data,
  handleSubmitDelete,
  setIsShow,
  isLoadingDelete,
  isShow,
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
          onClick={handleMenuClick}
        >
          <span className={`rounded-2xl`}>
            <FontAwesomeIcon icon={faEllipsis} size="xl" />
          </span>
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent className="absolute right-[2rem] top-[-11rem] w-[20rem] bg-white p-32 text-[2rem] text-warna-dark shadow-lg transition-all duration-300">
            <div className="flex flex-col gap-12">
              <Link
                to={'detail'}
                onClick={() => {
                  localStorage.setItem('editID', data?.id)
                  localStorage.setItem('editData', JSON.stringify(data))
                }}
                className="flex items-center gap-12 border-l-4 border-transparent px-16 py-12 text-warna-primary hover:border-warna-primary hover:bg-warna-primary hover:bg-opacity-10"
              >
                <FontAwesomeIcon icon={faBinoculars} />
                <p>Detail</p>
              </Link>
              <Link
                to={'edit'}
                onClick={() => {
                  localStorage.setItem('editID', data?.id)
                  localStorage.setItem('editData', JSON.stringify(data))
                }}
                className="flex items-center gap-12 border-l-4 border-transparent px-16 py-12 hover:border-warna-dark hover:bg-warna-dark hover:bg-opacity-10"
              >
                <FontAwesomeIcon icon={faPencil} />
                <p>Edit</p>
              </Link>
              <button
                className="flex items-center gap-12 border-l-4 border-transparent px-16 py-12 text-warna-red hover:border-warna-red hover:bg-warna-red hover:bg-opacity-10"
                type="button"
                onClick={() => {
                  setIsShow(true)
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
                <p>Hapus</p>
              </button>
              <ValidasiDelete
                isOpen={isShow}
                setIsOpen={setIsShow}
                child={
                  <button
                    type="button"
                    disabled={isLoadingDelete}
                    onClick={() => handleSubmitDelete(data?.id)}
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
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
