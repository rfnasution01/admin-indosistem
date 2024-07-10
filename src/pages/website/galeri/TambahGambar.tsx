import { Breadcrumb } from '@/components/Breadcrumb'
import { usePathname } from '@/hooks/usePathname'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { convertSlugToText } from '@/utils/formatText'
import FormTambahGambar from '@/components/Form/website/kategori/FormTambahGambar'
import { useCreateGambarAlbumMutation } from '@/store/slices/website/galeriAPI'
import { TambahGambarAlbumSchema } from '@/schemas/website/galeriSchema'

export default function TambahGambar() {
  const navigate = useNavigate()

  const { lastPathname } = usePathname()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahGambarAlbumSchema>>({
    resolver: zodResolver(TambahGambarAlbumSchema),
    defaultValues: {},
  })

  // --- Create Tambah Gambar ---
  const [
    createTambahGambar,
    {
      isError: isErrorTambahGambar,
      error: errorTambahGambar,
      isLoading: isLoadingTambahGambar,
      isSuccess: isSuccessTambahGambar,
    },
  ] = useCreateGambarAlbumMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id_galeri: idEdit,
      gambar: values?.gambar,
    }

    if (isSubmit && isShow) {
      try {
        await createTambahGambar({ body: body })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessTambahGambar) {
      toast.success(`${isEdit ? 'Edit' : 'Tambah'} gambar berhasil`, {
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
  }, [isSuccessTambahGambar])

  useEffect(() => {
    if (isErrorTambahGambar) {
      const errorMsg = errorTambahGambar as { data?: { message?: string } }

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
  }, [isErrorTambahGambar, errorTambahGambar])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb editID={idEdit} />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {convertSlugToText(lastPathname)}
        </p>
        <FormTambahGambar
          form={form}
          isLoading={isLoadingTambahGambar}
          handleSubmit={handleSubmit}
          setIsShow={setIsShow}
          setIsSubmit={setIsSubmit}
          isShow={isShow}
          isSubmit={isSubmit}
        />
      </div>
      <ToastContainer />
    </div>
  )
}
