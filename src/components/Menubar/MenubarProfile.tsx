import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from './Menubar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBorderAll,
  faChevronDown,
  faDoorClosed,
  faKey,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useProfil } from '@/hooks/useProfil'
import { useNavigate } from 'react-router-dom'
import { Dispatch, SetStateAction, useState } from 'react'

export function MenubarProfil({
  setIsShowLogout,
}: {
  setIsShowLogout: Dispatch<SetStateAction<boolean>>
}) {
  const navigate = useNavigate()
  const { profil } = useProfil()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menu = ['Kembali Ke Menu Utama', 'Profil', 'Ubah Password']

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
          <div className="flex items-center gap-12">
            <img
              src={profil?.gambar}
              alt={profil?.nama}
              loading="lazy"
              className="h-[5rem] w-[5rem] rounded-full object-cover"
            />
            <p className="phones:hidden">{profil?.nama}</p>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent className="absolute left-0 top-[1rem] w-[32rem] bg-white p-32 text-[2rem] text-warna-dark shadow-lg transition-all duration-300 phones:-left-[23rem]">
            <div className="flex flex-col gap-32">
              <div className="flex flex-col gap-32">
                {menu?.map((item, idx) => (
                  <div
                    className="flex items-center gap-12 hover:cursor-pointer hover:text-primary-100"
                    key={idx}
                    onClick={() => {
                      if (item === 'Profil') {
                        navigate('/profil')
                      }
                      if (item?.includes('Menu')) {
                        navigate('/')
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        item?.includes('Profil')
                          ? faUser
                          : item?.includes('Password')
                            ? faKey
                            : faBorderAll
                      }
                    />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <hr className="border border-primary-100" />
              <div
                onClick={() => {
                  setIsShowLogout(true)
                }}
                className="flex items-center gap-12 hover:cursor-pointer hover:text-primary-100"
              >
                <FontAwesomeIcon icon={faDoorClosed} />
                <p>Logout</p>
              </div>
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
