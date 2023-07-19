export type TProductPlanIdRequest = 'plan-premium-yearly'

export interface TCreateOrderRequestPayload {
  product_plan_id: string
  coupon_code: string
}

export interface IPostCreateOrderResponseBody {
  order_id: string
}

export interface IPostCreateOrderResponseParsed {
  orderId: string
}

export type TPostCreateOrder = (responseBody: IPostCreateOrderResponseBody) => IPostCreateOrderResponseParsed
