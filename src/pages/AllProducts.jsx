import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layouts from "../components/Layouts";
import { CartContext } from "../contexts/CartContext";
import { SessionContext } from "../contexts/SessionContext";
import Search from "../components/Search";

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
    <div className="product-page bg-white">
      <Layouts>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-8">
              <div>
                <h1 className="text-primary">All Products</h1>
              </div>
            </div>
            <div className="col-4">
              <Search />
            </div>
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
                  <div className="col-3" key={eachArt._id}>
                    <div className="card border-0">
                      <div
                        className="card-img"
                        style={{
                          backgroundImage: `url(${eachArt?.media[0]?.link})`,
                        }}
                      >
                        {" "}
                      </div>

                      <div className="card-body">
                        <div className="card-text text-secondary  small">
                          {eachArt.artist}
                        </div>
                        <Link
                          className="card-title text-dark fs-4"
                          to={`/details/${eachArt._id}`}
                        >
                          {eachArt.title}
                        </Link>

                        <p className="card-text text-secondary">
                          ${eachArt.price}
                        </p>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => addProductToCart(eachArt)}
                        >
                          <i className="bi-cart"></i> Add to cart
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
