import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ProgramCard } from '@/features/website/profil/program/ProgramCard'
import { LayananCard } from '@/features/website/profil/program/LayananCard'
import { useWebsiteProgramSekolah } from '@/hooks/website/profilSekolah'

export default function ProgramLayanan() {
  const { dataLayanan, dataProgram, loadingLayanan, loadingProgram } =
    useWebsiteProgramSekolah()

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <div className="grid grid-cols-3 gap-32">
        <ProgramCard program={dataProgram} loadingProgram={loadingProgram} />
        <LayananCard layanan={dataLayanan} loadingLayanan={loadingLayanan} />
      </div>
      <ToastContainer />
    </div>
  )
}
