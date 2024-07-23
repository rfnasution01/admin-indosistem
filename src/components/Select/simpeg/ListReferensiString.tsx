import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import { cn } from '@/utils/cn'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Select, { components } from 'react-select'
import { customStyles } from '@/types/selectType'
import { useGetReferensiStringQuery } from '@/store/slices/referensiAPI'
import { HalamanType } from '@/types/website/konten/halamanType'
import { useGetHalamanQuery } from '@/store/slices/website/kontenAPI/halamanAPI'
import { GetProgramType } from '@/types/website/profil/programLayananType'
import { useGetProgramQuery } from '@/store/slices/website/profilAPI/programLayananAPI'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel?: string
  useFormReturn: UseFormReturn
  className?: string
  setIdKategori?: Dispatch<SetStateAction<string>>
  jenis?: string
  level1?: boolean
  level2?: boolean
  level3?: boolean
  level4?: boolean
  level5?: boolean
}

export function SelectListKontenReferensiString({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
  setIdKategori,
  jenis,
  level1,
  level2,
  level3,
  level4,
  level5,
}: inputProps) {
  const [query, setQuery] = useState<string>(null)
  const [listKonten, setListKonten] = useState<string[]>([])

  const { data, isSuccess, isLoading, isFetching } = useGetReferensiStringQuery(
    {
      jenis: jenis,
    },
    { skip: !jenis },
  )

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        setListKonten((prevData) => [...prevData, ...(data?.data ?? [])])
      } else {
        setListKonten([...(data?.data ?? [])])
      }
    }
  }, [data])

  let KontenOption = []
  if (isSuccess) {
    KontenOption = listKonten.map((item) => {
      return {
        value: item,
        label: item,
      }
    })
  }

  const [listHalaman, setListHalaman] = useState<HalamanType[]>([])
  const {
    data: dataHalaman,
    isSuccess: isSuccessHalaman,
    isLoading: isLoadingHalaman,
    isFetching: isFetchingHalaman,
  } = useGetHalamanQuery({
    page_number: 1,
    page_size: 100,
    id_jenis: '',
    search: 'jenis',
  })

  useEffect(() => {
    if (!isFetchingHalaman) {
      if (dataHalaman?.meta?.page > 1) {
        setListHalaman((prevData) => [
          ...prevData,
          ...(dataHalaman?.data?.data ?? []),
        ])
      } else {
        setListHalaman([...(dataHalaman?.data?.data ?? [])])
      }
    }
  }, [dataHalaman])

  let HalamanOption = []
  if (isSuccessHalaman) {
    HalamanOption = listHalaman.map((item) => {
      return {
        value: item?.id,
        label: item?.judul,
      }
    })
  }

  const [listProgram, setListProgram] = useState<GetProgramType[]>([])
  const {
    data: dataProgram,
    isSuccess: isSuccessProgram,
    isLoading: isLoadingProgram,
    isFetching: isFetchingProgram,
  } = useGetProgramQuery()

  useEffect(() => {
    if (!isFetchingProgram) {
      if (dataProgram?.meta?.page > 1) {
        setListProgram((prevData) => [
          ...prevData,
          ...(dataProgram?.data ?? []),
        ])
      } else {
        setListProgram([...(dataProgram?.data ?? [])])
      }
    }
  }, [dataProgram])

  let ProgramOption = []
  if (isSuccessProgram) {
    ProgramOption = listProgram.map((item) => {
      return {
        value: item?.id,
        label: item?.judul,
      }
    })
  }

  const search = (newValue: string) => {
    if (newValue != query) {
      setQuery(newValue)
    }
  }

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div ref={props.innerRef}>
          <div className="flex flex-col gap-4">
            <p className="text-[2rem] font-bold">{props?.label ?? '-'}</p>
          </div>
        </div>
      </components.Option>
    )
  }

  const fetching = isFetching || isFetchingProgram || isFetchingHalaman
  const loading = isLoading || isLoadingProgram || isLoadingHalaman

  const konten =
    jenis === 'Halaman'
      ? HalamanOption
      : jenis === 'Program'
        ? ProgramOption
        : KontenOption

  return (
    <FormField
      name={name}
      control={useFormReturn.control}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              `${level1 ? 'z-50' : level2 ? 'z-40' : level3 ? 'z-30' : level4 ? 'z-20' : level5 ? 'z-10' : 'z-0'} flex w-full flex-col gap-12 text-[2rem] text-warna-dark phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]`,
              className,
            )}
          >
            {headerLabel && (
              <div className="text-warna-dark phones:w-full phones:text-left">
                <FormLabel className="font-roboto">{headerLabel}</FormLabel>
              </div>
            )}
            <div className="w-full phones:w-full">
              <FormControl>
                <Select
                  {...field}
                  styles={{
                    ...customStyles,
                    singleValue: (provided) => ({
                      ...provided,
                      color: '#1F475C',
                      textTransform: 'uppercase',
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: '#1F475C',
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      padding: 0,
                      maxHeight: '27vh',
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        width: 0,
                        height: 0,
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'transparent',
                        borderRadius: '6px',
                      },
                    }),
                    control: (provided) => ({
                      ...provided,
                      backgroundColor:
                        'rgb(255 255 255 / var(--tw-bg-opacity))',
                      border:
                        '1px solid rgb(203 213 225 / var(--tw-bg-opacity))',
                      borderRadius: '0.375rem',
                      fontSize: '2rem',
                    }),
                    option: (provided) => ({
                      ...provided,
                      backgroundColor:
                        'rgb(255 255 255 / var(--tw-bg-opacity))',
                      color: '#1F475C',
                      cursor: isDisabled ? 'not-allowed' : 'default',
                      ':hover': {
                        cursor: 'pointer',
                        backgroundColor:
                          'rgb(240 244 247 / var(--tw-bg-opacity))',
                      },
                    }),
                  }}
                  className={`${level1 ? 'z-50' : level2 ? 'z-40' : level3 ? 'z-30' : level4 ? 'z-20' : level5 ? 'z-10' : 'z-0'} text-[2rem]`}
                  options={konten}
                  value={konten.filter((item) => item.value === field.value)[0]}
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    field.onChange(optionSelected?.value)
                    useFormReturn.setValue(
                      `nama_kategori_${name}`,
                      optionSelected?.label,
                    )
                    if (setIdKategori) {
                      setIdKategori(optionSelected?.value)
                    }
                  }}
                  isDisabled={isDisabled}
                  isLoading={fetching || loading}
                  components={{ Option }}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
