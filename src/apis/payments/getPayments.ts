import {
  GENERAL_ENDPOINTS,
  GetPaymentTransactionsRequestQuery,
  GetPaymentTransactionsResponseBody,
  PAYMENT_ENDPOINTS
} from '@commonTypes'
import { axiosApi } from '@config'

// TODO: Fix the any once types are defined
export const getPayments = async (
  params: GetPaymentTransactionsRequestQuery
) => {
  const response = await axiosApi.get<GetPaymentTransactionsResponseBody>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PAYMENT}${PAYMENT_ENDPOINTS.GET}`,
    { params }
  )

  return response.data
}
