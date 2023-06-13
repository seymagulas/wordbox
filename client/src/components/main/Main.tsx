import * as React from "react";
import { Link } from 'react-router-dom';
import "./main.css";

const Main: React.FC = () => {
  return(
    <>
      <div className="mainContainer">
        <p>Welcome to WordBox</p>
        <Link to={'/word'} className="mainButton word">Words</Link>
        <Link to={'/quiz'} className="mainButton quiz">Quiz</Link>
      </div>
    </>
  );
};

export default Main;