import React, { useState, useEffect, useContext } from 'react'
import Layouts from '../components/Layouts'
import { CartContext } from '../contexts/CartContext'
import { useNavigate, Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { SessionContext } from '../contexts/SessionContext';



function CartPage() {

    const { cart, setCart } = useContext(CartContext);
    const { isLoggedIn, user, token } = useContext(SessionContext);
    const [cartArt, setCartArt] = useState([]);
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    // const { artObjectId } = useParams();

    const fetchPieceOfArt = async () => {
        try {
            const response = await fetch(
                `http://localhost:5005/details/cart`
            );
            console.log(response);
            if (response.status === 200) {
                const parsed = await response.json();
                setCartArt(parsed);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPieceOfArt();
    }, []);

    const totalPrice = () => {
        try {
            if (cart && cart.length > 0) {
                let total = 0;
                cart.forEach((item) => {
                    total += item.price;
                });
                return total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                });
            } else {
                return "$0.00"; // Or any default value you prefer
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart);
        } catch (error) {
            console.log(error)
        }
    }

    const getToken = async () => {
        try {
            const response = await fetch(
                `http://localhost:5005/details/braintree/token`
            );
            if (response.ok) {
                const data = await response.json();
                console.log('data :', data)
                setClientToken(data.clientToken)

            }
            else { console.log('Failed to retrieve client token'); }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getToken()
    }, [isLoggedIn])

    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await await fetch(`http://localhost:5005/details/braintree/payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nonce, cart }),
            });
            setLoading(false)
            navigate('/profile')

        } catch (error) {
            console.log(error)

        }
    }
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
                        {cart?.map((eachArt, index) => (

                            <div className="row" key={index}>
                                <div className="col-md-8">Image</div>
                                <div className="col-md-4">

                                    <h4>{eachArt.title}</h4>
                                    <p>{eachArt.description}</p>
                                    <p> Price : {eachArt.price}</p>
                                    <button className='btn btn-danger' onClick={() => removeCartItem(eachArt._id)}>Remove</button>

                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="col-md-3 text-center">
                        <h3 >Cart Summary</h3>
                        <p >Total | Checkout | Payment</p>
                        <hr />
                        <h4 >Total:{totalPrice()}</h4>
                        {clientToken && (
                            <div className='mt-2'>
                                <DropIn
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: 'vault'
                                        }
                                    }}
                                    onInstance={instance => setInstance(instance)}
                                />
                                <button className='btn btn-primary' onClick={handlePayment} >
                                    Make Payment
                                </button>
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </Layouts>
    )
}

export default CartPage