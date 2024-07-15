import { useEffect, useState } from 'react'
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from './Menubar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useGetJenisMenuQuery } from '@/store/slices/referensiAPI'
import { useNavigate } from 'react-router-dom'

export function MenubarDropDown({
  posisi,
  isTambah,
}: {
  posisi: string
  isTambah: boolean
}) {
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const [menu, setMenu] = useState<string[]>([])
  const { data, isLoading, isFetching } = useGetJenisMenuQuery()

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMenu(data?.data)
    }
  }, [data?.data])

  return (
    <Menubar className="px-4">
      <MenubarMenu>
        <MenubarTrigger
          className="w-full rounded-2xl bg-warna-dark px-24 py-12 text-center text-white transition-all duration-300 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed disabled:cursor-not-allowed"
          variant="nothing"
          layout="icon"
          size="fit"
          onClick={handleMenuClick}
          disabled={!isTambah}
        >
          <div className="flex items-center gap-12">
            <p>Tambah Menu</p>
            {loading ? (
              <span className="animate-spin duration-300">
                <FontAwesomeIcon icon={faSpinner} />
              </span>
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </div>
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent className="absolute right-[2rem] top-[-11rem] w-[25rem] bg-white p-32 text-[2rem] text-warna-dark shadow-lg transition-all duration-300">
            <div className="flex flex-col gap-16">
              {menu?.map((item, idx) => (
                <div
                  onClick={() => {
                    handleMenuClick()
                    const menu = {
                      posisi: posisi,
                      jenis_menu: item,
                      id_parent: null,
                    }
                    localStorage.setItem('parentData', JSON.stringify(menu))
                    navigate('tambah')
                  }}
                  className="text-warna-dark hover:cursor-pointer hover:text-warna-primary"
                  key={idx}
                >
                  {item}
                </div>
              ))}
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
