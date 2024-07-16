export function LabelDashboard({
  value,
  label,
}: {
  value: string | number
  label: string
}) {
  return (
    <div className="flex w-1/4 flex-col gap-12">
      <p className="text-[2.4rem] text-warna-grey">{label}</p>
      <p className="font-roboto text-[3.2rem] text-warna-dark">{value}</p>
    </div>
  )
}
