import React from "react";

import { useRef, useState ,useEffect} from "react";
import { Link, useLocation } from "react-router-dom";

function EditProfile() {

  
  let [profilePic, setprofilepic] = useState("./images/profile.jfif");
  let loc = useLocation();
  console.log("Inside edit profile");
  console.log(loc.state);

  useEffect(() => {

    firstnameRef.current.value = loc.state.firstname;
    lastnameRef.current.value = loc.state.lastname;
    emailRef.current.value = loc.state.email;
    passwordRef.current.value = loc.state.password;
    ageRef.current.value = loc.state.age;
    contactRef.current.value = loc.state.contact;
    setprofilepic(`http://localhost:1111/${loc.state.profile}`);
  
  }, [])


  let firstnameRef = useRef();
  let lastnameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();
  let ageRef = useRef();
  let contactRef = useRef();
  let profilePcRef = useRef();

  let UpdateProfiledata = async () => {
    let DataToSend = new FormData();

    DataToSend.append("firstname", firstnameRef.current.value);
    DataToSend.append("lastname", lastnameRef.current.value);
    DataToSend.append("email", emailRef.current.value);
    DataToSend.append("password", passwordRef.current.value);
    DataToSend.append("age", ageRef.current.value);
    DataToSend.append("contact", contactRef.current.value);
    DataToSend.append("id", loc.state._id);
    // DataToSend.append("profilepic",  profilePcRef.current.value);

    for (let i = 0; i < profilePcRef.current.files.length; i++) {
      DataToSend.append("profilepic", profilePcRef.current.files[i]);
    }

    let reqOptions = {
      method: "PUT",
      body: DataToSend,
    };

    let JSONData = await fetch("http://localhost:1111/editprofile", reqOptions);

    let JSOData = await JSONData.json();
    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <h2>Edit Profile</h2>
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
            UpdateProfiledata();
          }}
        >
          UpdateProfile
        </button>
      </form>
      <div>
        <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default EditProfile;
