import { GetLoginType } from '@/types/loginType'
import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'

export function LoginLogo({
  identitasLogin,
}: {
  identitasLogin: GetLoginType
}) {
  return (
    <div className="flex flex-col gap-32 phones:flex-row">
      {identitasLogin?.logo && (
        <img
          src={identitasLogin?.logo}
          alt="IndoSistem"
          className="h-[12rem] w-[20rem] rounded-2xl object-cover filter"
          loading="lazy"
        />
      )}
      <div className="flex flex-col gap-8" style={{ lineHeight: '130%' }}>
        {identitasLogin?.nama && (
          <p className="text-[2.4rem] text-warna-pale-blue">
            {capitalizeFirstLetterFromLowercase(
              identitasLogin?.nama?.toLowerCase(),
            )}
          </p>
        )}
        {identitasLogin?.alamat && (
          <p className="font-roboto text-[2.8rem] uppercase">
            {identitasLogin?.alamat}
          </p>
        )}
      </div>
    </div>
  )
}
