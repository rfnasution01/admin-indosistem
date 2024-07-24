import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'

export type LinkItem = {
  name: string
  child: string[]
}

export function LinkParent({
  item,
  setActiveIndex,
  setIsShow,
  idx,
  activeIndex,
  isShow,
}: {
  item: LinkItem
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
  setIsShow: Dispatch<SetStateAction<boolean>>
  idx: number
  isShow: boolean
}) {
  return (
    <div
      className="hover:cursor-pointer"
      onClick={(e) => {
        if (item?.child?.length > 0) {
          e.preventDefault()
          e.stopPropagation()
          setIsShow(!isShow)
        }
        setActiveIndex(activeIndex === idx ? null : idx)
      }}
    >
      <div className="flex flex-1 items-center justify-between gap-32 font-roboto text-primary-200 duration-300">
        <p>{item?.name}</p>
        {item?.child?.length > 0 && (
          <span>
            {isShow && idx === activeIndex ? (
              <FontAwesomeIcon icon={faCaretDown} />
            ) : (
              <FontAwesomeIcon icon={faCaretRight} />
            )}
          </span>
        )}
      </div>
    </div>
  )
}
