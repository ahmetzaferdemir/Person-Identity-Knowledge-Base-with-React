import React from 'react'
import { useState } from 'react'

import noProfile from '../assets/noprofile.png'
import axios from 'axios';

function UpdateUser() {

  const [name, setName] = useState("");

  const [surname, setSurname] = useState("");
  
  const [age, setAge] = useState("");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("")

  const [address, setAddress] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [email, setEmail] = useState("");


  const parts = address.split(/[,/]/).map(part => part.trim());
  const updatedUser = {
    "picture" : {
      "large" : "src/assets/noprofile.png"
    },

    "name" : {
      "first" : name,
      "last" : surname
    },

    "dob" : {
      "age" : age
    },

    "login" : {
      "username" : username,
      "password" : password,
    },

    "location" : {
      "street" : {
        "number" : parts[3],
        "name" : parts[4]
      },

    "state" : parts[0],
    "city" : parts[1],
    "country" : parts[2]
  },

  "phone" : phoneNumber,

  "email" : email
  };

  const updateUser = () => {
    axios.get("http://localhost:3001/users")
    .then(response => {
      // Kullanıcıyı username ve password ile filtrele
      const user = response.data.find(user => 
        user.login.username === username && user.login.password === password
      );

      if (user) {
        // Mevcut kullanıcı verilerini al
        const updatedUserData = {
          ...user, // Mevcut kullanıcı verilerini korur
          ...updatedUser // Yalnızca değiştirmek istediğiniz yeni veriler
        };

        // Kullanıcıyı güncelle
        axios.patch(`http://localhost:3001/users/${user.id}`, updatedUserData)
          .then(response => {
            console.log("User updated:", response.data);
            alert("User updated!");

            setName("");
            setSurname("");
            setAge(0);
            setUsername("");
            setPassword("");
            setAddress("");
            setPhoneNumber(0);
            setEmail("")
          })
          .catch(error => {
            console.error("Error updating user:", error);
            alert("User didn't update!");
          });
      } else {
        console.log("User not found.");
        alert("User not found!");
      }
    })
    .catch(error => {
      console.error("Error fetching users:", error);
    });
  }
  
  return (
    <div className="container">
      <div className="row g-5 mt-5 mx-auto my-auto">
        <h1 className='h1 py-2 px-5'>Update User</h1>
        <div className="col-sm-12 col-md-5">
          <div className="form-control p-3">

            <label className='fw-bold'>Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)}/>

            <label className='fw-bold mt-3'>Surname</label>
            <input type="text" className="form-control" value={surname} onChange={(e) => setSurname(e.target.value)}/>

            <label className='fw-bold mt-3'>Age</label>
            <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)}/>

            <label className='fw-bold mt-3'>Username</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}/>

            <label className='fw-bold mt-3'>Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <label className='fw-bold mt-3'>Address</label>
            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)}/>

            <label className='fw-bold mt-3'>Phone Number</label>
            <input type="number" className="form-control" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>

            <label className='fw-bold mt-3'>E-mail</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <div className='text-end'>
              <button className="btn btn-outline-warning mt-3" onClick={updateUser}>Update</button>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-7">
          <div className="card p-3">
            <div className="row g-4">
              <div className="col-sm-12 col-md-4">
                  <img src={noProfile} alt="random people" className="w-100 rounded d-block mx-auto"/>
              </div>
              
              <div className="col-sm-12 col-md-8">
                <div className="nameSurnameAge bg-light rounded">
                    <h2 className='h2 p-2 border-bottom'>{name +" "+ surname || "John Doe"} <span className='text-muted fst-italic fs-5'> {age || `${32}`}</span></h2>
                </div>

                <div className="row userInfo bg-warning rounded">
                    <div className="col userName">
                      Username <br /> <span className='p-1 text-muted fst-italic'>{username || "johndoe132"}</span>
                    </div>
                    <div className="col uId">
                      uId <br /> <span className='p-1 text-muted fst-italic'>Zl2f3Etz</span>
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
  )
}

export default UpdateUser