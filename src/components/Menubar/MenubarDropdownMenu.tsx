import { useEffect, useState } from 'react'
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from './Menubar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useGetJenisMenuQuery } from '@/store/slices/referensiAPI'
import { Link } from 'react-router-dom'

export function MenubarDropDownMenu({
  posisi,
  id_parent,
  isTambah,
}: {
  posisi: string
  id_parent: string
  isTambah: boolean
}) {
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
          className="w-full transition-all duration-300 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed disabled:cursor-not-allowed"
          variant="nothing"
          layout="icon"
          size="fit"
          onClick={handleMenuClick}
          disabled={!isTambah}
        >
          {loading ? (
            <span className="animate-spin duration-300">
              <FontAwesomeIcon icon={faSpinner} />
            </span>
          ) : (
            <div className="flex items-center gap-12 border-l-4 border-transparent px-16 py-12 text-warna-primary hover:border-warna-primary hover:bg-warna-primary hover:bg-opacity-10">
              <FontAwesomeIcon icon={faPlus} />
              <p>Tambah</p>
            </div>
          )}
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent className="absolute right-[4rem] top-[-9rem] w-[25rem] bg-white p-32 text-[2rem] text-warna-dark shadow-lg transition-all duration-300">
            <div className="flex flex-col gap-16">
              {menu?.map((item, idx) => (
                <Link
                  to="tambah"
                  onClick={() => {
                    handleMenuClick()
                    const menu = {
                      posisi: posisi,
                      jenis_menu: item,
                      id_parent: id_parent,
                    }
                    localStorage.setItem('parentData', JSON.stringify(menu))
                  }}
                  className="text-warna-dark hover:cursor-pointer hover:text-warna-primary"
                  key={idx}
                >
                  {item}
                </Link>
              ))}
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
