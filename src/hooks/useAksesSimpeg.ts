import { GetMenuWebsiteType } from '@/types/website/menuType'
import { useEffect, useState } from 'react'
import { usePathname } from './usePathname'
import { convertToSlug } from '@/utils/formatText'
import { useGetSimpegMenuQuery } from '@/store/slices/simpeg/identitasType'

export function useAksesSimpeg() {
  const { secondPathname, thirdPathname } = usePathname()
  const [menuUtama, setMenuUtama] = useState<GetMenuWebsiteType[]>([])
  const { data, isLoading, isFetching } = useGetSimpegMenuQuery()
  const [menu, setMenu] = useState<GetMenuWebsiteType[]>([])

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data?.data) {
      setMenu(data?.data)
      // Sorting the data
      const sortedData = [...data.data].sort((a, b) => {
        return parseInt(a.urutan) - parseInt(b.urutan)
      })

      // Creating a copy of the data to ensure it's extensible
      const menuMap = new Map<string, GetMenuWebsiteType>()

      sortedData.forEach((item) => {
        // Create a new object for each item to ensure it's extensible
        const newItem = { ...item, children: [] }
        menuMap.set(newItem.id, newItem)
      })

      const finalMenu: GetMenuWebsiteType[] = []

      menuMap.forEach((item) => {
        if (item.id_parent === '0') {
          finalMenu.push(item)
        } else {
          const parent = menuMap.get(item.id_parent)
          if (parent) {
            parent.children?.push(item)
          }
        }
      })

      setMenuUtama(finalMenu)
    }
  }, [data])

  const path =
    secondPathname === 'master'
      ? `${secondPathname}/${thirdPathname}`
      : `${secondPathname}`

  const hakAkses = menu?.find(
    (item) => convertToSlug(item?.link) === convertToSlug(path),
  )

  const isHakAksesHapus = hakAkses?.hapus === '1'
  const isHakAksesUbah = hakAkses?.ubah === '1'
  const isHakAksesTambah = hakAkses?.ubah === '1'

  return {
    isHakAksesHapus,
    isHakAksesTambah,
    isHakAksesUbah,
    loadingMenuWebsite: loading,
    menuWebsite: menuUtama,
  }
}
