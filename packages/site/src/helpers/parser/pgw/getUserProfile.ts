import type {
  TGetUserProfile,
  IGetPlansResponseParsedItem,
  IGetPlansResponseBodyItem,
  TUserMemberShip,
  TUserType,
} from 'helpers/parser/pgw/types/getUserProfile.type'

import { parserMapping } from 'helpers/parser/parser'

const getUserProfile: TGetUserProfile = (responseBody) => {
  const plans: IGetPlansResponseParsedItem[] = []
  if (responseBody.hasOwnProperty('product_plans')) {
    parserMapping<IGetPlansResponseParsedItem>(
      responseBody,
      'product_plans',
      [],
      (productPlans: IGetPlansResponseBodyItem[]) => {
        if (productPlans.length != 0) {
          for (const plan of productPlans) {
            plans.push({
              createTime: parserMapping<string>(plan, 'create_time', '', (value: string) => {
                return new Date(value).toLocaleDateString('en-US')
              }),
              expireTime: parserMapping<string>(plan, 'expire_time', '', (value: string) => {
                return new Date(value).toLocaleDateString('en-US')
              }),
              productPlanId: parserMapping<string>(plan, 'product_plan_id', ''),
            })
          }
        }
      },
    )
  }
  return {
    username: parserMapping<string>(responseBody, 'username', ''),
    usertype: parserMapping<TUserType>(responseBody, 'user_type', 'eoa_address'),
    preferredUsername: parserMapping<string>(responseBody, 'preferred_username', ''),
    productPlans: plans,
    userMembership: parserMapping<TUserMemberShip>(
      responseBody,
      'user_membership',
      'freemium',
      (value: TUserMemberShip) => {
        if (value == 'free') {
          return 'freemium'
        }
      },
    ),
  }
}

export default getUserProfile
