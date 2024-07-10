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
import { KontakSchema } from '@/schemas/website/kontakSchema'
import {
  useCreateKontakMutation,
  useGetKontakQuery,
} from '@/store/slices/website/kontakAPI'
import FormTambahKontak from '@/components/Form/website/kontak/FormTambahKontak'
import { GetKontakType } from '@/types/website/profil/kontakType'
import Cookies from 'js-cookie'

export default function TambahKontak() {
  const navigate = useNavigate()

  const { lastPathname, secondPathname } = usePathname()

  const isEdit = lastPathname === 'edit'
  const idEdit = localStorage.getItem('editID') ?? null

  const [isSubmit, setIsSubmit] = useState<boolean>(false)
  const [isShow, setIsShow] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof KontakSchema>>({
    resolver: zodResolver(KontakSchema),
    defaultValues: {},
  })

  // --- Data kontak ---
  const [kontak, setKontak] = useState<GetKontakType>()

  const {
    data: dataKontak,
    isError: isErrorKontak,
    error: errorKontak,
  } = useGetKontakQuery()

  useEffect(() => {
    if (dataKontak?.data) {
      setKontak(dataKontak?.data)
    }
  }, [dataKontak?.data])

  useEffect(() => {
    if (isErrorKontak) {
      const errorMsg = errorKontak as { data?: { message?: string } }

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

      if (errorMsg?.data?.message?.includes('Token')) {
        setTimeout(() => {
          Cookies.remove('token')
          navigate(`/`)
        }, 3000)
      }
    }
  }, [isErrorKontak, errorKontak])

  // --- Create Tambah Gambar ---
  const [
    createTambahGambar,
    {
      isError: isErrorTambahGambar,
      error: errorTambahGambar,
      isLoading: isLoadingTambahGambar,
      isSuccess: isSuccessTambahGambar,
    },
  ] = useCreateKontakMutation()

  const handleSubmit = async () => {
    const values = form.getValues()

    const body = {
      alamat: values?.alamat,
      telepon: values?.telepon,
      kota: values?.kota,
      wa: values?.wa,
      fb: values?.fb,
      tw: values?.tw,
      ig: values?.ig,
      yt: values?.yt,
      telegram: values?.telegram,
      weekday_cs:
        values?.weekday_cs_mulai && values?.weekday_cs_selesai
          ? `${values?.weekday_cs_mulai} s/d ${values?.weekday_cs_selesai} WIB`
          : '-',
      weekend_cs:
        values?.weekend_cs_mulai && values?.weekend_cs_selesai
          ? `${values?.weekend_cs_mulai} s/d ${values?.weekend_cs_selesai} WIB`
          : '-',
      tiktok: values?.tiktok,
      email: values?.email,
      latitude: values?.latitude,
      longitude: values?.longitude,
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
      toast.success(`${isEdit ? 'Edit' : 'Tambah'} kontak berhasil`, {
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

  useEffect(() => {
    if (kontak) {
      form.setValue('alamat', kontak?.alamat)
      form.setValue('kota', kontak?.kota)
      form.setValue('latitude', kontak?.latitude)
      form.setValue('longitude', kontak?.longitude)
      form.setValue('wa', kontak?.wa)
      form.setValue('fb', kontak?.fb)
      form.setValue('tw', kontak?.tw)
      form.setValue('ig', kontak?.ig)
      form.setValue('yt', kontak?.yt)
      form.setValue('telegram', kontak?.telegram)
      form.setValue('tiktok', kontak?.tiktok)
      form.setValue('telepon', kontak?.telepon)
      form.setValue('email', kontak?.email)

      // Regular expression to match time patterns
      const timePattern = /(\d{2}:\d{2})\s+s\/d\s+(\d{2}:\d{2})/

      const matchWeekday = kontak?.weekday_cs?.match(timePattern)
      const matchWeekend = kontak?.weekend_cs?.match(timePattern)

      if (matchWeekday) {
        const jam_mulai = matchWeekday[1]
        const jam_selesai = matchWeekday[2]

        form.setValue('weekday_cs_mulai', jam_mulai)
        form.setValue('weekday_cs_selesai', jam_selesai)
      } else {
        console.log('Time pattern not found')
      }
      if (matchWeekend) {
        const jam_mulai = matchWeekend[1]
        const jam_selesai = matchWeekend[2]

        form.setValue('weekend_cs_mulai', jam_mulai)
        form.setValue('weekend_cs_selesai', jam_selesai)
      } else {
        console.log('Time pattern not found')
      }
    }
  }, [kontak])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      <Breadcrumb editID={idEdit} />
      <div className="scrollbar flex flex-1 flex-col gap-32 overflow-y-auto">
        <p className="font-roboto text-[2.4rem]">
          Form {convertSlugToText(lastPathname)}{' '}
          {convertSlugToText(secondPathname)}
        </p>
        <FormTambahKontak
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
