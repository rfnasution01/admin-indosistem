import { faSquareCheck, faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'
import { Slider } from '../Table/TableSlider'

type Props<T> = {
  data: T
  setIsShow: Dispatch<SetStateAction<boolean>>
  setId: Dispatch<SetStateAction<number>>
  index: number
}

export function ActiveContentSlider<T extends Slider>({
  data,
  setIsShow,
  setId,
  index,
}: Props<T>) {
  return (
    <div
      onClick={() => {
        setId(index)
        setIsShow(true)
      }}
    >
      {data?.aktif === 1 ? (
        <FontAwesomeIcon icon={faSquareCheck} size="lg" color="green" />
      ) : (
        <FontAwesomeIcon icon={faSquareXmark} size="lg" color="red" />
      )}
    </div>
  )
}
