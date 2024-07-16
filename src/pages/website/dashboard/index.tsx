import { LabelDashboard } from '@/components/LabelComponent/LabelDashboard'
import { DashboardChart } from '@/features/website/dashboard'

export default function DashboardPage() {
  const AksesData = [
    {
      nama: 'Komputer',
      jlh: '1362',
    },
    {
      nama: 'Smartphone',
      jlh: '908',
    },
  ]

  const AktivitasData = [
    {
      nama: 'Berita & Pengumuman',
      jlh: '532',
    },
    {
      nama: 'Profil Sekolah',
      jlh: '212',
    },
    {
      nama: 'Galeri',
      jlh: '150',
    },
    {
      nama: 'Kontak',
      jlh: '120',
    },
    {
      nama: 'Agenda',
      jlh: '27',
    },
  ]

  return (
    <div className="flex flex-col gap-32">
      {/* --- row 1 --- */}
      <div className="flex gap-32 overflow-y-auto rounded-3x bg-white p-32">
        <LabelDashboard label="Jumlah Pengunjung" value={2270} />
        <hr className="h-full w-2 bg-warna-pale-grey phones:hidden" />
        <DashboardChart title="Akses" data={AksesData} className="w-1/4" />
        <hr className="h-full w-2 bg-warna-pale-grey phones:hidden" />
        <DashboardChart
          title="Aktivitas"
          data={AktivitasData}
          className="w-2/4 pl-32 phones:w-full"
          widthChart="w-[10%]"
        />
      </div>
      {/* --- row 2 --- */}
      <div className="flex gap-32">
        <div className="flex w-3/5 gap-32 overflow-y-auto rounded-3x bg-white p-32 phones:w-full">
          <LabelDashboard label="Jumlah Siswa" value={543} />
          <hr className="h-full w-2 bg-warna-pale-grey phones:hidden" />
          <LabelDashboard label="Jumlah Siswa" value={543} />
          <hr className="h-full w-2 bg-warna-pale-grey phones:hidden" />

          <DashboardChart title="Akses" data={AksesData} className="w-1/2" />
        </div>
        <div className="flex w-2/5 gap-32 overflow-y-auto rounded-3x bg-white p-32 phones:w-full">
          <LabelDashboard label="Jumlah Siswa" value={543} />
          <hr className="h-full w-2 bg-warna-pale-grey phones:hidden" />

          <DashboardChart title="Akses" data={AksesData} className="w-2/3" />
        </div>
      </div>
    </div>
  )
}
