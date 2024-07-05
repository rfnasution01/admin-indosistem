import clsx from 'clsx'

export function LabelComponent({
  value,
  label,
  widthLabel,
  widthValue,
  isColumn,
}: {
  value: string
  label: string
  widthValue?: string
  widthLabel?: string
  isColumn?: boolean
}) {
  return (
    <div
      className={clsx('flex w-full phones:flex-col', {
        'flex-col gap-8': isColumn,
        'items-center gap-32 phones:items-start phones:gap-4': !isColumn,
      })}
    >
      <p
        className={`${widthLabel} ${isColumn ? 'font-bold' : ''} phones:font-roboto`}
      >
        {label}
      </p>
      <p className={widthValue}>
        {!isColumn && <span className="phones:hidden">:</span>} {value}
      </p>
    </div>
  )
}
