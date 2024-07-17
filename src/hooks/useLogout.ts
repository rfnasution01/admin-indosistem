import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export function useLogout() {
  const navigate = useNavigate()

  const [isShowLogout, setIsShowLogout] = useState<boolean>(false)

  const handleLogout = () => {
    Cookies.remove('token')
    navigate('/login')
  }
  return {
    isShowLogout,
    setIsShowLogout,
    handleLogout,
  }
}
