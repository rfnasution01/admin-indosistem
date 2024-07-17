import { useEffect, useState } from 'react'
import { GetProfileType } from '@/types/profileType'
import { useGetProfilQuery } from '@/store/slices/profileAPI'

export function useProfil() {
  const [profil, setProfil] = useState<GetProfileType>()
  const { data, isLoading, isFetching, isError, error } = useGetProfilQuery()

  useEffect(() => {
    if (data) {
      setProfil(data?.data)
    }
  }, [data])

  const loading = isFetching || isLoading

  return {
    profil,
    loading,
    isError,
    error,
  }
}
