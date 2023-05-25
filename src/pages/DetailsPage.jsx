import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
      <section>
        <div className="container py-5">
          <h1 className="text-center text-primary">Product detail</h1>
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="card border-0 shadow">
              <div className="card-body p-5">
                <div className="row align-items-center justify">
                  <div className="col-lg-6 text-center">
                    <img
                      src={pieceOfArt.media[0].link}
                      alt={pieceOfArt.name}
                      className="detail-img mb-2"
                    />
                  </div>
                  <div className="col-lg-6 text-md-center text-lg-start">
                    <div>
                      <div className="text-secondary small">
                        <i className="bi bi-person-fill me-2"></i>
                        {pieceOfArt.artist}
                      </div>
                      <h1>{pieceOfArt.title}</h1>
                      <div className="text-secondary mb-2">
                        <i className="bi bi-chat-left-text me-2"></i>
                        {pieceOfArt.description}
                      </div>
                      <div className="text-secondary mb-2">
                        <i className="bi bi-droplet me-2"></i>
                        {pieceOfArt.technic}
                      </div>
                      <div>
                        <i className="bi bi-cash me-2"></i>${pieceOfArt.price}
                      </div>
                      <button
                        type="button"
                        onClick={addProductToCart}
                        className="btn btn-primary px-4 mt-4"
                      >
                        <i className="bi bi-cart"></i> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  ) : (
    <Layouts>
      <h1>Loading...</h1>
    </Layouts>
  );
};

export default DetailsPage;
