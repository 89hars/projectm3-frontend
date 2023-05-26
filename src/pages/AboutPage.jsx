import React from "react";
import "bootstrap";
import Layouts from "../components/Layouts";

function AboutPage() {
  return (
    <Layouts>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-12"></div>
          <div>
            <h1>About</h1>
            <p>
              Welcome to ARRTI! Our carefully curated collection features a
              diverse range of art styles, mediums, and artists from around the
              world. From stunning paintings to exquisite sculptures, each piece
              in our gallery has been thoughtfully selected for its creativity,
              craftsmanship.
              <br></br>
              <br></br>
              We are dedicated to supporting talented artists and fostering a
              thriving artistic community. We work closely with emerging and
              established artists, providing them with a platform to showcase
              their creativity and reach a wider audience. Whether you're
              looking to enhance your home, office, or collection, we invite you
              to browse our gallery and experience the beauty and power of art.
              Visit us today and embark on a journey of artistic expression and
              discovery.
              <br></br>
              <br></br>
              ARRTI, the art of making you smile
            </p>
          </div>
        </div>
      </div>
    </Layouts>
  );
}

export default AboutPage;
