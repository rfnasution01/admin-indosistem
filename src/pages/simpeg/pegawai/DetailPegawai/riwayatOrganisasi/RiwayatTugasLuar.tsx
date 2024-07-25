import { RiwayatTugasLuar } from '@/features/simpeg/detailPegawai/riwayatOrganisasi'

export function DetailRiwayatTugasLuar() {
  return (
    <div className="flex w-full flex-col gap-24">
      <div className="flex items-center justify-between gap-32">
        <p className="font-roboto text-[2.6rem] text-primary-100">
          Riwayat Tugas Luar
        </p>
      </div>
      <RiwayatTugasLuar />
    </div>
  )
}
