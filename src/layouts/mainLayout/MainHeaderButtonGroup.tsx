import { IconLogout, IconUser } from '@/assets/icons'
import { Link } from 'react-router-dom'
import { ValidasiLogout } from '@/components/Dialog/ValidasiLogout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import { useLogout } from '@/hooks/useLogout'

export function MainHeaderButtonGroup() {
  const { isShowLogout, setIsShowLogout, handleLogout } = useLogout()

  return (
    <div className="flex flex-col gap-12 phones:w-full phones:flex-row">
      <Link
        to="profil"
        className="flex items-center gap-12 rounded-2xl bg-white px-24 py-16 font-semibold text-warna-primary hover:bg-opacity-80 phones:w-full"
      >
        <IconUser />
        Halaman Profil
      </Link>
      <button
        type="button"
        onClick={() => {
          setIsShowLogout(true)
        }}
        className="flex items-center gap-12 rounded-2xl bg-warna-red px-24 py-16 font-semibold text-white hover:bg-opacity-80 phones:w-full"
      >
        <IconLogout />
        Keluar
      </button>
      <ValidasiLogout
        isOpen={isShowLogout}
        setIsOpen={setIsShowLogout}
        child={
          <button
            onClick={handleLogout}
            className="flex items-center gap-12 rounded-2xl bg-warna-red px-24 py-12 text-white"
          >
            <FontAwesomeIcon icon={faDoorClosed} />
            <p>Logout</p>
          </button>
        }
      />
    </div>
  )
}
