import { Breadcrumb } from '@/components/Breadcrumb'
import { usePathname } from '@/hooks/usePathname'
import { EditGambarSchema } from '@/schemas/website/pengumumanSchema'
import { convertSlugToText } from '@/utils/formatText'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useUpdateGambarMutation } from '@/store/slices/website/pengumumanAPI'
import { useNavigate } from 'react-router-dom'
import FormEditGambar from '@/components/Form/website/pengumuman/FormEditGambar'

export default function EditGambar() {
  const navigate = useNavigate()
  const [urls, setUrls] = useState<string>()

  const { lastPathname, secondPathname } = usePathname()
  const idPengumuman = localStorage.getItem('ID') ?? ''
  const idGambar = localStorage.getItem('editID') ?? ''
  const data = localStorage.getItem('editData') ?? ''

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof EditGambarSchema>>({
    resolver: zodResolver(EditGambarSchema),
    defaultValues: {},
  })

  // --- Create Edit Gambar ---
  const [
    createEditGambar,
    {
      isError: isErrorEditGambar,
      error: errorEditGambar,
      isLoading: isLoadingEditGambar,
      isSuccess: isSuccessEditGambar,
    },
  ] = useUpdateGambarMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id_pengumuman: idPengumuman,
      id_gambar: idGambar,
      keterangan: values?.keterangan,
      url_gambar: urls,
    }

    if (isSubmit && isShow) {
      try {
        await createEditGambar({ body: body, jenis: secondPathname })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessEditGambar) {
      toast.success(`Update gambar berhasil`, {
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
        localStorage.setItem('editID', idPengumuman)
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessEditGambar])

  useEffect(() => {
    if (isErrorEditGambar) {
      const errorMsg = errorEditGambar as { data?: { message?: string } }

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
  }, [isErrorEditGambar, errorEditGambar])

  useEffect(() => {
    if (data) {
      const item = JSON.parse(data)
      form.setValue('keterangan', item?.keterangan)
      form.setValue('url_gambar', item?.gambar)
      setUrls(item?.gambar)
    }
  }, [data])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {convertSlugToText(lastPathname)}
        </p>
        <FormEditGambar
          form={form}
          isLoading={isLoadingEditGambar}
          handleSubmit={handleSubmit}
          setIsShow={setIsShow}
          setIsSubmit={setIsSubmit}
          isShow={isShow}
          isSubmit={isSubmit}
          urls={urls}
          setUrls={setUrls}
        />
      </div>
      <ToastContainer />
    </div>
  )
}
