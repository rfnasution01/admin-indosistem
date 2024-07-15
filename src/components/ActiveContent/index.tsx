import { faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'
import { Kategori } from '../Table/TableKategori'

type Props<T> = {
  data: T
  setIsShow: Dispatch<SetStateAction<boolean>>
  setId: Dispatch<SetStateAction<number>>
  index: number
  isUbah: boolean
}

export function ActiveContent<T extends Kategori>({
  data,
  setIsShow,
  setId,
  index,
  isUbah,
}: Props<T>) {
  return (
    <button
      disabled={!isUbah}
      onClick={() => {
        setId(index)
        setIsShow(true)
      }}
    >
      {data?.publish === '1' ? (
        <FontAwesomeIcon icon={faSquareCheck} size="lg" color="green" />
      ) : (
        <FontAwesomeIcon icon={faSquareXmark} size="lg" color="red" />
      )}
    </button>
  )
}
