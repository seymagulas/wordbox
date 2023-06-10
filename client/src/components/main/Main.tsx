import * as React from "react";
import { Link } from 'react-router-dom';

const Main: React.FC = () => {
  return(
    <>
      <div>
        <p>Welcome to Main Page</p>
        <Link to={'/word'} className="btn btn-success">Word</Link>
      </div>
    </>
  );
};

export default Main;