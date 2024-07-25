import { Loading } from '@/components/Loading'
import { useGetLoginQuery } from '@/store/slices/loginAPI'
import { GetLoginType } from '@/types/loginType'
import { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { LoginLogo } from './LoginLogo'

export function LoginInformasi() {
  const [login, setLogin] = useState<GetLoginType>()

  const {
    data: dataLogin,
    isFetching: isFetchingLogin,
    isLoading: isLoadingLogin,
  } = useGetLoginQuery()

  const loadingLogin = isFetchingLogin || isLoadingLogin

  useEffect(() => {
    if (dataLogin?.data) {
      setLogin(dataLogin?.data)
    }
  }, [dataLogin])

  return (
    <HelmetProvider>
      <div className="h-auto w-[70%] text-white phones:w-full">
        {loadingLogin ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-64  phones:p-32">
            {/* --- Logo --- */}
            <LoginLogo identitasLogin={login} />
            {/* --- Deskripsi --- */}
            <div className="flex flex-col gap-32">
              <p className="font-roboto text-[4rem]">Halaman Login</p>
              <p className="text-[2.4rem]" style={{ lineHeight: '130%' }}>
                Hai, selamat datang kembali di{' '}
                <span className="font-bold">Sistem Informasi Akademik</span>.
                Silahkan login dengan akun Anda
              </p>
            </div>
          </div>
        )}
        <Helmet>
          <meta charSet="utf-8" />
          <title>{login?.nama}</title>
          <link rel="canonical" href="https://demolaman1.avnet.id/" />
        </Helmet>
      </div>
    </HelmetProvider>
  )
}
