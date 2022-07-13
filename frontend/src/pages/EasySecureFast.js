import React from 'react'

const EasySecureFast = () => {
  return (
    <div className="rk-flex-row-wrap">
        <div style={{marginBottom:"10px"}}>
            <h2>Easy Shopping</h2>
            <i className="fas fa-store" style={{fontSize:"2rem"}}></i>
            <p>Time is money and we value your time. Save it as you shop with us. We take care of your worries while you take care of your loved ones.</p>
        </div>
        <div style={{marginBottom:"10px"}}>
            <h2>Secure Payment</h2>
            <i className="fas fa-credit-card" style={{fontSize:"2rem"}}></i>  
            <p>Your purchase with us is safe and secure. We use only encrypted and secure payment gateways on our site.</p>
      </div>
      <div style={{marginBottom:"10px"}}>
            <h2>On Time Delivery</h2>
            <i className="fas fa-shipping-fast" style={{fontSize:"2rem"}}></i>
            <p>We are committed to deliver your purchase on time. However we do not over commit ourselves. Our delivery persons are humans and they love your pets.</p>
      </div>
    </div>
  )
}

export default EasySecureFast
