import React, { useState, useEffect, useContext } from 'react'
import Layouts from '../components/Layouts'
import { CartContext } from '../contexts/CartContext'
import { useNavigate, Link } from "react-router-dom";



function CartPage() {

    const { cart, setCart } = useContext(CartContext)
    const navigate = useNavigate();
    // const { artObjectId } = useParams();
    const [cartArt, setCartArt] = useState();






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
            let total = 0;
            cart?.map((item) => {
                total = total + item.price
            })
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })
        } catch (error) {
            console.log(error)
        }
    }

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
                    </div>
                </div>

            </div>
        </Layouts>
    )
}

export default CartPage