import React from 'react'
import PrivecyPolicy from './PrivecyPolicy'
import RefundPolicy from './RefundPolicy'
import ShippingPolicy from './ShippingPolicy'
import Terms from './Terms'

const Policies = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <ul className="space-y-4">
        <li>
          <details className="bg-white rounded-lg p-4 shadow">
            <summary className="text-lg font-semibold cursor-pointer hover:text-blue-600">
              Privecy Policy
            </summary>
            <PrivecyPolicy />
          </details>
        </li>
        <li>
          <details className="bg-white rounded-lg p-4 shadow">
            <summary className="text-lg font-semibold cursor-pointer hover:text-blue-600">
              Terms and Conditions
            </summary>
            <Terms />
          </details>
        </li>
        <li>
          <details className="bg-white rounded-lg p-4 shadow">
            <summary className="text-lg font-semibold cursor-pointer hover:text-blue-600">
            Cancellation & Refund Policy
            </summary>
            <RefundPolicy />
          </details>
        </li>
        <li>
          <details className="bg-white rounded-lg p-4 shadow">
            <summary className="text-lg font-semibold cursor-pointer hover:text-blue-600">
              Shipping Policy
            </summary>
            <ShippingPolicy />
          </details>
        </li>
      </ul>
    </div>
  )
}

export default Policies