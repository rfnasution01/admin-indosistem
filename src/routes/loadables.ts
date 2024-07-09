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

export const KategoriPage = loadable(
  () => import('@/pages/website/kategori/Kategori'),
)

export const DetailKategoriPage = loadable(
  () => import('@/pages/website/kategori/DetailKategori'),
)

export const EditKategoriPage = loadable(
  () => import('@/pages/website/kategori/UpdateKategori'),
)

export const TambahGambarKategoriPage = loadable(
  () => import('@/pages/website/kategori/TambahGambar'),
)

export const EditGambarKategoriPage = loadable(
  () => import('@/pages/website/kategori/EditGambar'),
)
