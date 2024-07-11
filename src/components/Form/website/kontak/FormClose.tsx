import { ValidasiDelete } from '@/components/Dialog/ValidasiDelete'
import { Form } from '@/components/Form'
import { KontakMasukDetail } from '@/types/website/profil/kontakType'
import { Dispatch, SetStateAction } from 'react'
import { UseFormReturn } from 'react-hook-form'

export function FormClose({
  data,
  form,
  loadingClose,
  handleSubmitClose,
  isShow,
  setIsShow,
}: {
  data: KontakMasukDetail
  form: UseFormReturn
  loadingClose: boolean
  handleSubmitClose: () => Promise<void>
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <>
      {data?.status !== 2 && (
        <button
          type="button"
          onClick={() => setIsShow(true)}
          disabled={loadingClose || data?.status === 2}
          className={`${data?.status === 2 ? 'cursor-not-allowed bg-opacity-50' : 'hover:bg-opacity-80'} text-nowrap rounded-2xl bg-rose-800 px-32 py-16 text-white  phones:w-full`}
        >
          Tutup Tiket
        </button>
      )}

      <ValidasiDelete
        isOpen={isShow}
        setIsOpen={setIsShow}
        isTutup
        child={
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
        }
      />
    </>
  )
}
