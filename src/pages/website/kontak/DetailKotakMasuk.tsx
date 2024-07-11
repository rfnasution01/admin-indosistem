import { Breadcrumb } from '@/components/Breadcrumb'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import {
  useClosePesanMutation,
  useCreatePesanMutation,
  useGetKontakMasukDetailQuery,
} from '@/store/slices/website/kontakAPI'
import { ChatType, KontakMasukDetail } from '@/types/website/profil/kontakType'
import { Loading } from '@/components/Loading'
import { DetailPesanInfo } from '@/features/website/kontak/Pesan/DetailPesanInfo'
import { DetailPesanChat } from '@/features/website/kontak/Pesan/DetailPesanChat'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { ChatSchema, CloseSchema } from '@/schemas/website/pesanSchema'
import { useCreateFileMutation } from '@/store/slices/referensiAPI'

export default function DetailKotakMasuk() {
  const navigate = useNavigate()

  const editId = localStorage.getItem('editID')

  const [detail, setDetail] = useState<KontakMasukDetail>()
  const [chat, setChat] = useState<ChatType[]>([])

  const {
    data: dataDetail,
    isError: isErrorDetail,
    error: errorDetail,
    isFetching: isFetchingDetail,
    isLoading: isLoadingDetail,
  } = useGetKontakMasukDetailQuery({ id: editId })

  const isLoading = isLoadingDetail || isFetchingDetail

  useEffect(() => {
    if (dataDetail?.data) {
      setDetail(dataDetail?.data?.data)
      setChat(dataDetail?.data?.chat)
    }
  }, [dataDetail])

  useEffect(() => {
    if (isErrorDetail) {
      const errorMsg = errorDetail as { data?: { message?: string } }

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
  }, [isErrorDetail, errorDetail])

  const [urls, setUrls] = useState<string[]>()

  const formChat = useForm<zod.infer<typeof ChatSchema>>({
    resolver: zodResolver(ChatSchema),
    defaultValues: {},
  })

  const [dir, setDir] = useState(formChat.watch('berkas') ?? [])

  const formClose = useForm<zod.infer<typeof CloseSchema>>({
    resolver: zodResolver(CloseSchema),
    defaultValues: {},
  })

  // --- Upload File ---
  const [
    uploadFileMutation,
    {
      isSuccess: successFile,
      isError: isErrorFile,
      error: errorFile,
      isLoading: loadingFile,
    },
  ] = useCreateFileMutation()

  const handleUploadFoto = async (file: File) => {
    const formatData = new FormData()
    formatData.append('berkas', file)

    try {
      const res = await uploadFileMutation(formatData)
      setDir([...dir, res?.data?.url])
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (successFile) {
      toast.success('Berhasil unggah photo!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [successFile])

  useEffect(() => {
    if (isErrorFile) {
      const errorMsg = errorFile as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorFile, errorFile])

  // --- Create Chat ---
  const [
    createChat,
    {
      isError: isErrorChat,
      error: errorChat,
      isLoading: isLoadingChat,
      isSuccess: isSuccessChat,
    },
  ] = useCreatePesanMutation()

  const handleSubmitChat = async () => {
    const values = formChat.getValues()

    const body = {
      id: editId ?? '',
      isi: values?.isi,
      lampiran: urls,
    }
    try {
      await createChat({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessChat) {
      toast.success('Pesan berhasil dikirim!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      formChat.reset()
      setUrls([])
      setDir([])
      // window.location.reload()
    }
  }, [isSuccessChat])

  useEffect(() => {
    if (isErrorChat) {
      const errorMsg = errorChat as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorChat, errorChat])

  // --- Create Close ---
  const [
    createClose,
    {
      isError: isErrorClose,
      error: errorClose,
      isLoading: isLoadingClose,
      isSuccess: isSuccessClose,
    },
  ] = useClosePesanMutation()

  const handleSubmitClose = async () => {
    const body = {
      id: editId ?? '',
    }
    try {
      await createClose({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessClose) {
      toast.success('Tiket berhasil di tutup!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isSuccessClose])

  useEffect(() => {
    if (isErrorClose) {
      const errorMsg = errorClose as { data?: { message?: string } }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorClose, errorClose])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-32 phones:h-auto">
      <Breadcrumb />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="scrollbar flex flex-1 overflow-y-auto phones:h-auto phones:flex-col">
          <DetailPesanInfo detail={detail} />
          <DetailPesanChat
            chat={chat}
            nama={`${detail?.nama_depan} ${detail?.nama_belakang}`}
            formChat={formChat}
            formClose={formClose}
            handleSubmitChat={handleSubmitChat}
            handleSubmitClose={handleSubmitClose}
            handleUploadFoto={handleUploadFoto}
            setUrls={setUrls}
            setDir={setDir}
            dir={dir}
            loadingFile={loadingFile}
            isLoadingChat={isLoadingChat}
            isLoadingClose={isLoadingClose}
            tiket={detail}
          />
        </div>
      )}
      <ToastContainer />
    </div>
  )
}
