import { Dispatch, SetStateAction, useState } from 'react'
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from './Menubar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

export function MenubarPerPage({
  pageSize,
  setPageSize,
  isCard,
  position,
}: {
  pageSize: number
  setPageSize: Dispatch<SetStateAction<number>>
  isCard?: boolean
  position?: 'top' | 'bottom'
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const num = isCard ? 12 : 10

  const numberList = []
  for (let i = num; i <= num * 10; i += num) {
    numberList?.push(i)
  }

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
          <div className="flex items-center gap-12 rounded-2xl border px-24 py-12">
            {pageSize ?? numberList?.[0]}
            {isMenuOpen ? (
              <FontAwesomeIcon icon={faChevronUp} size="sm" />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} size="sm" />
            )}
          </div>
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent
            className={clsx(
              'absolute w-auto bg-white p-32 text-[2rem] text-warna-dark shadow-lg transition-all duration-300',
              {
                '-left-8 top-0': position === 'bottom',
                '-right-[10.5rem] bottom-[7rem]': position !== 'bottom',
              },
            )}
          >
            <div className="flex flex-col gap-24">
              {numberList?.map((item, idx) => (
                <p
                  onClick={() => {
                    setPageSize(item)
                    setIsMenuOpen(false)
                  }}
                  className={clsx(
                    'text-center  hover:cursor-pointer hover:text-primary-active',
                    {
                      'text-primary-inactive': pageSize !== item,
                      'text-primary-active': pageSize === item,
                    },
                  )}
                  key={idx}
                >
                  {item}
                </p>
              ))}
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
