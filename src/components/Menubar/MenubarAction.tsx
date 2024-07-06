import { useState } from 'react'
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from './Menubar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsis,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export function MenubarAction({ id }: { id: string }) {
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
                to={'edit'}
                onClick={() => {
                  localStorage.setItem('editID', id)
                }}
                className="flex items-center gap-12 border-l-4 border-transparent px-16 py-12 hover:border-warna-dark hover:bg-warna-dark hover:bg-opacity-10"
              >
                <FontAwesomeIcon icon={faPencil} />
                <p>Edit</p>
              </Link>
              <button
                className="flex items-center gap-12 border-l-4 border-transparent px-16 py-12 text-warna-red hover:border-warna-red hover:bg-warna-red hover:bg-opacity-10"
                type="button"
              >
                <FontAwesomeIcon icon={faTrash} />
                <p>Hapus</p>
              </button>
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
