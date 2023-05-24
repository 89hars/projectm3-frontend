import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layouts from "../components/Layouts";
import { CartContext } from "../contexts/CartContext";
import { SessionContext } from "../contexts/SessionContext";

const Allproducts = () => {

  const [artwork, setArtwork] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const { token, search } = useContext(SessionContext);

  const fetchArtwork = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/details/allproducts`
      );
      if (response.status === 200) {
        const parsed = await response.json();
        setArtwork(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addProductToCart = async (product) => {
    setCart([...cart, product]);
    try {
      const productId = product._id;
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
    fetchArtwork();
  }, []);

  return (
    <div className="product-page">
      <Layouts>

        {artwork ? (
          <div className="mt-5 row">
            {artwork
              .filter((element) => {
                if (
                  element.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return element;
                }
              })
              .map((eachArt) => (
                <div key={eachArt._id} className="col-md-4">
                  <div className="col-md-6">
                    <Link to={`/details/${eachArt._id}`}>{eachArt.title}</Link>
                    <img className="imgallpro" src={eachArt?.media[0]?.link} alt={eachArt.title} />
                    <p></p>

                    <button className="submit-btn mt-2" onClick={() => addProductToCart(eachArt)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div>Nothing here</div>
        )}
      </Layouts>
    </div>
  );
};
export default Allproducts;
