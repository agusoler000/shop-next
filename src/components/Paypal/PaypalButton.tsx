"use client"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData,CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { setTransactionIdToOrder } from "@/actions/payments/set-transaction-id";
import { paypalCheckPayment } from "@/actions/payments/paypal-check-payment";

interface Props{
    orderId:string;
    amount:number
}


export const PaypalButton = ({orderId,amount}:Props) => {
    const [{ isPending }] = usePayPalScriptReducer();
    if(isPending) return <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 bg-gray-300 rounded mt-2"></div>
      
        </div>

const rounderAamount =  Math.round(amount * 100) / 100;


const createOrder = async (data:CreateOrderData,actions:CreateOrderActions):Promise<string>=>{
    const transacionId = await actions.order.create({
        intent: 'CAPTURE',
        purchase_units:[
            {   
                invoice_id:orderId,
                amount:{
                    currency_code: 'EUR',
                    value: `${rounderAamount}`,
                    
                }
            }
        ]
    })
    console.log(transacionId,orderId);
    const {ok} = await setTransactionIdToOrder(orderId,transacionId)
    if(!ok){
        throw new Error('No se pudo actualizar el transactionId');
    }
    return transacionId;
}

const onApprove = async(data:OnApproveData, actions: OnApproveActions) =>{
    const details = await actions.order?.capture();
    if(!details)return;

    await paypalCheckPayment( details.id!);

}


  return (
    <div className="relative z-0">
        <PayPalButtons
         createOrder={createOrder}
         onApprove={onApprove}
         
        />
    </div>
  )
}
