import DefaultImg from '@/assets/images/default.jpg'

export function IdentitasLogo({
  logo,
  favicon,
}: {
  logo: string
  favicon: string
}) {
  return (
    <div className="flex w-1/4 flex-col gap-48 phones:w-full">
      <div className="flex flex-col gap-16">
        <p className="font-roboto text-warna-dark">Logo</p>
        <img
          src={logo === '' || !logo ? DefaultImg : logo}
          alt="Logo"
          className="h-full w-full rounded-2xl"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-16">
        <p className="font-roboto text-warna-dark">Favicon</p>
        <img
          src={favicon === '' || !favicon ? DefaultImg : favicon}
          alt="Favicon"
          className="h-full w-full rounded-2xl"
          loading="lazy"
        />
      </div>
    </div>
  )
}
