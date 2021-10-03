import React from "react";
import "../css/home.css";
import gradedeere from "../images/gradedeere3.png";
import { Link } from "react-router-dom";

const Testimage = () => {
  return (
    <div class="container-aux">
      <div class="row-aux">
        <div class="col-lg-4-aux">
          <h3>Schedule Lines Report</h3>
          <Link to="/filterschedules">
            <div class="card-aux p-0-aux">
              <div class="card-image-aux">
                <img src={gradedeere} alt="Deere" />
              </div>
              <div class="card-content-aux d-flex-aux flex-column-aux align-items-center-aux">
                <h4 class="pt-2-aux">Search Schedule Lines</h4>
                <h5><br/>Click to Access</h5>
                <ul class="social-icons-aux d-flex-aux justify-content-center-aux"></ul>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Testimage;
