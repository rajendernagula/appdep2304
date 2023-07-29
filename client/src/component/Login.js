import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRef } from "react";

function Login() {
  let emailRefInput = useRef();

  let passwordRefInput = useRef();

  let navigate = useNavigate();

  let validateCredential = async () => {
    let fd = new FormData();
    fd.append("email", emailRefInput.current.value);
    fd.append("password", passwordRefInput.current.value);

    let reqOptions = {
      method: "POST",
      body: fd,
    };

    let JSONData = await fetch("/validateLogin", reqOptions);

    let JSOData = await JSONData.json();

    if (JSOData.isLoggedIn == false) {
      alert(JSOData.msg);
    } else {
      navigate("/home", { state: JSOData.details });
    }

    // naviagate{}

    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <div>
          <label>Email</label>
          <input ref={emailRefInput}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordRefInput}></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              validateCredential();
            }}
          >
            Login
          </button>
        </div>
      </form>
      <div>
        <Link to="/signup">Signup</Link>
        <Link to="/test">Testing</Link>
      </div>
    </div>
  );
}

export default Login;
