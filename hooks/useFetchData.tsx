import { useCallback, useState } from 'react'

export function useFetchData <T>(initStateData: T | null = null) {
  const [data, setData] = useState<T | null>(initStateData)
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const request = useCallback(
    async (url: string,
      method: string = 'get',
      headers: {} = {},
      body: string | null = null
    ): Promise<T | undefined> => {
      try {
        setIsLoading(true)
        if (body) {
          body = JSON.stringify(body)
        }
        headers = {
          ...headers, 'Content-type': 'application/json; charset=UTF-8'
        }
        const res = await fetch(url, { method, body, headers })
        let result: T
        try {
          result = await res.json()
          setData(result)
          setIsLoading(false)
          return result
        } catch (e) {
          setError('Error JSON Parse')
        }
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        setError('The request is not executed, repeat later')
      }
    },
    []
  )
  
  const clearErrors = useCallback(() => {
    setError('')
  }, [])
  
  return { error, isLoading, data, request, clearErrors }
}