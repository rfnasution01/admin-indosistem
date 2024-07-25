import { AbsensiBulanan } from '@/features/simpeg/detailPegawai/informasiPribadi'

export function DetailAbsensiHarian() {
  return (
    <div className="flex w-full flex-col gap-24">
      <div className="flex items-center justify-between gap-32">
        <p className="font-roboto text-[2.6rem] text-primary-100">
          Riwayat Absensi Bulanan
        </p>
      </div>
      <AbsensiBulanan />
    </div>
  )
}
