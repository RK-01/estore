import React,{useState} from 'react'
import {useParams} from 'react-router-dom'

const PayNow = () => {
  const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'))
  
  return (
    <div>
      Pay Now 
      Payment Method : {paymentMethod}
    </div>
  )
}

export default PayNow
