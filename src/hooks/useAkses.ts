import { useGetMenuWebsiteQuery } from '@/store/slices/website/menuAPI'
import { GetMenuWebsiteType } from '@/types/website/menuType'
import { useEffect, useState } from 'react'
import { usePathname } from './usePathname'
import { convertToSlug } from '@/utils/formatText'

export function useAkses() {
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

  console.log({ hakAkses })

  return {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
  }
}
