import { Breadcrumb } from '@/components/Breadcrumb'
import { usePathname } from '@/hooks/usePathname'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { capitalizeFirstLetterFromLowercase } from '@/utils/formatText'
import { TestimoniSchema } from '@/schemas/website/testimoniSchema'
import { useCreateTestimoniMutation } from '@/store/slices/website/profilAPI/testimoniAPI'
import FormTambahTestimoni from '@/components/Form/website/profil/FormTambahTestimonial'
import { useAkses } from '@/hooks/useAkses'

export default function TambahTestimoniSekolah() {
  const navigate = useNavigate()
  const { isHakAksesTambah, isHakAksesUbah } = useAkses()

  const { lastPathname, thirdPathname } = usePathname()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null
  const editData = localStorage.getItem('editData') ?? ''

  const [urls, setUrls] = useState<string>()
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TestimoniSchema>>({
    resolver: zodResolver(TestimoniSchema),
    defaultValues: {},
  })

  // --- Create Tambah Testimoni ---
  const [
    createTambahTestimoni,
    {
      isError: isErrorTambahTestimoni,
      error: errorTambahTestimoni,
      isLoading: isLoadingTambahTestimoni,
      isSuccess: isSuccessTambahTestimoni,
    },
  ] = useCreateTestimoniMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: isEdit ? idEdit : null,
      url_photo: urls ?? '',
      nama: values?.nama ?? '',
      keterangan_singkat: values?.keterangan_singkat ?? '',
      isi: values?.isi ?? '',
    }

    if (!isHakAksesTambah) {
      toast.error(`Maaf, anda tidak memiliki akses untuk mengubah data ini`, {
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
    if ((isEdit && !isHakAksesUbah) || (!isEdit && !isHakAksesTambah)) {
      toast.error(
        `Maaf, anda tidak memiliki akses untuk ${isEdit ? 'mengubah' : 'menambah'} data ini`,
        {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        },
      )
    }

    if (isSubmit && isShow) {
      try {
        await createTambahTestimoni({ body: body })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessTambahTestimoni) {
      toast.success(`${isEdit ? 'Edit' : 'Tambah'} testimoni berhasil`, {
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
  }, [isSuccessTambahTestimoni])

  useEffect(() => {
    if (isErrorTambahTestimoni) {
      const errorMsg = errorTambahTestimoni as { data?: { message?: string } }

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
  }, [isErrorTambahTestimoni, errorTambahTestimoni])

  useEffect(() => {
    if (isEdit && editData !== '' && idEdit) {
      const item = JSON.parse(editData)

      form.setValue('nama', item?.nama)
      form.setValue('keterangan_singkat', item?.keterangan_singkat)
      form.setValue('isi', item?.isi)
      form.setValue('url_photo', item?.url_photo)
      setUrls(item?.url_photo)
    }
  }, [isEdit, editData, idEdit])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {capitalizeFirstLetterFromLowercase(lastPathname)}{' '}
          {capitalizeFirstLetterFromLowercase(thirdPathname)}
        </p>
        <FormTambahTestimoni
          form={form}
          isLoading={isLoadingTambahTestimoni}
          handleSubmit={handleSubmit}
          setUrls={setUrls}
          urls={urls}
          setIsShow={setIsShow}
          setIsSubmit={setIsSubmit}
          isShow={isShow}
          isSubmit={isSubmit}
          isEdit={isEdit}
          isTambah={isHakAksesTambah}
          isUbah={isHakAksesUbah}
        />
      </div>
      <ToastContainer />
    </div>
  )
}
