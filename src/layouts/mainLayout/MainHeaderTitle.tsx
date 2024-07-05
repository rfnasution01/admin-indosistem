import { GetLoginType } from '@/types/loginType'
import { GetIdentiasAdminType } from '@/types/portalAdminType'
import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'

export function MainHeaderTitle({
  identitas,
  identitasAdmin,
}: {
  identitas: GetLoginType
  identitasAdmin: GetIdentiasAdminType
}) {
  return (
    <div className="flex flex-1 flex-col gap-8">
      {identitas?.nama && (
        <p className="text-[2.4rem] text-warna-pale-blue">
          {capitalizeFirstLetterFromLowercase(identitas?.nama?.toLowerCase())}
        </p>
      )}
      {identitasAdmin?.nama && (
        <p className="font-roboto text-[2.8rem] uppercase">
          {identitasAdmin?.nama}
        </p>
      )}
      {identitasAdmin?.alamat && (
        <p className="font-roboto text-[2.8rem] uppercase">
          {identitasAdmin?.alamat}
        </p>
      )}
    </div>
  )
}
