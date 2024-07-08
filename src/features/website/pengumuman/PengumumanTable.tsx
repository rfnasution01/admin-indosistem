import { Pagination } from '@/components/Pagination'
import { Searching } from '@/components/Searching'
import { FormListDataPerPage } from '@/components/Select/website'
import { TestimoniSchema } from '@/schemas/website/testimoniSchema'
import { Meta } from '@/store/api'
import { GetPengumumanType } from '@/types/website/pengumumanType'
import { Dispatch, SetStateAction } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import { SelectListPengumuman } from '@/components/Select/website/ListPengumuman'
import { Form } from '@/components/Form'
import { TablePengumuman } from '@/components/Table/TablePengumuman'
import { columnsListDataPengumuman } from '@/dummy/table'

export function PengumumanTable({
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
  isShow,
  setIsShow,
  isLoadingPublish,
  isShowPublish,
  setIsShowPublish,
  handleSubmitPublish,
}: {
  data: GetPengumumanType[]
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
  setIsShow: Dispatch<SetStateAction<boolean>>
  isShow: boolean
  isLoadingDelete: boolean
  handleSubmitPublish: (id: string, publish: string) => Promise<void>
  setIsShowPublish: Dispatch<SetStateAction<boolean>>
  isShowPublish: boolean
  isLoadingPublish: boolean
}) {
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
      <TablePengumuman
        data={data}
        columns={columnsListDataPengumuman}
        containerClasses="w-full h-full flex-1 overflow-y-auto scrollbar"
        loading={isLoading}
        pageSize={pageSize}
        currentPage={pageNumber}
        isNumber
        isShow={isShow}
        setIsShow={setIsShow}
        handleSubmitDelete={handleSubmitDelete}
        isLoadingDelete={isLoadingDelete}
        isPengumuman
        handleSubmitPublish={handleSubmitPublish}
        isLoadingPublish={isLoadingPublish}
        setIsShowPublish={setIsShowPublish}
        isShowPublish={isShowPublish}
      />
    </div>
  )
}
