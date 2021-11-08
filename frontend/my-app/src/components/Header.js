import React from 'react';
import { Link } from "react-router-dom";
function Header() {
    return(
        <nav>
            <div className="div-header">
                <div className="heading">
      <Link to="/"><h1>Interview Shcedule</h1></Link>
      </div>
          <div className="schedule">
           <Link to="/schedule" ><h3>Schedule Interview</h3></Link>
          </div>
          </div>
        </nav>
    )
}
export default Header;