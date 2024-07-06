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
