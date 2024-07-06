import { createBrowserRouter, redirect } from 'react-router-dom'
import {
  ComingSoonPage,
  CommonLayout,
  GuruStaffPage,
  LoginLayout,
  MainLayout,
  ProfilWebsiteLayout,
  TambahProfilPage,
  TentangSekolahPage,
  VisiMisiPage,
  WebsiteMainLayout,
} from './loadables'
import Cookies from 'js-cookie'

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
          {
            path: 'pengumuman',
            element: <ComingSoonPage />,
          },
          {
            path: 'mading',
            element: <ComingSoonPage />,
          },
          {
            path: 'berita',
            element: <ComingSoonPage />,
          },
          {
            path: 'agenda',
            element: <ComingSoonPage />,
          },
          {
            path: 'prestasi',
            element: <ComingSoonPage />,
          },
          {
            path: 'galeri',
            element: <ComingSoonPage />,
          },
          {
            path: 'kontak',
            element: <ComingSoonPage />,
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
                element: <ComingSoonPage />,
              },
              {
                path: 'guru',
                element: <GuruStaffPage />,
              },
              {
                path: 'fasilitas',
                element: <ComingSoonPage />,
              },
              {
                path: 'testimonial',
                element: <ComingSoonPage />,
              },
            ],
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
