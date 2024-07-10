export function LabelStatistik({
  value,
  label,
}: {
  value: string | number
  label: string
}) {
  return (
    <div className="flex flex-col gap-12">
      <p className="text-warna-grey">{label}</p>
      <p className="font-roboto text-[2.8rem] text-warna-dark">{value}</p>
    </div>
  )
}
