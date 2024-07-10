export function LabelList({
  value,
  label,
}: {
  value: string | number
  label: string
}) {
  return (
    <div className="flex w-full gap-12 text-warna-dark phones:flex-col">
      <p className="w-1/6 font-roboto phones:w-full">{label}</p>
      <p className="w-5/6 phones:w-full">
        <span className="phones:hidden">:</span> {value}
      </p>
    </div>
  )
}
