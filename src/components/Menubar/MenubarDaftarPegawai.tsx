import { Dispatch, SetStateAction, useState } from 'react'
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from './Menubar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import { UseFormReturn } from 'react-hook-form'
import { Form } from '../Form'
import {
  FormListTanggal,
  SelectListJenisKepegawaian,
  SelectListStatusKepegawaian,
  SelectListValidasi,
} from '../Select/simpeg'
import { ListBulan } from '@/dummy/listBulan'

export function MenubarDaftarPegawai({
  setJenisKepegawaian,
  setBulan,
  setStatusKepegawaian,
  setTahun,
  setValidasi,
  form,
}: {
  setJenisKepegawaian: Dispatch<SetStateAction<string>>
  setStatusKepegawaian: Dispatch<SetStateAction<string>>
  setValidasi: Dispatch<SetStateAction<string>>
  setTahun: Dispatch<SetStateAction<string>>
  setBulan: Dispatch<SetStateAction<string>>
  form: UseFormReturn
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const ListTahun = []
  const tahunSekarang = new Date().getFullYear()

  for (let i = tahunSekarang; i >= tahunSekarang - 70; i--) {
    ListTahun.push({ value: i.toString(), label: String(i) })
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger
          className="w-full text-center transition-all duration-300 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
          variant="nothing"
          layout="icon"
          size="fit"
          onClick={handleMenuClick}
        >
          <div
            className={`flex items-center gap-12 rounded-2xl border border-primary-100 px-24 py-12 text-primary-100 hover:bg-primary-100 hover:text-white`}
          >
            <FontAwesomeIcon icon={faFilter} size="sm" />
            <p>Filter</p>
          </div>
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent className="scrollbar absolute left-0 top-0 h-[55vh] w-[80rem] overflow-y-auto bg-white p-32 text-[2rem] text-warna-dark shadow-lg transition-all duration-300 phones:h-[65vh] phones:w-[50rem]">
            <Form {...form}>
              <form className="flex flex-col gap-12">
                <SelectListJenisKepegawaian
                  useFormReturn={form}
                  name="jenis_kepegawaian"
                  placeholder="Pilih Jenis Kepegawaian"
                  headerLabel="Jenis Kepegawaian"
                />
                <SelectListStatusKepegawaian
                  useFormReturn={form}
                  name="status_pegawai"
                  placeholder="Pilih Status Kepegawaian"
                  headerLabel="Status Kepegawaian"
                />
                <SelectListValidasi
                  form={form}
                  name="validasi"
                  placeholder="Pilih Validasi"
                  headerLabel="Validasi"
                />

                <FormListTanggal
                  name="tahun"
                  placeholder="Pilih Tahun"
                  headerLabel="Tahun"
                  form={form}
                  data={ListTahun}
                />

                <FormListTanggal
                  name="bulan"
                  placeholder="Pilih Bulan"
                  headerLabel="Bulan"
                  form={form}
                  data={ListBulan}
                  isBulan
                />
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setJenisKepegawaian(form.watch('jenis_kepegawaian'))
                      setStatusKepegawaian(form.watch('status_pegawai'))
                      setValidasi(form.watch('validasi'))
                      setTahun(form.watch('tahun'))
                      setBulan(form.watch('bulan'))
                      setIsMenuOpen(false)
                    }}
                    className="rounded-2xl bg-primary-100 px-24 py-12 text-white hover:bg-opacity-80"
                  >
                    Terapkan
                  </button>
                </div>
              </form>
            </Form>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
