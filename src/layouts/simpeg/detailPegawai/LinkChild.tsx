import clsx from 'clsx'
import { LinkItem } from './LinkParent'
import { convertToSlug } from '@/utils/formatText'
import { Link } from 'react-router-dom'
import { Dispatch, SetStateAction } from 'react'

export function LinkChild({
  item,
  isActivePage,
  setIsOpen,
}: {
  item: LinkItem
  isActivePage: (item: string) => boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div className="flex flex-col gap-8 text-[1.8rem]">
      {item?.child?.map((list, id) => (
        <Link
          to={convertToSlug(list)}
          className={clsx('px-16 py-8', {
            'bg-primary-active text-primary-300': isActivePage(
              convertToSlug(list),
            ),
            'text-primary-200': !isActivePage(convertToSlug(list)),
          })}
          onClick={() => {
            setIsOpen(false)
          }}
          key={id}
        >
          <p>{list}</p>
        </Link>
      ))}
    </div>
  )
}
