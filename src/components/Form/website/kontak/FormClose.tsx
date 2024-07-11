import { Form } from '@/components/Form'
import { KontakMasukDetail } from '@/types/website/profil/kontakType'
import { UseFormReturn } from 'react-hook-form'

export function FormClose({
  data,
  form,
  loadingClose,
  handleSubmitClose,
}: {
  data: KontakMasukDetail
  form: UseFormReturn
  loadingClose: boolean
  handleSubmitClose: () => Promise<void>
}) {
  return (
    <>
      {data?.status !== 2 && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitClose)}
            className="flex h-full gap-24 phones:flex-col"
          >
            <button
              type="submit"
              disabled={loadingClose || data?.status === 2}
              className={`${data?.status === 2 ? 'cursor-not-allowed bg-opacity-50' : 'hover:bg-opacity-80'} text-nowrap rounded-2xl bg-rose-800 px-32 py-16 text-white  phones:w-full`}
            >
              Tutup Tiket
            </button>
          </form>
        </Form>
      )}
    </>
  )
}
