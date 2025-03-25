import { Section, Text } from '@react-email/components'
import * as React from 'react'

type Props = {
  items: number
  subTotal: number
  total: number
  shipping: number
}

export function OrderDetails(props: Props) {
  const { items, subTotal, total, shipping } = props
  return (
    <Section>
      <table>
        <tbody>
          <tr>
            <td>
              <Text className="m-0 text-gray-800 text-sm font-bold">ITEMS:</Text>
            </td>
            <td>
              <Text className="m-0 ml-2 text-sx text-gray-800">{items}</Text>
            </td>
          </tr>

          <tr>
            <td>
              <Text className="m-0 text-gray-800 text-sm font-bold">ORDER SUBTOTAL:</Text>
            </td>
            <td>
              <Text className="m-0 ml-2 text-sx text-gray-800">${subTotal}</Text>
            </td>
          </tr>

          <tr>
            <td>
              <Text className="m-0 text-gray-800 text-sm font-bold">SHIPPING:</Text>
            </td>
            <td>
              <Text className="m-0 ml-2 text-sx text-gray-800">${shipping}</Text>
            </td>
          </tr>

          <tr>
            <td>
              <Text className="m-0  text-gray-800 text-sm font-bold">TOTAL:</Text>
            </td>
            <td>
              <Text className="m-0 ml-2 text-sx text-gray-800 ">${total}</Text>
            </td>
          </tr>
        </tbody>
      </table>
    </Section>
  )
}
