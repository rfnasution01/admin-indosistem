// import { useNavigate } from 'react-router-dom'
import { useWebsiteAkses } from './useWebsiteAkses'
// import { usePathname } from '../usePathname'
// import Cookies from 'js-cookie'

export function useWebsiteKontak() {
  // const navigate = useNavigate()
  // const { lastPathname } = usePathname()

  const { isHakAksesHapus, isHakAksesTambah, isHakAksesUbah } =
    useWebsiteAkses()

  return {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
  }
}
