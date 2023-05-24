import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layouts from "../components/Layouts";
import { CartContext } from "../contexts/CartContext";
import { SessionContext } from "../contexts/SessionContext";

// Here we handle the delete as buttons.

const DetailsPage = () => {
  const { artObjectId } = useParams();
  const [pieceOfArt, setPieceOfArt] = useState();
  const { cart, setCart } = useContext(CartContext);
  const { token } = useContext(SessionContext);

  const fetchPieceOfArt = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/details/details/${artObjectId}`
      );

      if (response.status === 200) {
        const parsed = await response.json();
        setPieceOfArt(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addProductToCart = async () => {
    setCart([...cart, pieceOfArt]);
    try {
      const productId = pieceOfArt._id;
      await fetch(`${import.meta.env.VITE_API}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPieceOfArt();
  }, []);

  return pieceOfArt ? (
    <Layouts>
      <div className="details-page">
        <h1>{pieceOfArt.title} </h1>
        <img src={pieceOfArt.media[0].link} alt={pieceOfArt.name} />
        <h2>Artist: {pieceOfArt.artist} </h2>
        <h2>Technic: {pieceOfArt.technic} </h2>
        <h2>Price: {pieceOfArt.price} </h2>
        <p>Description: {pieceOfArt.description} </p>
        <button onClick={addProductToCart}>Add to Cart</button>
      </div>
    </Layouts>
  ) : (
    <Layouts>
      <h1>Loading...</h1>
    </Layouts>
  );
};

export default DetailsPage;
