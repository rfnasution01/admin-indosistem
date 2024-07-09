import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------
export const CommonLayout = loadable(() => import('@/layouts/commonLayout'))
export const LoginLayout = loadable(() => import('@/layouts/loginLayout'))
export const MainLayout = loadable(() => import('@/layouts/mainLayout'))
// --- website ---
export const WebsiteMainLayout = loadable(
  () => import('@/layouts/website/mainLayout'),
)
export const ProfilWebsiteLayout = loadable(
  () => import('@/layouts/website/ProfilLayout'),
)

// ------------------
// ----- Pages -----
// ------------------
export const ComingSoonPage = loadable(() => import('@/pages/comingSoon'))
// --- Website ---
export const TentangSekolahPage = loadable(
  () => import('@/pages/website/profil/TentangSekolah'),
)

export const TambahProfilPage = loadable(
  () => import('@/pages/website/profil/TambahTentangSekolah'),
)

export const VisiMisiPage = loadable(
  () => import('@/pages/website/profil/VisiMisi'),
)

export const GuruStaffPage = loadable(
  () => import('@/pages/website/profil/GuruStaff'),
)

export const FasilitasSekolahPage = loadable(
  () => import('@/pages/website/profil/FasilitasSekolah'),
)

export const TambahFasilitasSekolahPage = loadable(
  () => import('@/pages/website/profil/TambahFasilitasSekolah'),
)

export const TestimoniPage = loadable(
  () => import('@/pages/website/profil/Testimoni'),
)

export const TambahTestimoniPage = loadable(
  () => import('@/pages/website/profil/TambahTestimoni'),
)

export const ProgramLayananPage = loadable(
  () => import('@/pages/website/profil/ProgramLayanan'),
)

export const TambahProgramLayananPage = loadable(
  () => import('@/pages/website/profil/TambahProgram'),
)

export const PengumumanPage = loadable(
  () => import('@/pages/website/pengumuman/Pengumuman'),
)

export const DetailPengumumanPage = loadable(
  () => import('@/pages/website/pengumuman/DetailPengumuman'),
)

export const EditPengumumanPage = loadable(
  () => import('@/pages/website/pengumuman/UpdatePengumuman'),
)

export const TambahGambarPengumumanPage = loadable(
  () => import('@/pages/website/pengumuman/TambahGambar'),
)

export const EditGambarPengumumanPage = loadable(
  () => import('@/pages/website/pengumuman/EditGambar'),
)
