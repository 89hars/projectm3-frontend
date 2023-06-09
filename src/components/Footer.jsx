import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer border-top">
      <div className="container small">
        <div className="row justify-content-around">
          <div className="col-md-3 mb-4">
            <div className="h4 text-custom">Arrti</div>
            <div className="text-secondary">
              Unique pieces by small creator to make your interior great again.
            </div>
          </div>
          <div className="col-md-2  mb-4">
            <div className="h4  mb-3 text-custom">Quick links</div>
            <div>
              <Link to="/" className="text-primary">
                Home page
              </Link>
            </div>
            <div>
              <Link to="/allproducts" className="text-primary">
                All products
              </Link>
            </div>
            <div>
              <Link to="/about" className="text-primary">
                About
              </Link>
            </div>
            <div>
              <Link to="/contact" className="text-primary">
                Contact
              </Link>
            </div>
          </div>
          <div className="col-md-3  mb-4">
            <div className="h4 mb-3 text-custom">Our socials</div>
            <button className="btn btn-sm btn-primary me-2">
              <i className="bi bi-facebook"></i>
            </button>
            <button className="btn btn-sm btn-primary me-2">
              <i className="bi bi-instagram"></i>
            </button>
            <button className="btn btn-sm btn-primary me-2">
              <i className="bi bi-twitter"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
