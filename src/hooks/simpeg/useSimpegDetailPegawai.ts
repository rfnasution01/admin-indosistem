import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form'
import {
  SimpegTambahAnakSchema,
  SimpegTambahIstriSchema,
  SimpegTambahOrangTuaSchema,
  SimpegTambahSaudaraSchema,
} from '@/schemas/simpeg/informasiPribadiSchema'

export function useSimpegDetailPegawai() {
  const formTambahIstri = useForm<zod.infer<typeof SimpegTambahIstriSchema>>({
    resolver: zodResolver(SimpegTambahIstriSchema),
    defaultValues: {},
  })
  const formTambahAnak = useForm<zod.infer<typeof SimpegTambahAnakSchema>>({
    resolver: zodResolver(SimpegTambahAnakSchema),
    defaultValues: {},
  })
  const formTambahOrangtua = useForm<
    zod.infer<typeof SimpegTambahOrangTuaSchema>
  >({
    resolver: zodResolver(SimpegTambahOrangTuaSchema),
    defaultValues: {},
  })
  const formTambahSaudara = useForm<
    zod.infer<typeof SimpegTambahSaudaraSchema>
  >({
    resolver: zodResolver(SimpegTambahSaudaraSchema),
    defaultValues: {},
  })

  return {
    formTambahIstri,
    formTambahAnak,
    formTambahOrangtua,
    formTambahSaudara,
  }
}
