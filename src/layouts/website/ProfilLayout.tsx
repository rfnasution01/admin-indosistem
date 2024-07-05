import { Outlet } from 'react-router-dom'

export default function ProfilLayout() {
  return (
    <div className="scrollbar flex h-full flex-col gap-0 overflow-y-auto rounded-3x bg-white">
      <Outlet />
    </div>
  )
}
