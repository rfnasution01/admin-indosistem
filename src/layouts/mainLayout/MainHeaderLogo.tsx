import { GetLoginType } from '@/types/loginType'
import { GetIdentiasAdminType } from '@/types/portalAdminType'

export function MainHeaderLogo({
  identitas,
  identitasAdmin,
}: {
  identitasAdmin: GetIdentiasAdminType
  identitas: GetLoginType
}) {
  return (
    <img
      src={identitasAdmin?.logo ?? identitas?.logo}
      alt="Indo Sistem"
      className="h-[10rem] w-[10rem] rounded-2xl object-fill filter"
      loading="lazy"
    />
  )
}
