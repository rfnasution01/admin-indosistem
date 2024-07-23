export function LabelData({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex gap-12 phones:flex-col">
      <p className="w-1/3">{label}</p>
      {label === 'Foto' || label === 'Dokumen SK' ? (
        <img
          src={value}
          alt={label}
          className="w-1/5 rounded-2xl"
          loading="lazy"
        />
      ) : (
        <p className="w-2/3 font-roboto">{value}</p>
      )}
    </div>
  )
}
