import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Select, { components } from 'react-select'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import { cn } from '@/utils/cn'
import { customStyles } from '@/types/selectType'
import { ReferensiType } from '@/types/referensiType'
import { useGetKabupatenQuery } from '@/store/slices/referensiAPI'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel: string
  useFormReturn: UseFormReturn
  className?: string
  level1?: boolean
  level2?: boolean
  level3?: boolean
  level4?: boolean
  level5?: boolean
}

export function SelectListKabupaten({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
  level1,
  level2,
  level3,
  level4,
  level5,
}: inputProps) {
  const [query, setQuery] = useState<string>(null)
  const [listKabupaten, setListKabupaten] = useState<ReferensiType[]>([])
  const provinsi = useFormReturn.watch('provinsi')

  const { data, isSuccess, isLoading, isFetching } = useGetKabupatenQuery(
    { id_propinsi: provinsi },
    { skip: !provinsi },
  )

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        setListKabupaten((prevData) => [...prevData, ...(data?.data ?? [])])
      } else {
        setListKabupaten([...(data?.data ?? [])])
      }
    }
  }, [data, provinsi])

  let kabupatenOption = []
  if (isSuccess) {
    kabupatenOption = listKabupaten.map((item) => {
      return {
        value: item?.id,
        label: item?.nama,
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
          <div className="text-[12px]">{props.label}</div>
        </div>
      </components.Option>
    )
  }

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
                      color: 'grey',
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: 'grey',
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      padding: 0,
                      maxHeight: '50vh',
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
                      color: 'rgb(32 34 35 / var(--tw-bg-opacity))',
                      cursor: isDisabled ? 'not-allowed' : 'default',
                      ':hover': {
                        cursor: 'pointer',
                        backgroundColor:
                          'rgb(240 244 247 / var(--tw-bg-opacity))',
                      },
                    }),
                  }}
                  className={`${level1 ? 'z-50' : level2 ? 'z-40' : level3 ? 'z-30' : level4 ? 'z-20' : level5 ? 'z-10' : 'z-0'} text-[2rem] disabled:cursor-not-allowed`}
                  options={kabupatenOption}
                  value={
                    kabupatenOption.filter(
                      (item) => item.value === field.value,
                    )[0]
                  }
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    field.onChange(optionSelected.value)
                    useFormReturn.setValue('kabupaten', optionSelected.value)
                    useFormReturn.setValue('kecamatan', null)
                    useFormReturn.setValue('desa', null)
                    useFormReturn.setValue('dusun', null)
                    useFormReturn.setValue(
                      'nama_kabupaten',
                      optionSelected?.label,
                    )
                  }}
                  isDisabled={isDisabled}
                  isLoading={isFetching || isLoading}
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
