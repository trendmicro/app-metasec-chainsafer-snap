import type { TPostCreateOrder } from 'helpers/parser/pgw/types/postCreateOrder.type'

import { parserMapping } from 'helpers/parser/parser'

const postCreateOrder: TPostCreateOrder = (responseBody) => {
  return {
    orderId: parserMapping<string>(responseBody, 'order_id', ''),
  }
}

export default postCreateOrder
