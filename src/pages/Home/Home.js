import React from "react";
import "./Home.css";

import { Link, useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory();
  return (
    <div className="container">
      <div className="col">
        <div className="row">
          <ul className="options_ul">
            <li>
              {/* <Link className="">
                <h5>Add Todo List</h5>
              </Link> */}
              <button
              onClick={()=>{history.push('/login')}}
                type="button"
                className="btn btn-outline-warning btn-lg btn-block capitalize button-color-orange"
              >
                Add Todo List
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
