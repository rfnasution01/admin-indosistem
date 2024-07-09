import { Pagination } from '@/components/Pagination'
import { Searching } from '@/components/Searching'
import { FormListDataPerPage } from '@/components/Select/website'
import { TestimoniSchema } from '@/schemas/website/testimoniSchema'
import { Meta } from '@/store/api'
import { Dispatch, SetStateAction } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/Form'
import { TableKategori } from '@/components/Table/TableKategori'
import { columnsListDataKategori } from '@/dummy/table'
import { GetKategoriType } from '@/types/website/kategoriType'
import { SelectListPengumuman } from '@/components/Select/website/ListPengumuman'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { convertSlugToText } from '@/utils/formatText'
import { usePathname } from '@/hooks/usePathname'

export function KategoriTable({
  data,
  meta,
  setSearch,
  setPageNumber,
  setPageSize,
  setIdKategori,
  pageNumber,
  pageSize,
  search,
  isLoading,
  isLoadingDelete,
  handleSubmitDelete,
  isShowDelete,
  setIsShowDelete,
  isLoadingPublish,
  isShowPublish,
  setIsShowPublish,
  handleSubmitPublish,
}: {
  data: GetKategoriType[]
  meta: Meta
  setSearch: Dispatch<SetStateAction<string>>
  setPageNumber: Dispatch<SetStateAction<number>>
  setPageSize: Dispatch<SetStateAction<number>>
  setIdKategori: Dispatch<SetStateAction<string>>
  pageSize: number
  pageNumber: number
  search: string
  isLoading?: boolean
  handleSubmitDelete: (id: string) => Promise<void>
  setIsShowDelete: Dispatch<SetStateAction<boolean>>
  isShowDelete: boolean
  isLoadingDelete: boolean
  handleSubmitPublish: (id: string, publish: string) => Promise<void>
  setIsShowPublish: Dispatch<SetStateAction<boolean>>
  isShowPublish: boolean
  isLoadingPublish: boolean
}) {
  const { secondPathname } = usePathname()

  const form = useForm<zod.infer<typeof TestimoniSchema>>({
    resolver: zodResolver(TestimoniSchema),
    defaultValues: {},
  })

  return (
    <div className="flex w-full flex-col gap-32">
      <div className="flex items-center justify-between gap-32 phones:flex-col phones:items-start">
        <div className="flex w-2/3 items-center gap-32 phones:w-full phones:flex-col phones:items-start">
          <Searching
            setPageNumber={setPageNumber}
            setSearch={setSearch}
            className="w-1/2 phones:w-full"
            search={search}
          />
          <Form {...form}>
            <form>
              <SelectListPengumuman
                useFormReturn={form}
                name="kategori"
                placeholder="Pilih Kategori"
                setIdKategori={setIdKategori}
                isDisabled={isLoading}
                className="phones:w-full"
              />
            </form>
          </Form>
        </div>
        <Link
          to="tambah"
          className="flex items-center gap-12 rounded-2xl bg-warna-primary px-24 py-16 text-white hover:bg-opacity-80"
        >
          <FontAwesomeIcon icon={faPlus} />
          <p className="phones:hidden">
            Tambah {convertSlugToText(secondPathname)} Baru
          </p>
        </Link>
      </div>
      <TableKategori
        data={data}
        columns={columnsListDataKategori}
        containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
        loading={isLoading}
        pageSize={pageSize}
        currentPage={pageNumber}
        isNumber
        isShowDelete={isShowDelete}
        setIsShowDelete={setIsShowDelete}
        handleSubmitDelete={handleSubmitDelete}
        isLoadingDelete={isLoadingDelete}
        isKategori
        handleSubmitPublish={handleSubmitPublish}
        isLoadingPublish={isLoadingPublish}
        setIsShowPublish={setIsShowPublish}
        isShowPublish={isShowPublish}
      />
      <div className="flex justify-end">
        <div className="flex items-center gap-32">
          <FormListDataPerPage setDataPerPage={setPageSize} />
          {data?.length > 0 && (
            <Pagination
              pageNow={pageNumber ?? 0}
              lastPage={meta?.last_page ?? 0}
              setPageNumber={setPageNumber}
            />
          )}
        </div>
      </div>
    </div>
  )
}
