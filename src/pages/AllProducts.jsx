import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layouts from "../components/Layouts";
import { CartContext } from '../contexts/CartContext'
import { SessionContext } from "../contexts/SessionContext";

const Allproducts = () => {
  // Store process
  const [artwork, setArtwork] = useState([]);
  const { cart, setCart } = useContext(CartContext)
  const { user, search } = useContext(SessionContext);
  // Define how to fetch data
  const fetchArtwork = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/details/allproducts`
      );
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
    <div className="product-page">
      <Layouts>

        {artwork ? (
          <div className="mt-5 row">

            {artwork.filter((element) => {
              if (element.title.toLowerCase().includes(search.toLowerCase())) {
                return element

              }

            }).map((eachArt) => (
              <div key={eachArt._id} className="col-md-4">
                <div className="col-md-6">
                  <Link to={`/details/${eachArt._id}`} className="linkProduct">
                    <img src={eachArt?.media[0]?.link} alt="someStuff" />
                    {eachArt.title}
                  </Link>
                  <button className="submit-btn mt-2" onClick={async () => {
                    const newVar = await fetch(`http://localhost:5005/details/cart`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ userId: user._id, productId: eachArt._id, quantity: 1, price: eachArt.price }),
                    });
                    const parsed = await newVar.json();
                    console.log(parsed);
                    setCart([...cart, eachArt]);
                  }}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>) : (
          <div>nothing here</div>
        )}
      </Layouts>
    </div>
  );
};
export default Allproducts;
