import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layouts from "../components/Layouts";

const Allproducts = () => {
  // Store data
  const [artwork, setArtwork] = useState([]);
  const handleAddCart = () => {};

  // fetch data
  const fetchArtwork = async () => {
    try {
      const response = await fetch(`http://localhost:5005/details/allproducts`);
      if (response.status === 200) {
        const parsed = await response.json();
        setArtwork(parsed);
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
        {artwork.map((eachArt) => (
          <>
            <Link key={eachArt._id} to={`/details/${eachArt._id}`}>
              {eachArt.title}
            </Link>
            <button onClick={handleAddCart}>Add to cart </button>
          </>
        ))}
      </Layouts>
    </div>
  );
};

export default Allproducts;
