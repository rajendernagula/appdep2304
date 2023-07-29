import React from "react";

import { useNavigate } from "react-router-dom";

function TopNvgtion(props) {
  let navigate = useNavigate();

  return (
    <nav>
      <button
        type="button"
        onClick={() => {
          navigate("/edit", { state: props.userDetails });            
        }}
      >
        Edit Profile
      </button>
      <button
        type="button"
        onClick={() => {
          navigate("/");            
        }}
      >
        Lagout
      </button>
    </nav>
  );
}

export default TopNvgtion;
