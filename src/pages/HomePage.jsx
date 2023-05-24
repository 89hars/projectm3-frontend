import Layouts from "../components/Layouts";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const navigate = useNavigate();
  return (
    <Layouts isHomePage={isHomePage}>
      <div className="col-md-6">
        <h1 className="d-flex align-items-center justify-content-center mainname"> Welcome to the world of arts... </h1>
        <p className="maincaption text-center">Discover a World of Artistic Inspiration at Our  Gallery</p>
        <button className="btnHome btn-outline-secondary btn text-dark" onClick={() => { navigate('/allproducts') }} >View All Products</button>

      </div>
      <div className="col-md-6 imgmain">


      </div>



    </Layouts>
  );
};

export default HomePage;