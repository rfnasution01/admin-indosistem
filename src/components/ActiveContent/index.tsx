import {
  faEye,
  faEyeSlash,
  faSpinner,
  faSquareCheck,
  faSquareXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'
import { Pengumuman } from '../Table/TablePengumuman'
import { ValidasiIsCheck } from '../Dialog/ValidasiIsCheck'
import clsx from 'clsx'

type Props<T> = {
  data: T
  handleSubmitPublish: (id: string, publish: string) => Promise<void>
  setIsShow: Dispatch<SetStateAction<boolean>>
  isShow: boolean
  isLoadingPublish: boolean
}

export function ActiveContent<T extends Pengumuman>({
  data,
  handleSubmitPublish,
  setIsShow,
  isLoadingPublish,
  isShow,
}: Props<T>) {
  return (
    <div
      onClick={() => {
        setIsShow(true)
      }}
    >
      {data?.publish === '1' ? (
        <FontAwesomeIcon icon={faSquareCheck} size="lg" color="green" />
      ) : (
        <FontAwesomeIcon icon={faSquareXmark} size="lg" color="red" />
      )}
      <ValidasiIsCheck
        isOpen={isShow}
        setIsOpen={setIsShow}
        publish={data?.publish}
        child={
          <button
            type="button"
            disabled={isLoadingPublish}
            onClick={() =>
              handleSubmitPublish(data?.id, data?.publish === '1' ? '0' : '1')
            }
            className={clsx(
              'flex items-center gap-12 rounded-2xl px-24 py-12 text-white hover:bg-opacity-80',
              {
                'bg-warna-red': data?.publish === '1',
                'bg-warna-primary': data?.publish !== '1',
              },
            )}
          >
            {isLoadingPublish ? (
              <span className="animate-spin duration-300">
                <FontAwesomeIcon icon={faSpinner} />
              </span>
            ) : data?.publish === '1' ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
            <p className="font-sf-pro">
              {data?.publish === '1' ? 'Sembunyikan' : 'Tampilkan'}
            </p>
          </button>
        }
      />
    </div>
  )
}
