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
      className={clsx('flex w-full', {
        'flex-col gap-8': isColumn,
        'items-center gap-32': !isColumn,
      })}
    >
      <p className={`${widthLabel} ${isColumn ? 'font-bold' : ''}`}>{label}</p>
      <p className={widthValue}>
        {!isColumn && ':'} {value}
      </p>
    </div>
  )
}
