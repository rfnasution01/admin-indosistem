import clsx from 'clsx'

export function LabelList({
  value,
  label,
  isSetting,
}: {
  value: string | number
  label: string
  isSetting?: boolean
}) {
  return (
    <div className="flex w-full gap-12 text-warna-dark phones:flex-col">
      <p
        className={clsx('font-roboto phones:w-full', {
          'w-1/6 ': !isSetting,
          'w-1/3': isSetting,
        })}
      >
        {label}
      </p>
      <p
        className={clsx('phones:w-full', {
          'w-5/6 ': !isSetting,
          'w-2/3': isSetting,
        })}
      >
        <span className="phones:hidden">:</span> {value}
      </p>
    </div>
  )
}
