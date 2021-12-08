import React from "react";
import '../styles/Admin.css'

function FeeStructure() {
  return (
    <>
      <div>
        <button
          type="button"
          class="btn btn-light"
          data-toggle="modal"
          data-target="#myModal1"
        >
          fees structure <i class="fas fa-edit"></i>
        </button>

        <div
          class="modal fade"
          id="myModal1"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content">
              <div class="first_div">
                <div class="second_div ">
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                  {/* <!-- <div>
            <img src="logo.png" alt="logo ssism" class="logo_img" > <br />
        </div> --> */}
                  <form>
                    <div className=" mb-3 ">
                      <select
                        name="Stream"
                        class=" fields form-select "
                        id="inputGroupSelect03"
                      >
                        <option selected>Stream</option>
                        <option value="1">Bca</option>
                        <option value="2">BBA</option>
                        <option value="3">ba(CA)</option>
                        <option value="4">BSC(bt)</option>
                        <option value="5">BSC(micro)</option>
                        <option value="6">B.com(CA)</option>
                        <option value="7">MEG(diploma)</option>
                        <option value="8">BEG (diploma)</option>
                      </select>

                      <input
                        name="Starting year"
                        type="text"
                        className="form-control mb-2 "
                        placeholder="Starting year"
                      />
                      <input
                        name="Ending year"
                        type="text"
                        className="form-control mb-2 "
                        placeholder="Ending year"
                      />
                      <input
                        name="Total fees"
                        type="number"
                        className="form-control mb-2 "
                        placeholder="Total fees"
                      />
                    </div>

                    <button
                      class=" submit_btn w-100 mt-2 btn btn-md text-light font-weight-bold"
                      type="submit"
                    >
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeeStructure;
