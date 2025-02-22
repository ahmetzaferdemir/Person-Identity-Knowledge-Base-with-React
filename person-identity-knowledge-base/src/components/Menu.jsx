import React from 'react'
import '../css/component.css'

function Menu() {
  return (
    <div className="container-fluid bg-light border-bottom menuDiv">
        <div className="container">
        <button className="btn btn-secondary">
            Get User
        </button>

        <button className="btn btn-secondary">
            Create User
        </button>

        <button className="btn btn-secondary">
            Update User
        </button>

        <button className="btn btn-secondary">
            Delete User
        </button>
        </div>
    </div>
  )
}

export default Menu