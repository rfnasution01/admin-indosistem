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
import { ReferensiType } from '@/types/referensiType'
import { useGetMadingQuery } from '@/store/slices/referensiAPI'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel?: string
  useFormReturn: UseFormReturn
  className?: string
  setIdKategori?: Dispatch<SetStateAction<string>>
}

export function SelectListMading({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
  setIdKategori,
}: inputProps) {
  const [query, setQuery] = useState<string>(null)
  const [listMading, setListMading] = useState<ReferensiType[]>([])

  const { data, isSuccess, isLoading, isFetching } = useGetMadingQuery()

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        setListMading((prevData) => [...prevData, ...(data?.data ?? [])])
      } else {
        setListMading([...(data?.data ?? [])])
      }
    }
  }, [data])

  let MadingOption = []
  if (isSuccess) {
    MadingOption = listMading.map((item) => {
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
          <div className="flex flex-col gap-4">
            <p className="text-[2rem] font-bold">{props?.label ?? '-'}</p>
          </div>
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
              'z-50 flex w-full flex-col gap-12 text-[2rem] text-warna-dark phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]',
              className,
            )}
          >
            {headerLabel && (
              <div className="text-sim-dark phones:w-full phones:text-left">
                <FormLabel>{headerLabel}</FormLabel>
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
                  className={'z-50 text-[2rem]'}
                  options={MadingOption}
                  value={
                    MadingOption.filter((item) => item.value === field.value)[0]
                  }
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    field.onChange(optionSelected?.value)
                    useFormReturn.setValue(
                      'nama_kategori',
                      optionSelected?.label,
                    )
                    if (setIdKategori) {
                      setIdKategori(optionSelected?.value)
                    }
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
