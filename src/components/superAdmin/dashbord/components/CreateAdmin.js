import React, { useState } from "react";
import logo from "../../../assests/image/ssism_si.svg";
import Modal from "react-modal";
import "../styles/createAdmin.css";

function CreateAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button
        type="button"
        class="btn btn-light"
        data-toggle="modal"
        data-target="#myModal"
        onClick={toggleModal}
      >
        create admin <i class="fas fa-plus"></i>
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="first_div">
              <div className="second_div ">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={toggleModal}
                >
                  <span aria-hidden="true" className="white-text">
                    ×
                  </span>
                </button>
                <form onsubmit="{formik.handleSubmit}">
                  <div>
                    <img src={logo} alt="logo ssism" className="logo_img" />{" "}
                    <br />
                  </div>
                  <div classname=" mb-3 ">
                    <input
                      className="inputs"
                      name="email"
                      type="text"
                      classname=" "
                      placeholder="Email"
                    />
                    <input
                      className="inputs"
                      name="name"
                      type="text"
                      classname="  mt-2 mb-2"
                      placeholder="Name"
                    />
                    <select
                      name="role"
                      // onchange="{formik.handleChange}"
                      // value="{formik.values.role}"
                      className="fields form-select "
                      // id="inputGroupSelect02"
                    >
                      <option selected className="fields form-select">
                        Role
                      </option>
                      <option className="fields form-select" value={1}>
                        Super Admin
                      </option>
                      <option className="fields form-select" value={2}>
                        Admin
                      </option>
                      <option className="fields form-select" value={3}>
                        Student
                      </option>
                    </select>
                  </div>
                  <button
                    className=" submit_btn mt-2 w-100  btn-md  font-weight-bold"
                    type="submit"
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreateAdmin;
