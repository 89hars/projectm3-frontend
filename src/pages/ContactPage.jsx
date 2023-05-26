import React from "react";
import Layouts from "../components/Layouts";

function ContactPage() {
  return (
    <Layouts>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <h1>Contact</h1>
            <div>
              <p>FakeStreet 3210</p>
              <p>14693 Berlin</p>
              <p>Open Monday until Friday</p>
              <p>From 11.00 until 18.00 hrs</p>
              <p>+49 (0)34 3167776</p>
              <p>fakeinfo@gmail.com</p>
            </div>
          </div>
          <div className="col-md-6">
            <h2>Send us a message</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Your Email</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="5"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </Layouts>
  );
}

export default ContactPage;