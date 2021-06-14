import React from "react";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
      <Router>
        <Link to="/" style={padding}>
          anecdotes
        </Link>
        <Link to="create" style={padding}>
          create new
        </Link>
        <Link to="about" style={padding}>
          about
        </Link>
      </Router>
  );
};

export default Menu;
