import {
  GENERAL_ENDPOINTS,
  PAYMENT_ENDPOINTS,
  PaymentCreditsCheckoutRequestBody,
  PaymentCreditsCheckoutResponseBody
} from '@commonTypes'
import { axiosApi } from '@config'

export const createCreditsWithCard = async (
  data: PaymentCreditsCheckoutRequestBody
) => {
  const response = await axiosApi.post<PaymentCreditsCheckoutResponseBody>(
    `${GENERAL_ENDPOINTS.BASE_API_URL}${GENERAL_ENDPOINTS.PAYMENT}${PAYMENT_ENDPOINTS.CREATE_SESSION_CREDITS}`,
    data
  )

  return response.data
}
