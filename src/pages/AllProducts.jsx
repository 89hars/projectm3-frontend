import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layouts from "../components/Layouts";
import { CartContext } from "../contexts/CartContext";
import { SessionContext } from "../contexts/SessionContext";
import Search from "../components/Search";

const Allproducts = () => {
  // Store process
  const [artwork, setArtwork] = useState([]);
  const { cart, setCart } = useContext(CartContext);
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
    <div>
      <Layouts>
        <div className="container py-5">
          <div className="row">
            <div className="col-8">
              <div>
                <h1>All Products</h1>
              </div>
            </div>
            <div className="col-4">
              <Search />
            </div>
          </div>
        </div>

        <div className="container py-5">
          <div className="row">
            <div className="col-4"></div>
          </div>
        </div>

        <div className="container">
          {artwork ? (
            <div className="row">
              {artwork
                .filter((element) => {
                  if (
                    element.title.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return element;
                  }
                })
                .map((eachArt) => (
                  <div className="col-4" key={eachArt._id}>
                    <div className="card">
                      <img
                        src={eachArt?.media[0]?.link}
                        alt={eachArt.title}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <Link
                          className="card-title"
                          to={`/details/${eachArt._id}`}
                        >
                          {eachArt.title}
                        </Link>
                        <p className="card-text">{eachArt.artist}</p>
                        <p className="card-text">{eachArt.price}</p>
                        <button
                          className="btn btn-primary"
                          onClick={async () => {
                            const newVar = await fetch(
                              `http://localhost:5005/details/cart`,
                              {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  userId: user._id,
                                  productId: eachArt._id,
                                  quantity: 1,
                                  price: eachArt.price,
                                }),
                              }
                            );
                            const parsed = await newVar.json();
                            console.log(parsed);
                            setCart([...cart, eachArt]);
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    <p></p>
                  </div>
                ))}
            </div>
          ) : (
            <div>nothing here</div>
          )}
        </div>
      </Layouts>
    </div>
  );
};
export default Allproducts;
