import { useEffect, useState } from 'react'

type IResponse = {
  data: [
    {
      clientNumber: string
      readingDate: number
      readingBill: string
      eletricConsumed: number
      eletricBill: string
      sceeConsumed: number
      sceeBill: string
      compensedErnegy: number
      compensedBill: string
      publicLightingContribution: string
    }
  ]
}

const useApiResult = (request: RequestInfo | URL) => {
  const [results, setResults] = useState([] as unknown as IResponse)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(request)
      .then(async (response) => {
        if (response.ok) {
          const result = await response.json()
          setResults(result)
          setError('')
        } else {
          setError(await response.text())
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [request])

  return [results, error]
}

export default useApiResult
