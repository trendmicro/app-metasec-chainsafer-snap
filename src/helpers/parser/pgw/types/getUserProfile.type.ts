export interface IGetPlansResponseBodyItem {
  create_time: string
  expire_time: string
  product_plan_id: string
}

export type TUserType = 'eoa_address' | 'email'
export type TUserMemberShip = 'free' | 'premium'

export interface IGetUserProfileResponseBody {
  preferred_username: string
  product_plans: IGetPlansResponseBodyItem[]
  username: string
  user_type: TUserType
  user_membership: TUserMemberShip
}

export interface IGetUserProfileResponseParsed {
  preferredUsername: string
  productPlans: IGetPlansResponseParsedItem[]
  username: string
  usertype: TUserType
  userMembership: TUserMemberShip
}

export interface IGetPlansResponseParsedItem {
  createTime: string
  expireTime: string
  productPlanId: string
}

export type TGetUserProfile = (responseBody: IGetUserProfileResponseBody) => IGetUserProfileResponseParsed
