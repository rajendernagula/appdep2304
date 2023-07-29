import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

import TopNvgtion from "./TopNvgtion";
// import Home from "./component/Home";

function Home() {
  let loc = useLocation();

  let navigate = useNavigate();

  let deleteUserData = async () => {
    let reqOptions = {
      method: "DELETE",
    };

    let url = `/deleteUser?id=${loc.state._id}`;
    console.log(url);

    let JSONData = await fetch(url, reqOptions);

    let JSOData = await JSONData.json();
    console.log(JSOData);

    if (JSOData.status == "success") {
      navigate("/");
    }
  };
  return (
    <div className="App">
      <TopNvgtion userDetails={loc.state} />
      <button
        type="button"
        onClick={() => {
          deleteUserData();
        }}
      >
        Deletete Account
      </button>
      <div className="block">
        <img src={`/${loc.state.profile}`}></img>
        <h1>Name : {loc.state.firstname}</h1>
        <h1>Age : {loc.state.age}</h1>
        <h1>Contact : {loc.state.contact}</h1>
      </div>
    </div>
  );
}

export default Home;
