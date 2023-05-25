import Layouts from "../components/Layouts";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <Layouts isHomePage={isHomePage}>
      <section>
        <div className="container py-5">
          <div className="row justify-content-between align-items-center py-5">
            <div className="col-6">
              <div>
                <h1>
                  Unique pieces by small creator to make your interior the
                  finest.
                </h1>
                <p className="text-secondary">
                  Join a community of hundreds of artists and buyers in the
                  world and make your art known or simply contribute to their
                  growth.
                </p>
                <Link
                  to="/allproducts"
                  className="btn btn-primary float-end px-4"
                >
                  Shop Now <i className="bi bi-arrow-right-short"></i>
                </Link>
              </div>
            </div>
            <div className="col-5">
              <img src="./Images/header.png" className="header-img" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container py-5">
          <div className="row">
            <div className="col-3">
              <div>
                <div className="icon-circle">
                  <i className="bi bi-person"></i>
                </div>
                <h4>Create an account</h4>
                <p className="small">
                  Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                  tempor consectetur
                </p>
              </div>
            </div>
            <div className="col-3">
              <div className="">
                <div className="icon-circle">
                  <i className="bi bi-cart-fill"></i>
                </div>
                <h4>Sell or Buy products</h4>
                <p className="small">
                  Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                  tempor consectetur
                </p>
              </div>
            </div>
            <div className="col-3">
              <div className="">
                <div className="icon-circle">
                  <i className="bi bi-credit-card"></i>
                </div>
                <h4>Make or Receive the payment</h4>
                <p className="small">
                  Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                  tempor consectetur
                </p>
              </div>
            </div>
            <div className="col-3">
              <div className="">
                <div className="icon-circle">
                  <i className="bi bi-heart"></i>
                </div>
                <h4>Enjoy your gain !</h4>
                <p className="small">
                  Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod
                  tempor consectetur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
};

export default HomePage;
