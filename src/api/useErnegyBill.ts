import { useMemo } from 'react'
import useApi from './useApi'
import { getErnegyBill } from './getErnegyBill'

const useErnegyBill = () => {
  const request = useMemo(() => getErnegyBill(), [])
  return useApi(request)
}

export default useErnegyBill
