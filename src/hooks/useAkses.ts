import { useGetMenuWebsiteQuery } from '@/store/slices/website/menuAPI'
import { GetMenuWebsiteType } from '@/types/website/menuType'
import { useEffect, useState } from 'react'
import { usePathname } from './usePathname'

export function useAkses() {
  const { secondPathname, thirdPathname, splittedPath } = usePathname()
  const [menuUtama, setMenuUtama] = useState<GetMenuWebsiteType[]>([])
  const { data } = useGetMenuWebsiteQuery()

  useEffect(() => {
    if (data) {
      setMenuUtama(data?.data)
    }
  }, [data])

  console.log({ splittedPath })

  const path =
    secondPathname === 'profil'
      ? `${secondPathname}/${thirdPathname}`
      : `${secondPathname}`

  const hakAkses = menuUtama?.find((item) => item?.link === path)
  const isHakAksesHapus = hakAkses?.hapus === '1'
  const isHakAksesUbah = hakAkses?.ubah === '1'
  const isHakAksesTambah = hakAkses?.ubah === '1'

  console.log({ hakAkses })

  return {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
  }
}
