import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layouts from "../components/Layouts";

const HomePage = () => {
  // Store data
  const [artwork, setArtwork] = useState([]);
  // Define how to fetch data
  const fetchArtwork = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/details`);
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
    <Layouts>
      <h1>All Artworks</h1>
      {artwork.map((eachArt) => (
        <Link key={eachArt._id} to={`/recipes/`}>
          {eachArt.title}
        </Link>
      ))}
    </Layouts>
  );
};

export default HomePage;
