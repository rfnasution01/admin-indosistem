import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

export function NavigasiUpdateData({
  setMenu,
  menuList,
  menu,
  setCurrentIdx,
}: {
  currentIdx: number
  setMenu: Dispatch<SetStateAction<string>>
  setCurrentIdx: Dispatch<SetStateAction<number>>
  menuList: string[]
  menu: string
  isEdit: boolean
}) {
  const status = localStorage.getItem('status') ?? ''

  const handleMenuClick = (idx: number) => {
    // Update the current menu only if it's enabled
    setCurrentIdx(idx)
    setMenu(menuList?.[idx])
  }

  return (
    <div className="scrollbar flex w-full items-center gap-24 overflow-x-auto">
      {menuList?.map((item, idx) => {
        let isDisabled = true

        if (!status || status === '') {
          if (idx === 0) {
            isDisabled = false
          }
        } else {
          const dataStatus = JSON.parse(status)
          const isPersonal = dataStatus?.isPersonal
          const isPekerjaan = dataStatus?.isPekerjaan
          const isAlamat = dataStatus?.isAlamat
          const isKarakter = dataStatus?.isKarakter

          if (isKarakter) {
            isDisabled = false
          } else if (isAlamat) {
            if (idx <= 3) {
              isDisabled = false
            }
          } else if (isPekerjaan) {
            if (idx <= 2) {
              isDisabled = false
            }
          } else if (isPersonal) {
            if (idx <= 1) {
              isDisabled = false
            }
          }
        }

        return (
          <button
            key={idx}
            onClick={() => handleMenuClick(idx)}
            className={clsx(
              'rounded-2xl border p-16 hover:cursor-pointer disabled:cursor-not-allowed',
              {
                'border-primary-100 text-primary-100': menu === item,
                'border-success text-success': menu !== item && !isDisabled,
                'border-primary-inactive text-primary-inactive': isDisabled,
              },
            )}
            disabled={isDisabled}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}
