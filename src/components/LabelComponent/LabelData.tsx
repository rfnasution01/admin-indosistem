import { Link } from 'react-router-dom'

export function LabelData({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex gap-12 phones:flex-col">
      <p className="w-1/3 phones:w-full">{label}</p>
      {label === 'Foto' || label === 'Dokumen SK' ? (
        <img
          src={value}
          alt={label}
          className="w-1/5 rounded-2xl phones:w-full"
          loading="lazy"
        />
      ) : label === 'Dokumen' ? (
        <Link to={value} target="_blank" className="text-primary-active">
          Lihat
        </Link>
      ) : (
        <p className="w-2/3 font-roboto phones:w-full">{value}</p>
      )}
    </div>
  )
}
