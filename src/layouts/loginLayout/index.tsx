import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import BgImageLayer1 from '@/assets/images/asset-bg1.jpg'
import { LoginSchema } from '@/schemas/loginSchema'
import { usePostLoginMutation } from '@/store/slices/loginAPI'
import { LoginParamsType } from '@/types/loginType'
import { LoginInformasi } from './informasiLogin'
import { FormLogin } from '@/components/Form/website/FormLogin'

export default function LoginLayout() {
  const navigate = useNavigate()

  const [angka1, setAngka1] = useState<number>(null)
  const [angka2, setAngka2] = useState<number>(null)

  const form = useForm<zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  })

  // Fungsi untuk menghasilkan dua angka acak antara 1 dan 10
  const generateRandomNumbers = () => {
    const random1 = Math.floor(Math.random() * 10) + 1 // Menghasilkan angka acak antara 1 dan 10
    const random2 = Math.floor(Math.random() * 10) + 1
    setAngka1(random1)
    setAngka2(random2)
  }

  useEffect(() => {
    generateRandomNumbers()
  }, [])

  // --- Create Login ---
  const [
    createLogin,
    {
      isError: isErrorLogin,
      error: errorLogin,
      isLoading: isLoadingLogin,
      isSuccess: isSuccessLogin,
    },
  ] = usePostLoginMutation()

  const handleSubmit = async (values: LoginParamsType) => {
    const body = {
      username: values?.username,
      password: values?.password,
      hasil: values?.hasil,
    }

    if (Number(values?.hasil) === angka1 + angka2) {
      try {
        const res = await createLogin({ data: body })
        if ('data' in res) {
          const token = res?.data?.data?.token
          Cookies.set('token', token)
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      toast.error(`Jawaban salah!`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }

  useEffect(() => {
    if (isSuccessLogin) {
      toast.success('Login berhasil', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setTimeout(() => {
        navigate(`/`)
      }, 3000)
    }
  }, [isSuccessLogin])

  useEffect(() => {
    if (isErrorLogin) {
      const errorMsg = errorLogin as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorLogin, errorLogin])

  return (
    <div
      className="flex h-screen items-center justify-center text-[2rem] phones:text-[2.4rem]"
      style={{ backgroundImage: `url(${BgImageLayer1})` }}
    >
      <div className="flex h-[70%] w-[80%] rounded-4x border-4 border-warna-pale-blue phones:h-full phones:w-full phones:flex-col phones:rounded-none phones:border-0">
        <div className="flex w-full items-center justify-center rounded-bl-3x rounded-tl-3x bg-warna-primary phones:rounded-none">
          <LoginInformasi />
        </div>
        <div className="flex w-full items-center justify-center rounded-br-3x rounded-tr-3x bg-white phones:flex-1 phones:rounded-none">
          <FormLogin
            handleSubmit={handleSubmit}
            isLoading={isLoadingLogin}
            form={form}
            angka1={angka1}
            angka2={angka2}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
