import React from 'react'
import { useState } from 'react'

import axios from 'axios';

import noProfile from '../assets/noprofile.png'

function DeleteUser() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const deleteUser = () => {
  console.log(password)

    // Burada username ve password doğru şekilde alındığından emin olun
    
    axios.get("http://localhost:3001/users")
      .then(response => {
        // Gelen veriyi konsola yazdırarak kontrol et
        console.log("All users:", response.data);
  
        // Kullanıcıyı username ve password ile filtrele
        const user = response.data.find(user => 
          user.login.username === username && user.login.password === password
        );
  
        if (user) {
          // Kullanıcıyı silme isteği gönder
          axios.delete(`http://localhost:3001/users/${user.id}`)
            .then(response => {
              console.log("User deleted:", response.data);
              alert("User deleted!");

              setUsername("");
              setPassword("");
            })
            .catch(error => {
              console.error("Error deleting user:", error);
              alert("User didn't delete!");
            });
        } else {
          console.log("User not found.");
          alert("User not found!");
        }
      })
      .catch(error => {
        console.error("Error deleting users:", error);
      });
  };

  return (
  <div className="container">
      <div className="row g-5 mt-5 mx-auto my-auto">
        <h1 className='h1 py-2 px-5'>Delete User</h1>
        <div className="col-12 col-md-5">
          <div className="form-control p-3">
            <label className='fw-bold'>Username</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <label className='fw-bold mt-3'>Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className='text-end'>
              <button className="btn btn-outline-warning mt-3" onClick={deleteUser}>Delete</button>
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
                    <h2 className='h2 p-2 border-bottom'>John Doe <span className='text-muted fst-italic fs-5'>(32)</span></h2>
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
                        Address <br /> <span className='p-1 text-muted fst-italic'>"Poltavska, Zolochiv/Ukraine, 4908, Energetichna</span>
                    </div>
                </div>

                <div className="row mt-2 userInfo">
                    <div className="col phoneNumber">
                      Phone Number <br /> <span className='p-1 text-muted fst-italic'>(068) U92-0782</span>
                    </div>
                    <div className="col email">
                      Email <br /> <span className='p-1 text-muted fst-italic'>john.doe@example.com</span>
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

export default DeleteUser