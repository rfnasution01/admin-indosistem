import { ListDetailPegawaiMenu } from '@/dummy/listDetailPegawaiMenu'
import { usePathname } from '@/hooks/usePathname'
import { LinkParent } from './LinkParent'
import { Dispatch, SetStateAction, useState } from 'react'
import { LinkChild } from './LinkChild'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify, faX } from '@fortawesome/free-solid-svg-icons'

export function SimpegDetailPegawaiMenu({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}) {
  const { lastPathname } = usePathname()

  const [activeIndex, setActiveIndex] = useState()
  const [isShow, setIsShow] = useState<boolean>(false)

  const isActivePage = (item: string) => {
    if (
      (item === 'biodata' && lastPathname === 'detail') ||
      item?.toLocaleLowerCase() === lastPathname
    ) {
      return true
    }
    return false
  }
  return (
    <div
      className={clsx(
        'scrollbar flex flex-col gap-24 overflow-y-auto rounded-2xl p-24',
        {
          'h-full w-[30rem] bg-primary-300 phones:h-auto phones:w-auto phones:bg-transparent':
            !isOpen,
          'bg-primary-300': isOpen,
        },
      )}
    >
      <div className="hidden phones:block">
        <span
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-end"
        >
          {isOpen ? (
            <FontAwesomeIcon icon={faX} />
          ) : (
            <FontAwesomeIcon icon={faAlignJustify} />
          )}
        </span>
      </div>
      <div
        className={clsx('flex flex-col gap-24', {
          'phones:hidden': !isOpen,
        })}
      >
        {ListDetailPegawaiMenu?.map((item, idx) => (
          <div className="flex flex-col gap-12" key={idx}>
            <LinkParent
              setActiveIndex={setActiveIndex}
              setIsShow={setIsShow}
              idx={idx}
              isShow={isShow}
              item={item}
              activeIndex={activeIndex}
            />
            {item?.child?.length > 0 && activeIndex === idx && (
              <LinkChild
                item={item}
                isActivePage={isActivePage}
                setIsOpen={setIsOpen}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
