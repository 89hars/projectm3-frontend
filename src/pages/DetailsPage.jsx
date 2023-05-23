import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layouts from "../components/Layouts";

// Here we handle the delete as buttons.

const DetailsPage = () => {
  const { artObjectId } = useParams();
  const [pieceOfArt, setPieceOfArt] = useState();

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
        <h5>Artist: {pieceOfArt.artist} </h5>
        <h5>Technic: {pieceOfArt.technic} </h5>
        <h5>Price: {pieceOfArt.price} </h5>
        <p> {pieceOfArt.description} </p>
      </div>
    </Layouts>
  ) : (
    <Layouts>
      <h1>Loading...</h1>
    </Layouts>
  );
};

export default DetailsPage;
