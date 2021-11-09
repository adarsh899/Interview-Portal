import { Typography } from '@mui/material';
import React from 'react';
import { Link } from "react-router-dom";
function Header() {
    return(
        <nav>
            <div className="div-header">
                <div className="heading">
                    <Link to="/"><Typography  variant="h5" >Interview Portal
                    </Typography></Link>
      </div>
          <div className="schedule">
           <Link to="/schedule" ><Typography  variant="h5" >Schedule Interview
                    </Typography></Link>
          </div>
          </div>
        </nav>
    )
}
export default Header;