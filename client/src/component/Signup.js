import React from "react";

import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let [profilePic, setprofilepic] = useState("./images/profile.jfif");

  let firstnameRef = useRef();
  let lastnameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();
  let ageRef = useRef();
  let contactRef = useRef();
  let profilePcRef = useRef();

  let SendSignUpToFormData = async () => {
    let DataToSend = new FormData();

    DataToSend.append("firstname", firstnameRef.current.value);
    DataToSend.append("lastname", lastnameRef.current.value);
    DataToSend.append("email", emailRef.current.value);
    DataToSend.append("password", passwordRef.current.value);
    DataToSend.append("age", ageRef.current.value);
    DataToSend.append("contact", contactRef.current.value);
    // DataToSend.append("profilepic",  profilePcRef.current.value);

    for (let i = 0; i < profilePcRef.current.files.length; i++) {
      DataToSend.append("profilepic", profilePcRef.current.files[i]);
    }

    let reqOptions = {
      method: "POST",
      body: DataToSend,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();
    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <div>
          <label>Firstname</label>
          <input ref={firstnameRef}></input>
        </div>
        <div>
          <label>Lastname</label>
          <input ref={lastnameRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordRef}></input>
        </div>

        <div>
          <label>Age</label>
          <input ref={ageRef}></input>
        </div>

        <div>
          <label>Contact</label>
          <input ref={contactRef}></input>
        </div>
        <div>
          <label>Profilepic</label>
          <input
            type="file"
            ref={profilePcRef}
            onChange={() => {
              let selectedFileURL = URL.createObjectURL(
                profilePcRef.current.files[0]
              );

              setprofilepic(selectedFileURL);
            }}
          ></input>
        </div>
        <div>
          <img src={profilePic} className="profilepreview"></img>
        </div>

        <button
          type="button"
          onClick={() => {
            SendSignUpToFormData();
          }}
        >
          FormData
        </button>
      </form>
      <div>
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
