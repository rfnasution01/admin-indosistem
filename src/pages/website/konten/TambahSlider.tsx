import { usePathname } from '@/hooks/usePathname'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { Breadcrumb } from '@/components/Breadcrumb'
import { convertSlugToText } from '@/utils/formatText'
import 'react-toastify/dist/ReactToastify.css'
import { TambahSliderSchema } from '@/schemas/website/sliderSchema'
import { useCreateSliderMutation } from '@/store/slices/website/kontenAPI/sliderAPI'
import FormTambahSlider from '@/components/Form/website/konten/FormTambahSlider'

export default function UpdateSliderKonten() {
  const navigate = useNavigate()

  const { lastPathname, secondPathname } = usePathname()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null
  const data = localStorage.getItem('editData') ?? ''
  const [urls, setUrls] = useState<string>()

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof TambahSliderSchema>>({
    resolver: zodResolver(TambahSliderSchema),
    defaultValues: {},
  })

  // --- Create Tambah Slider ---
  const [
    createUpdateSlider,
    {
      isError: isErrorUpdateSlider,
      error: errorUpdateSlider,
      isLoading: isLoadingUpdateSlider,
      isSuccess: isSuccessUpdateSlider,
    },
  ] = useCreateSliderMutation()

  //   const values = form.watch()
  //   values?.list?.forEach((item, index) => {
  //     item.urutan = (index + 1).toString()
  //   })

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: isEdit ? idEdit : null,
      judul: values?.judul ?? '',
      gambar: urls ?? '',
      url: values?.url ?? '',
      aktif: Number(values?.aktif) ?? 0,
      urutan: 1,
    }

    if (isSubmit && isShow) {
      try {
        await createUpdateSlider({
          body: body,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessUpdateSlider) {
      toast.success(
        `${isEdit ? 'Update' : 'Tambah'} ${convertSlugToText(secondPathname).toLowerCase()} berhasil`,
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
      setTimeout(() => {
        form.reset()
        navigate(-1)
      }, 3000)
    }
  }, [isSuccessUpdateSlider])

  useEffect(() => {
    if (isErrorUpdateSlider) {
      const errorMsg = errorUpdateSlider as { data?: { message?: string } }

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
  }, [isErrorUpdateSlider, errorUpdateSlider])

  useEffect(() => {
    if (data && isEdit) {
      const item = JSON.parse(data)

      form.setValue('judul', item?.judul)
      form.setValue('gambar', item?.gambar)
      form.setValue('url', item?.url)
      form.setValue('aktif', item?.aktif.toString())
      setUrls(item?.gambar)
    }
  }, [data])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb editID={idEdit} />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {convertSlugToText(lastPathname)}{' '}
          {convertSlugToText(secondPathname)}
        </p>
        <FormTambahSlider
          form={form}
          isLoading={isLoadingUpdateSlider}
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
