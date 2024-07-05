import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, ReactNode, SetStateAction } from 'react'

export function PreviewHeader({
  setMenu,
  jenis,
  hapus,
}: {
  setMenu: Dispatch<SetStateAction<string>>
  jenis: string
  hapus?: ReactNode
}) {
  return (
    <div className="flex w-full items-center justify-between gap-32">
      <p className="font-roboto text-[2.4rem]">{jenis} Sekolah</p>
      <div className="flex items-center gap-24">
        <button
          className="flex items-center gap-12 rounded-2xl bg-warna-dark px-24 py-12 text-white hover:bg-opacity-80"
          type="button"
          onClick={() => setMenu(jenis)}
        >
          <FontAwesomeIcon icon={faPencil} />
          <p className="phones:hidden">Perbaharui</p>
        </button>
        {hapus}
      </div>
    </div>
  )
}
