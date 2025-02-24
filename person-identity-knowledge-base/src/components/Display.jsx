import React, { useState } from "react";
import GetUser from "./GetUser";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

function Display() {
  const [selectedComponent, setSelectedComponent] = useState("get");

  return (
    <>
      <div className="container-fluid bg-light border-bottom menuDiv">
        <div className="container">
          <button className="btn btn-secondary" onClick={() => setSelectedComponent("get")}>
            Get User
          </button>

          <button className="btn btn-secondary" onClick={() => setSelectedComponent("create")}>
            Create User
          </button>

          <button className="btn btn-secondary" onClick={() => setSelectedComponent("update")}>
            Update User
          </button>

          <button className="btn btn-secondary" onClick={() => setSelectedComponent("delete")}>
            Delete User
          </button>
        </div>
      </div>

        {selectedComponent === "get" && <GetUser />}
        {selectedComponent === "create" && <CreateUser />}
        {selectedComponent === "update" && <UpdateUser />}
        {selectedComponent === "delete" && <DeleteUser />}
    </>
  );
}

export default Display;
