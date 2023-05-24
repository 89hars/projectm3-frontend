import React, { useState, useEffect, useContext } from 'react'
import Layouts from '../components/Layouts'
import { CartContext } from '../contexts/CartContext'
import { useNavigate, Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { SessionContext } from '../contexts/SessionContext';

function CartPage() {
    const navigate = useNavigate();
    const { cart, setCart } = useContext(CartContext);
    const { token } = useContext(SessionContext);
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");

    //new code
    const [products, setProducts] = useState([]);

    const fetchProductsFromCart = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/cart`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                const parsed = await response.json();

                let productsformat = parsed
                    .filter((c) => {
                        return c.product?._id;
                    })
                    .map((c) => {
                        let prodFormat = { ...c.product, cartId: c._id };
                        return prodFormat;
                    });

                setCart(productsformat);
                setProducts(productsformat);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProductFromCart = async (cartId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API}/cart/${cartId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                setProducts((prevProducts) => {
                    let result = prevProducts.filter(
                        (product) => product.cartId !== cartId
                    );
                    setCart(result);
                    return result;
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteMyCart = async () => {
        try {
            await fetch(
                `${import.meta.env.VITE_API}/cart`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

        } catch (error) {
            console.log(error);
        }
    };

    const getTotalPrice = () => {
        try {
            if (products.length > 0) {
                let total = 0;
                products.forEach((item) => {
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

    const getToken = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API}/details/braintree/token`
            );
            if (response.ok) {
                const data = await response.json();
                setClientToken(data.clientToken);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToken();
        fetchProductsFromCart();
    }, []);

    const handlePayment = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await fetch(
                `${import.meta.env.VITE_API}/details/braintree/payment`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nonce, cart }),
                }
            );
            deleteMyCart()
            setCart([]);
            navigate("/profile?payment=success");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layouts>
            <div className="container">
                <div className="row my-5">
                    <div className="col-md-8">
                        <h3 className="">{`Your cart contains ${cart.length} products`}</h3>
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Title & description</th>
                                    <th scope="col">Price</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index + product._id}>
                                        <td style={{ width: 120 }}>
                                            <img
                                                src={product.media[0]?.link}
                                                alt="someStuff"
                                                width={100}
                                            />
                                        </td>
                                        <td>
                                            <div className="fw-bold">{product.title}</div>
                                            <div>{product.description}</div>
                                        </td>
                                        <td className="fw-bold text-end">{`$${product.price}`}</td>
                                        <td className="text-end">
                                            <div className=" d-flex align-items-center justify-content-center h-100">
                                                <button
                                                    onClick={() => deleteProductFromCart(product.cartId)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="col-md-4">
                        <div className="card p-3 bg-light border-0">
                            <div className="card-body">
                                <h3>Cart Summary</h3>
                                <p>Total | Checkout | Payment</p>
                                <hr />
                                <h4>{getTotalPrice()}</h4>
                                {clientToken && (
                                    <div className="mt-2">
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault",
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />
                                        <div className="text-end">
                                            <button
                                                className="btn btn-primary"
                                                onClick={handlePayment}
                                            >
                                                Make Payment
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layouts>
    );
}

export default CartPage;
