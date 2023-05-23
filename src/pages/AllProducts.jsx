import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layouts from "../components/Layouts";
import { CartContext } from '../contexts/CartContext'


const Allproducts = () => {
  // Store data
  const [artwork, setArtwork] = useState([]);
  const { cart, setCart } = useContext(CartContext)
  // Define how to fetch data
  const fetchArtwork = async () => {
    try {
      const response = await fetch(`http://localhost:5005/details/allproducts`);
      if (response.status === 200) {
        const parsed = await response.json();
        setArtwork(parsed);
        console.log(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Fetch at the right time
  useEffect(() => {
    fetchArtwork();
  }, []);

  return (
    <div>
      <Layouts>
        <h1>All Artworks</h1>
        {artwork ? (
        <ul>
          {artwork.map((eachArt) => (
            <li key={eachArt._id}>
              <Link to={`/details/${eachArt._id}`}>
              <img src={eachArt?.media[0]?.link} alt="someStuff" />
                {eachArt.title}
              </Link>
              <button onClick={() => setCart([...cart, eachArt])}>Add to Cart</button>
            </li>
          ))}
        </ul>  ) : (
          <div>nothing here</div>
        )}
      </Layouts>
    </div>
  );
};
export default Allproducts;
