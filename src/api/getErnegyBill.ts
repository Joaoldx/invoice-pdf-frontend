export const BASE_URL = 'http://localhost:3333'

const createUrl = (base: string, path: string) => `${base}${path}`

export const getErnegyBill = () => [createUrl(BASE_URL, '/ernegybill')]
