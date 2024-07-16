import DefaultImg from '@/assets/images/default.jpg'

export function IdentitasLogo({
  logo,
  favicon,
}: {
  logo: string
  favicon: string
}) {
  return (
    <div className="flex w-full gap-48 phones:w-full phones:flex-col">
      <div className="flex w-full flex-col gap-16">
        <p className="font-roboto text-warna-dark">Logo</p>
        <img
          src={logo === '' || !logo ? DefaultImg : logo}
          alt="Logo"
          className="w-full rounded-2xl"
          loading="lazy"
        />
      </div>
      <div className="flex w-full flex-col gap-16">
        <p className="font-roboto text-warna-dark">Favicon</p>
        <img
          src={favicon === '' || !favicon ? DefaultImg : favicon}
          alt="Favicon"
          className="w-full rounded-2xl"
          loading="lazy"
        />
      </div>
    </div>
  )
}
