import React, { useState } from 'react'
import Layouts from '../components/Layouts'



function CartPage() {

    const [cart, setCart] = useState([])
    return (
        <Layouts>
            <div className='container'>
                <div className="row">
                    <div className="col-md-12" >
                        <h2 className='text-center bg-light p-2 mb-1'>Hello..</h2>
                        <h3 className='text-center'>{`Your cart contains ${cart.length} items`}</h3>

                    </div>
                </div>
                <div className="row">
                    <div className="col-md-9">
                        Cart Item</div>
                    <div className="col-md-3">Checkout | Payment</div>
                </div>

            </div>
        </Layouts>
    )
}

export default CartPage