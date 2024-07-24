import { Skeleton } from '@/components/Skeleton'
import { Dispatch, SetStateAction, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAlignJustify,
  faClose,
  faDoorClosed,
  fas,
} from '@fortawesome/free-solid-svg-icons'
import { usePathname } from '@/hooks/usePathname'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { LinkParent } from './LinkParent'
import { LinkChild } from './LinkChild'
import { MenubarProfil } from '@/components/Menubar/MenubarProfile'
import { useLogout } from '@/hooks/useLogout'
import { ValidasiLogout } from '@/components/Dialog/ValidasiLogout'
import { useAksesSimpeg } from '@/hooks/useAksesSimpeg'
import { useSimpegIdentitas } from '@/hooks/simpeg'

library.add(fas)

export function SimpegMainHeader({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { secondPathname, thirdPathname } = usePathname()
  const { isShowLogout, setIsShowLogout, handleLogout } = useLogout()
  const { loadingMenuWebsite, menuWebsite } = useAksesSimpeg()
  const { simpegIdentitas, loadingIdentitasWebsite } = useSimpegIdentitas()

  const [isShow, setIsShow] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const isActivePage = (item: string) => {
    if (
      (item.toLowerCase() === 'dashboard' && secondPathname === undefined) ||
      item?.toLocaleLowerCase() === secondPathname ||
      item === `${secondPathname}/${thirdPathname}`
    ) {
      return true
    }
    return false
  }

  return (
    <div
      className={clsx(
        'scrollbar flex flex-col gap-32 overflow-y-auto bg-primary-100 py-32 text-[2.4rem] text-white',
        {
          'phones:h-auto': !isOpen,
          'h-full': isOpen,
        },
      )}
    >
      {loadingIdentitasWebsite || loadingMenuWebsite ? (
        <Skeleton />
      ) : (
        <>
          <div className="flex items-center justify-between gap-32">
            {/* --- Logo --- */}
            <div className="flex items-center justify-center gap-12 px-32 font-bold">
              <div className="flex w-2/3 items-center gap-24 phones:w-full">
                <img
                  src={simpegIdentitas?.gambar}
                  alt={simpegIdentitas?.nama_aplikasi}
                  className="h-[6rem] w-[6rem]"
                  loading="lazy"
                />
                <div className="flex flex-col text-[2.2rem] tracking-1.25">
                  <p style={{ lineHeight: '130%' }}>
                    {simpegIdentitas?.nama_aplikasi}
                  </p>
                </div>
              </div>
            </div>
            {/* --- Mobile --- */}
            <div className="hidden phones:block">
              <div className="flex items-center gap-32 px-32">
                <MenubarProfil setIsShowLogout={setIsShowLogout} />
                <span
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-[3.2rem] text-white"
                >
                  {isOpen ? (
                    <FontAwesomeIcon icon={faClose} />
                  ) : (
                    <FontAwesomeIcon icon={faAlignJustify} />
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* --- Navigasi --- */}
          <div
            className={clsx(
              'scrollbar flex h-full flex-col gap-12 overflow-y-auto px-32',
              { 'phones:hidden': !isOpen },
            )}
          >
            {menuWebsite?.map((item, idx) => (
              <div className="flex flex-col gap-24" key={idx}>
                <LinkParent
                  setActiveIndex={setActiveIndex}
                  setIsShow={setIsShow}
                  isActivePage={isActivePage}
                  idx={idx}
                  isShow={isShow}
                  item={item}
                  activeIndex={activeIndex}
                  setIsOpen={setIsOpen}
                />
                {item?.children?.length > 0 && activeIndex === idx && (
                  <LinkChild
                    item={item}
                    isActivePage={isActivePage}
                    setIsOpen={setIsOpen}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
      <ValidasiLogout
        isOpen={isShowLogout}
        setIsOpen={setIsShowLogout}
        child={
          <button
            onClick={handleLogout}
            className="flex items-center gap-12 rounded-2xl bg-warna-red px-24 py-12 text-white"
          >
            <FontAwesomeIcon icon={faDoorClosed} />
            <p>Logout</p>
          </button>
        }
      />
    </div>
  )
}
