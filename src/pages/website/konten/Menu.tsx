import { KategoriSchema } from '@/schemas/website/kategoriSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/Form'
import { SelectListPosisiMenu } from '@/components/Select/website'
import { useEffect, useState } from 'react'
import { MenubarDropDown } from '@/components/Menubar/MenubarDropdown'
import { GetMenuType } from '@/types/website/konten/menuType'
import {
  useCreateStatusKontenMutation,
  useDeleteMenuKontenMutation,
  useGetMenuKontenQuery,
} from '@/store/slices/website/menuKontenAPI'
import { Bounce, toast } from 'react-toastify'
import { usePathname } from '@/hooks/usePathname'
import { columnsListDataMenu } from '@/dummy/table'
import { TableMenu } from '@/components/Table/TableMenu'
import { useGetPosisiMenuQuery } from '@/store/slices/referensiAPI'

export default function Menu() {
  const { thirdPathname } = usePathname()

  const [isShowStatus, setIsShowStatus] = useState<boolean>(false)
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false)

  const form = useForm<zod.infer<typeof KategoriSchema>>({
    resolver: zodResolver(KategoriSchema),
    defaultValues: {},
  })

  const [listPosisiMenu, setListPosisiMenu] = useState<string[]>([])

  const {
    data: dataPosisi,
    isSuccess: isSuccessPosisi,
    isLoading: isLoadingPosisi,
    isFetching: isFetchingPosisi,
  } = useGetPosisiMenuQuery()

  useEffect(() => {
    if (!isFetchingPosisi) {
      if (dataPosisi?.meta?.page > 1) {
        setListPosisiMenu((prevData) => [
          ...prevData,
          ...(dataPosisi?.data ?? []),
        ])
      } else {
        setListPosisiMenu([...(dataPosisi?.data ?? [])])
      }
    }
  }, [dataPosisi])

  const posisi = form.watch('kategori')

  const [menu, setMenu] = useState<GetMenuType[]>([])
  const { data, isLoading, isFetching } = useGetMenuKontenQuery({
    posisi: posisi ?? listPosisiMenu?.[0],
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMenu(data?.data)
    }
  }, [data, posisi])

  // --- Delete ---
  const [
    deleteMenu,
    {
      isError: isErrorDeleteMenu,
      isLoading: isLoadingDeleteMenu,
      isSuccess: isSuccessDeleteMenu,
      error: errorDeleteMenu,
    },
  ] = useDeleteMenuKontenMutation()

  const handleSubmitDelete = async (id: string) => {
    try {
      await deleteMenu({ id: id })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessDeleteMenu) {
      toast.success(`Delete ${thirdPathname} berhasil`, {
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
      setIsShowDelete(false)
    }
  }, [isSuccessDeleteMenu])

  useEffect(() => {
    if (isErrorDeleteMenu) {
      const errorMsg = errorDeleteMenu as { data?: { message?: string } }

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
  }, [isErrorDeleteMenu, errorDeleteMenu])

  // --- Status Menu ---
  const [
    statusMenu,
    {
      isError: isErrorStatusMenu,
      isLoading: isLoadingStatusMenu,
      isSuccess: isSuccessStatusMenu,
      error: errorStatusMenu,
    },
  ] = useCreateStatusKontenMutation()

  const handleSubmitStatus = async (id: string, status: number) => {
    const body = {
      id: id,
      aktif: status === 0 ? 1 : 0,
    }
    try {
      await statusMenu({ body: body })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessStatusMenu) {
      toast.success(`Update ${thirdPathname} berhasil`, {
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
      setIsShowStatus(false)
    }
  }, [isSuccessStatusMenu])

  useEffect(() => {
    if (isErrorStatusMenu) {
      const errorMsg = errorStatusMenu as { data?: { message?: string } }

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
  }, [isErrorStatusMenu, errorStatusMenu])

  useEffect(() => {
    if (listPosisiMenu) {
      form.setValue('kategori', listPosisiMenu?.[0])
    }
  }, [listPosisiMenu])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto rounded-3x bg-white p-48">
      {listPosisiMenu && (
        <div className="flex justify-between gap-32">
          <Form {...form}>
            <form className="w-1/3 phones:w-full">
              <SelectListPosisiMenu
                name="kategori"
                placeholder="Pilih Posisi"
                useFormReturn={form}
                listPosisiMenu={listPosisiMenu}
                isFetching={isFetchingPosisi}
                isLoading={isLoadingPosisi}
                isSuccess={isSuccessPosisi}
              />
            </form>
          </Form>
          {posisi && <MenubarDropDown posisi={posisi} />}
        </div>
      )}
      <TableMenu
        data={menu}
        columns={columnsListDataMenu}
        containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
        loading={loading}
        pageSize={1}
        currentPage={1}
        isNumber
        handleSubmitDelete={handleSubmitDelete}
        isShowDelete={isShowDelete}
        setIsShowDelete={setIsShowDelete}
        isLoadingDelete={isLoadingDeleteMenu}
        handleSubmitStatus={handleSubmitStatus}
        isLoadingStatus={isLoadingStatusMenu}
        setIsShowStatus={setIsShowStatus}
        isShowStatus={isShowStatus}
        isDetail
        isMenu
        posisi={posisi}
      />
    </div>
  )
}
