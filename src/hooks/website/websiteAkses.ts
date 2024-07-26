import { useGetMenuWebsiteQuery } from '@/store/slices/website/menuAPI'
import { GetMenuWebsiteType } from '@/types/website/menuType'
import { useEffect, useState } from 'react'
import { convertToSlug } from '@/utils/formatText'
import { usePathname } from '../usePathname'

export function useWebsiteAkses() {
  const { secondPathname, thirdPathname } = usePathname()
  const [menuUtama, setMenuUtama] = useState<GetMenuWebsiteType[]>([])
  const { data } = useGetMenuWebsiteQuery()

  useEffect(() => {
    if (data) {
      setMenuUtama(data?.data)
    }
  }, [data])

  const path =
    secondPathname === 'profil' ||
    secondPathname === 'konten' ||
    secondPathname === 'setting'
      ? `${secondPathname}/${thirdPathname}`
      : `${secondPathname}`

  const hakAkses = menuUtama?.find(
    (item) => convertToSlug(item?.link) === convertToSlug(path),
  )
  const isHakAksesHapus = hakAkses?.hapus === '1'
  const isHakAksesUbah = hakAkses?.ubah === '1'
  const isHakAksesTambah = hakAkses?.ubah === '1'

  return {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
  }
}
