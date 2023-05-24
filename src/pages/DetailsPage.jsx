import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layouts from "../components/Layouts";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { SessionContext } from "../contexts/SessionContext";

// Here we handle the delete as buttons.

const DetailsPage = ({ item }) => {
  const navigate = useNavigate();
  const { artObjectId } = useParams();
  const [pieceOfArt, setPieceOfArt] = useState();
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(SessionContext);

  const fetchPieceOfArt = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/details/details/${artObjectId}`
      );

      if (response.status === 200) {
        const parsed = await response.json();
        setPieceOfArt(parsed);
        console.log(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToCart = async () => {
    console.log(user, pieceOfArt);
    const newVar = await fetch(`${import.meta.env.VITE_API}/details/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        productId: pieceOfArt._id,
        quantity: 1,
        price: pieceOfArt.price,
      }),
    });
    const parsed = await newVar.json();
    console.log(parsed);
    setCart([...cart, pieceOfArt]);
  };
  useEffect(() => {
    fetchPieceOfArt();
  }, []);

  useEffect(() => {
    console.log(pieceOfArt);
  }, [pieceOfArt]);

  return pieceOfArt ? (
    <Layouts>
      <div>
        <h1>{pieceOfArt.title} </h1>
        <img src={pieceOfArt.media[0].link} alt="someStuff" />
        <h2>Artist: {pieceOfArt.artist} </h2>
        <h2>Technic: {pieceOfArt.technic} </h2>
        <h2>Price: {pieceOfArt.price} </h2>
        <p>Description: {pieceOfArt.description} </p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </Layouts>
  ) : (
    <Layouts>
      <h1>Loading...</h1>
    </Layouts>
  );
};

export default DetailsPage;
