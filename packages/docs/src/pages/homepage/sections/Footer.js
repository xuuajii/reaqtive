import React from "react";

export default function Footer() {
  return (
    <section id="footer" className="parallax pt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-2 mx-2">
            <p>METHODOLOGY</p>
            <ul>
              <li><a>Basket definition</a></li>
              <li><a>Data Integration</a></li>
              <li><a>Calculation rules</a></li>
            </ul>
          </div>
          <div className="col-md-2 mx-2">
            <p>DATA SOURCES</p>
            <ul>
              <li><a>Private</a></li>
              <li><a>Fleet By Dealer</a></li>
              <li><a>Long Term Rental</a></li>
              <li><a>TCO & Residual Value</a></li>
            </ul>
          </div>
          <div className="col-md-2 mx-2">
            <p>AD-HOC REPORTING </p>
            <li><a>Purchasing</a></li>
            <li><a>LTR & Leasing</a></li>
            <li><a>TCO & Residual Value</a></li>
          </div>
        </div>
      </div>
    </section>
  );
}
