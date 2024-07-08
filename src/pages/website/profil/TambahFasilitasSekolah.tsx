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
import { useCreateFasilitasMutation } from '@/store/slices/website/profilAPI/fasilitasAPI'
import { FasilitasSekolahSchema } from '@/schemas/website/fasilitasSekolahSchema'
import FormTambahFasilitas from '@/components/Form/website/profil/FormTambahFasilitas'

export default function TambahFasilitasSekolah() {
  const navigate = useNavigate()

  const { lastPathname, thirdPathname } = usePathname()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null
  const editData = localStorage.getItem('editData') ?? ''

  const [urls, setUrls] = useState<string>()
  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof FasilitasSekolahSchema>>({
    resolver: zodResolver(FasilitasSekolahSchema),
    defaultValues: {},
  })

  // --- Create Tambah Fasilitas ---
  const [
    createTambahFasilitas,
    {
      isError: isErrorTambahFasilitas,
      error: errorTambahFasilitas,
      isLoading: isLoadingTambahFasilitas,
      isSuccess: isSuccessTambahFasilitas,
    },
  ] = useCreateFasilitasMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      id: isEdit ? idEdit : null,
      photo: urls ?? '',
      keterangan: values?.keterangan ?? '',
      nama: values?.nama ?? '',
      jam_operasional:
        values?.jam_mulai && values?.jam_selesai
          ? `${values?.jam_mulai} s/d ${values?.jam_selesai} WIB`
          : '-',
      alamat: values?.alamat ?? '',
      telepon: values?.telepon ?? '',
    }

    if (isSubmit && isShow) {
      try {
        await createTambahFasilitas({ body: body })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessTambahFasilitas) {
      toast.success(`${isEdit ? 'Edit' : 'Tambah'} Fasilitas berhasil`, {
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
  }, [isSuccessTambahFasilitas])

  useEffect(() => {
    if (isErrorTambahFasilitas) {
      const errorMsg = errorTambahFasilitas as { data?: { message?: string } }

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
  }, [isErrorTambahFasilitas, errorTambahFasilitas])

  useEffect(() => {
    if (isEdit && editData !== '' && idEdit) {
      const item = JSON.parse(editData)

      // Regular expression to match time patterns
      const timePattern = /(\d{2}:\d{2})\s+s\/d\s+(\d{2}:\d{2})/

      const match = item?.jam_operasional?.match(timePattern)

      if (match) {
        const jam_mulai = match[1]
        const jam_selesai = match[2]

        form.setValue('jam_mulai', jam_mulai)
        form.setValue('jam_selesai', jam_selesai)
      } else {
        console.log('Time pattern not found')
      }

      form.setValue('nama', item?.nama)
      form.setValue('keterangan', item?.keterangan)
      form.setValue('alamat', item?.alamat)
      form.setValue('telepon', item?.telepon)
      form.setValue('photo', item?.photo)
      setUrls(item?.photo)
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
        <FormTambahFasilitas
          form={form}
          isLoading={isLoadingTambahFasilitas}
          handleSubmit={handleSubmit}
          setUrls={setUrls}
          urls={urls}
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
