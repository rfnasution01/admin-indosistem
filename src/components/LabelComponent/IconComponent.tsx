export function IconComponent({
  label,
  icon,
}: {
  label: string
  icon: JSX.Element
}) {
  return (
    <div className="flex items-center gap-12">
      {icon}
      <p>{label}</p>
    </div>
  )
}
