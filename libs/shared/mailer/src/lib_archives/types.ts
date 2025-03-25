import { OrderProduct } from '@repo/shared/schema'

export type SendOrderArgs = {
  name: string
  total: number
  subTotal: number
  email: string
  pass: string
  products: OrderProduct[]
  items: number
  shipping: number
}

export type DispatchDetails = {
  client_address: string
  tracking_number: string
}

export type DispatchOrderArgs = {
  order: SendOrderArgs
  dispatchDetails: DispatchDetails
}

export type OrderNotificationArgs = {
  orderId: string
  customerName: string
  items: number
  total: number
  subTotal: number
  shipping: number
  pass: string
}
