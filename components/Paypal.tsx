import { useState, useEffect } from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from "next/router";
import useFetchData from "hooks/use-fetch-data";
import useActionDispatch from "hooks/use-action-dispatch";

const ReactPayPal = (props) => {
  const { amount } = props
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter();
  const { submitPremiumUserData } = useActionDispatch();
  const { me } = useFetchData();

  const createOrder = (data, actions) => {
    if (data) {
    }

    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: amount,
            },
          },
        ],
        // remove the applicaiton_context object if you need your users to add a shipping address
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID) => {
        return orderID
      })
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details
      if (payer) {
      }
      setSucceeded(true)
      updateOrderDB(data)
    })
  }

  const onError = (err) => {
    console.log('paypal payment error: ', err)
    setError('Something went wrong with your payment')
  }

  const updateOrderDB = async (data) => {
    const newOrder = localStorage.getItem('order')
    const newOrderDetails = localStorage.getItem('orderDetails')

    if (newOrder) {
      const order = JSON.parse(newOrder)
      const orderWithPayment = {
        ...order,
        paypalOrderId: data.orderID,
        paypalPayerId: data.payerID,
      }

      const params = {
        uuid: me.uuid,
        roles: ["PREMIUM"]
      }
      
      submitPremiumUserData(params)
      localStorage.removeItem('order')
      localStorage.removeItem('__paypal_storage__')
      localStorage.removeItem('orderDetails')
    }
  }

  useEffect(() => {
    // router.push("/accountedit");
  }, [succeeded])

  return (
    <div className="">
      <PayPalButtons
        style={{
          color: 'blue',
          shape: 'rect',
          label: 'pay',
          tagline: false,
          layout: 'horizontal',
          height: 44,
        }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
      {succeeded && <span className="text-green-700">Payment Success!</span>}
      {error && <span className="text-xs text-red-700">{error}</span>}
    </div>
  )
}

export default ReactPayPal
