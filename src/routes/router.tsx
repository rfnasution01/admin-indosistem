import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  ComingSoonPage,
  CommonLayout,
  DetailDownloadPage,
  DetailFAQPage,
  DetailGaleriPage,
  DetailHalamanPage,
  DetailKategoriPage,
  DetailKontakPage,
  DownloadPage,
  EditGaleriPage,
  EditGambarAlbumPage,
  EditGambarKategoriPage,
  EditKategoriPage,
  FAQPage,
  FasilitasSekolahPage,
  GaleriPage,
  GuruStaffPage,
  HalamanPage,
  IdentitasPage,
  KategoriPage,
  KontakPage,
  LoginLayout,
  MainLayout,
  ManajemenUserMainLayout,
  MenuPage,
  PolicyPage,
  ProfilWebsiteLayout,
  ProgramLayananPage,
  SliderPage,
  TambahDownloadPage,
  TambahFAQPage,
  TambahFasilitasSekolahPage,
  TambahGambarAlbumPage,
  TambahGambarKategoriPage,
  TambahHalamanPage,
  TambahKontakPage,
  TambahMenuPage,
  TambahProfilPage,
  TambahProgramLayananPage,
  TambahSliderPage,
  TambahTestimoniPage,
  TentangSekolahPage,
  TestimoniPage,
  UpdateIdentitasPage,
  UpdatePolicyPage,
  VisiMisiPage,
  WebsiteMainLayout,
} from './loadables'
import Cookies from 'js-cookie'

const categories = ['berita', 'pengumuman', 'agenda', 'prestasi', 'mading']

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CommonLayout />,
    loader: async () => {
      const jwtPayload = Cookies.get('token')

      if (!jwtPayload) {
        return redirect('/login')
      }

      return null
    },
    children: [
      {
        path: '',
        element: <MainLayout />,
      },
      {
        path: 'website',
        element: <WebsiteMainLayout />,
        children: [
          {
            path: '',
            element: <ComingSoonPage />,
          },
          ...categories.flatMap((category) => [
            {
              path: category,
              element: <CommonLayout />,
              children: [
                {
                  path: '',
                  element: <KategoriPage />,
                },
                {
                  path: 'detail',
                  element: <CommonLayout />,
                  children: [
                    {
                      path: '',
                      element: <DetailKategoriPage />,
                    },
                    {
                      path: 'tambah-gambar',
                      element: <TambahGambarKategoriPage />,
                    },
                    {
                      path: 'edit-gambar',
                      element: <EditGambarKategoriPage />,
                    },
                  ],
                },
                {
                  path: 'edit',
                  element: <EditKategoriPage />,
                },
                {
                  path: 'tambah',
                  element: <EditKategoriPage />,
                },
              ],
            },
          ]),

          {
            path: 'galeri',
            element: <CommonLayout />,
            children: [
              {
                path: '',
                element: <GaleriPage />,
              },
              {
                path: 'detail',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <DetailGaleriPage />,
                  },
                  {
                    path: 'tambah-gambar',
                    element: <TambahGambarAlbumPage />,
                  },
                  {
                    path: 'edit-gambar',
                    element: <EditGambarAlbumPage />,
                  },
                ],
              },
              {
                path: 'edit',
                element: <EditGaleriPage />,
              },
              {
                path: 'tambah',
                element: <EditGaleriPage />,
              },
            ],
          },
          {
            path: 'kontak',
            element: <CommonLayout />,
            children: [
              {
                path: '',
                element: <KontakPage />,
              },
              {
                path: 'edit',
                element: <TambahKontakPage />,
              },
              {
                path: 'detail',
                element: <DetailKontakPage />,
              },
            ],
          },
          {
            path: 'profil',
            element: <ProfilWebsiteLayout />,
            children: [
              {
                path: '',
                element: <ComingSoonPage />,
              },
              {
                path: 'tentang',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <TentangSekolahPage />,
                  },
                  {
                    path: 'tambah',
                    element: <TambahProfilPage />,
                  },
                ],
              },
              {
                path: 'visimisi',
                element: <VisiMisiPage />,
              },
              {
                path: 'program',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <ProgramLayananPage />,
                  },
                  {
                    path: ':aksi',
                    element: <TambahProgramLayananPage />,
                  },
                ],
              },
              {
                path: 'guru',
                element: <GuruStaffPage />,
              },
              {
                path: 'fasilitas',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <FasilitasSekolahPage />,
                  },
                  {
                    path: ':aksi',
                    element: <TambahFasilitasSekolahPage />,
                  },
                ],
              },
              {
                path: 'testimonial',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <TestimoniPage />,
                  },
                  {
                    path: ':aksi',
                    element: <TambahTestimoniPage />,
                  },
                ],
              },
            ],
          },
          {
            path: 'konten',
            element: <CommonLayout />,
            children: [
              {
                path: '',
                element: <ComingSoonPage />,
              },
              {
                path: 'slider',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <SliderPage />,
                  },
                  {
                    path: 'tambah',
                    element: <TambahSliderPage />,
                  },
                  {
                    path: 'edit',
                    element: <TambahSliderPage />,
                  },
                ],
              },
              {
                path: 'halaman',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <HalamanPage />,
                  },
                  {
                    path: 'tambah',
                    element: <TambahHalamanPage />,
                  },
                  {
                    path: 'edit',
                    element: <TambahHalamanPage />,
                  },
                  {
                    path: 'detail',
                    element: <DetailHalamanPage />,
                  },
                ],
              },
              {
                path: 'menu',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <MenuPage />,
                  },
                  {
                    path: 'tambah',
                    element: <TambahMenuPage />,
                  },
                  {
                    path: 'edit',
                    element: <TambahMenuPage />,
                  },
                ],
              },
              {
                path: 'faq',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <FAQPage />,
                  },
                  {
                    path: 'tambah',
                    element: <TambahFAQPage />,
                  },
                  {
                    path: 'edit',
                    element: <TambahFAQPage />,
                  },
                  {
                    path: 'detail',
                    element: <DetailFAQPage />,
                  },
                ],
              },
              {
                path: 'download',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <DownloadPage />,
                  },
                  {
                    path: 'tambah',
                    element: <TambahDownloadPage />,
                  },
                  {
                    path: 'edit',
                    element: <TambahDownloadPage />,
                  },
                  {
                    path: 'detail',
                    element: <DetailDownloadPage />,
                  },
                ],
              },
            ],
          },
          {
            path: 'setting',
            element: <CommonLayout />,
            children: [
              {
                path: '',
                element: <ComingSoonPage />,
              },
              {
                path: 'identitas',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <IdentitasPage />,
                  },
                  {
                    path: 'edit',
                    element: <UpdateIdentitasPage />,
                  },
                ],
              },
              {
                path: 'policy',
                element: <CommonLayout />,
                children: [
                  {
                    path: '',
                    element: <PolicyPage />,
                  },
                  {
                    path: 'edit',
                    element: <UpdatePolicyPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'user',
        element: <ManajemenUserMainLayout />,
        children: [
          {
            path: '',
            element: <ComingSoonPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <LoginLayout />,
    loader: async () => {
      const jwtPayload = Cookies.get('token')

      if (jwtPayload) {
        return redirect('/')
      }

      return null
    },
  },

  {
    path: '*',
    element: <ComingSoonPage />,
  },
])
