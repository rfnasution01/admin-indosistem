import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import { cn } from '@/utils/cn'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Select, { components } from 'react-select'
import { customStyles } from '@/types/selectType'
import { ProfilSekolahType } from '@/types/website/profil/tentangSekolahType'
import { useGetTentangSekolahQuery } from '@/store/slices/website/profilAPI/tentangAPI'
import { usePathname } from '@/hooks/usePathname'
import { useGetJenisProfilQuery } from '@/store/slices/referensiAPI'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel?: string
  useFormReturn: UseFormReturn
  className?: string
}

export function SelectListJenisTentangSekolah({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
}: inputProps) {
  const { lastPathname } = usePathname()
  const [query, setQuery] = useState<string>(null)
  const [identitas, setIdentitas] = useState<ProfilSekolahType[]>([])

  const { data: dataIdentitas } = useGetTentangSekolahQuery()

  useEffect(() => {
    if (dataIdentitas?.data) {
      setIdentitas(dataIdentitas?.data?.profil)
    }
  }, [dataIdentitas?.data])

  const [listJenisTentangSekolah, setListJenisTentangSekolah] = useState<
    string[]
  >([])

  const { data, isSuccess, isLoading, isFetching } = useGetJenisProfilQuery()

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        setListJenisTentangSekolah((prevData) => [
          ...prevData,
          ...(data?.data ?? []),
        ])
      } else {
        setListJenisTentangSekolah([...(data?.data ?? [])])
      }
    }
  }, [data])

  const listJenis = identitas?.map((item) => item?.jenis)
  const filteredMenuData = listJenisTentangSekolah?.filter(
    (item) => !listJenis?.includes(item),
  )

  const menu =
    lastPathname === 'edit' ? listJenisTentangSekolah : filteredMenuData

  let JenisTentangSekolahOption = []
  if (isSuccess) {
    JenisTentangSekolahOption = menu.map((item) => {
      return {
        value: item,
        label: item,
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
              'z-40 flex w-full flex-col gap-12 text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]',
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
                  className={'text-[2rem]'}
                  options={JenisTentangSekolahOption}
                  value={
                    JenisTentangSekolahOption.filter(
                      (item) => item.value === field.value,
                    )[0]
                  }
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    field.onChange(optionSelected?.value)
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
