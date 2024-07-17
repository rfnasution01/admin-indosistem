import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { UpdateProfilSchema } from '@/schemas/profilSchema'
import { useUpdateProfileMutation } from '@/store/slices/profileAPI'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FormUpdateProfil from '@/components/Form/FormUpdateProfil'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useProfil } from '@/hooks/useProfil'

export default function UpdateProfil() {
  const navigate = useNavigate()
  const { profil } = useProfil()

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)
  const [urls, setUrls] = useState<string>()

  const form = useForm<zod.infer<typeof UpdateProfilSchema>>({
    resolver: zodResolver(UpdateProfilSchema),
    defaultValues: {},
  })

  // --- Create Update Profil ---
  const [
    createUpdateProfil,
    {
      isError: isErrorUpdateProfil,
      error: errorUpdateProfil,
      isLoading: isLoadingUpdateProfil,
      isSuccess: isSuccessUpdateProfil,
    },
  ] = useUpdateProfileMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      email: values?.email,
      nama: values?.nama,
      hp: values?.hp,
    }

    if (isSubmit && isShow) {
      try {
        await createUpdateProfil({ data: body })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessUpdateProfil) {
      toast.success(`Update data berhasil`, {
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
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessUpdateProfil])

  useEffect(() => {
    if (isErrorUpdateProfil) {
      const errorMsg = errorUpdateProfil as { data?: { message?: string } }

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
  }, [isErrorUpdateProfil, errorUpdateProfil])

  useEffect(() => {
    if (profil) {
      form.setValue('nama', profil?.nama)
      form.setValue('email', profil?.email)
      form.setValue('hp', profil?.hp)
      setUrls(profil?.gambar)
    }
  }, [profil])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Link to="/profil" className="flex items-center gap-12 text-primary-100">
        <FontAwesomeIcon icon={faArrowLeft} />
        Kembali
      </Link>
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">Form Edit Profil</p>
        <FormUpdateProfil
          form={form}
          isLoading={isLoadingUpdateProfil}
          handleSubmit={handleSubmit}
          setIsShow={setIsShow}
          setIsSubmit={setIsSubmit}
          isShow={isShow}
          isSubmit={isSubmit}
          setUrls={setUrls}
          urls={urls}
        />
      </div>
      <ToastContainer />
    </div>
  )
}
