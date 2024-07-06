import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

export const Pagination = ({
  pageNow,
  lastPage,
  setPageNumber,
}: {
  pageNow: number
  lastPage: number
  setPageNumber: Dispatch<SetStateAction<number>>
}) => {
  return (
    <div className="flex items-center gap-24">
      <span
        className={clsx('border p-4', {
          'hover:cursor-pointer': pageNow > 1,
          'opacity-20 hover:cursor-not-allowed': !(pageNow > 1),
        })}
        onClick={() => {
          if (pageNow > 1) {
            setPageNumber(pageNow - 1)
          }
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </span>
      <p>
        <span className="text-rose-950">{pageNow}</span> / {lastPage}
      </p>
      <span
        className={clsx('border p-4', {
          'hover:cursor-pointer': pageNow < lastPage,
          'opacity-20 hover:cursor-not-allowed': !(pageNow < lastPage),
        })}
        onClick={() => {
          if (pageNow < lastPage) {
            setPageNumber(pageNow + 1)
          }
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </div>
  )
}
