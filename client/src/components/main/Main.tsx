import * as React from "react";
import NavBar from "./navbar/NavBar";

const Main: React.FC = () => {
  return(
    <>
      <NavBar />
      <div>
        <p>Welcome to Main Page</p>
      </div>
    </>
  );
};

export default Main;