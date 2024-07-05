import { IconLogout, IconUser } from '@/assets/icons'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export function MainHeaderButtonGroup() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-12 phones:w-full phones:flex-row">
      <button
        type="button"
        className="flex items-center gap-12 rounded-2xl bg-white px-24 py-16 font-semibold text-warna-primary hover:bg-opacity-80 phones:w-full"
      >
        <IconUser />
        Halaman Profil
      </button>
      <button
        type="button"
        onClick={() => {
          Cookies.remove('token')
          navigate('/')
        }}
        className="flex items-center gap-12 rounded-2xl bg-warna-red px-24 py-16 font-semibold text-white hover:bg-opacity-80 phones:w-full"
      >
        <IconLogout />
        Keluar
      </button>
    </div>
  )
}
