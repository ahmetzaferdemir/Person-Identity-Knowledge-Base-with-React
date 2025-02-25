import React, { useEffect, useState } from 'react'
import '../css/component.css'
import axios from "axios";

import noProfile from '../assets/noprofile.png'

function GetUser() {

  const [image, setImage] = useState("")

  const [nameSurname, setNameSurname] = useState("");
  
  const [age, setAge] = useState();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [id, setId] = useState("");

  const [address, setAddress] = useState("");

  const [phoneNumber, setPhoneNumber] = useState();

  const [email, setEmail] = useState("");

  
  const URL = `http://localhost:3001/users`;

  const getUser = async () => {

    const response = await axios.get(URL);
    let foundUser = false; 

    for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].login.username === username && 
            response.data[i].login.password === password) {
            console.log(response.data[i]);
            foundUser = true; 

            setImage(response.data[i].picture.large)

            setNameSurname(response.data[i].name.first + " "+ response.data[i].name.last);

            setAge(response.data[i].dob.age)

            setId(response.data[i].login.salt);

            setAddress(response.data[i].location.state +"," 
              + response.data[i].location.city +"/"
              +response.data[i].location.country+"," +response.data[i].location.street.number+"," +response.data[i].location.street.name)

            setPhoneNumber(response.data[i].phone);

            setEmail(response.data[i].email)

            setPassword("")
            break; 
        }
    }

    if (!foundUser) {
        alert("Wrong username or password");
        setUsername("");
        setPassword("")
    }

};

  return (
    <>
    <div className="container">
      <div className="row g-5 mt-5 mx-auto my-auto">
        <h1 className='h1 py-2 px-5'>Get User</h1>
        <div className="col-sm-12 col-md-5">
          <div className="form-control p-3">
            <label className='fw-bold'>Username</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <label className='fw-bold mt-3'>Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className='text-end'>
              <button className="btn btn-outline-warning mt-3" onClick={getUser}>Get</button>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-7">
          <div className="card p-3">
            <div className="row g-4">
              <div className="col-sm-12 col-md-4">
                  <img src={image || noProfile} alt="random people" className="w-100 rounded d-block mx-auto"/>
              </div>

              <div className="col-sm-12 col-md-8">
                <div className="nameSurnameAge bg-light rounded">
                    <h2 className='h2 p-2 border-bottom'>{nameSurname || "John Doe"} <span className='text-muted fst-italic fs-5'> {age || "(32)"}</span></h2>
                </div>

                <div className="row userInfo bg-warning rounded">
                    <div className="col userName">
                      Username <br /> <span className='p-1 text-muted fst-italic'>{username || "johndoe132"}</span>
                    </div>
                    <div className="col uId">
                      uId <br /> <span className='p-1 text-muted fst-italic'>{id || "Zl2f3Etz"}</span>
                    </div>
                </div>

                <div className="address mt-2">
                    <div className="addresss">                  
                        Address <br /> <span className='p-1 text-muted fst-italic'>{address || "Poltavska, Zolochiv/Ukraine, 4908, Energetichna"}</span>
                    </div>
                </div>

                <div className="row mt-2 userInfo">
                    <div className="col phoneNumber">
                      Phone Number <br /> <span className='p-1 text-muted fst-italic'>{phoneNumber || "(068) U92-0782"}</span>
                    </div>
                    <div className="col email">
                      Email <br /> <span className='p-1 text-muted fst-italic'>{email || "john.doe@example.com"}</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default GetUser