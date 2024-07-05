import { usePathname } from '@/hooks/usePathname'
import { GetMenuWebsiteType } from '@/types/website/menuType'
import { faSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

export function LinkChild({
  item,
  isActivePage,
}: {
  item: GetMenuWebsiteType
  isActivePage: (item: string) => boolean
}) {
  const { firstPathname } = usePathname()

  return (
    <div className="flex flex-col gap-12 px-48 text-[2.4rem]">
      {item?.children?.map((list, id) => (
        <Link
          to={`/${firstPathname}/${list?.link}`}
          className={clsx(
            'flex items-center gap-12 py-4 hover:cursor-pointer hover:text-warna-primary',
            {
              'text-warna-primary': isActivePage(list?.link),
              'text-warna-grey': !isActivePage(list?.link),
            },
          )}
          key={id}
        >
          <span className="rotated-icon">
            <FontAwesomeIcon icon={faSquare} size="xs" />
          </span>
          <p>{list.nama_menu}</p>
        </Link>
      ))}
    </div>
  )
}
