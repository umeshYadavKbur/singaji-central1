import React from 'react';

function CreateAdmin() {
    return (
        <>
            <div>
                <button type="button" class="btn btn-light" data-toggle="modal" data-target="#myModal">create admin<i class="fas fa-plus"></i></button>
               

                <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered ">
                        <div class="modal-content">
                            <div class="first_div">
                                <div class="second_div ">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" class="white-text">&times;</span>
                                    </button>
                                    <form>
                                        <div>
                                            <img src="logo.png" alt="logo ssism" class="logo_img"/> <br />
                                        </div>

                                        <div className=" mb-3 ">
                                            <input name="email" type="text" className="form-control mb-2 " placeholder="Email" />
                                            <input name="name" type="text" className="form-control mb-2 " placeholder="Name" />

                                            <select name="role" class=" fields form-select " id="inputGroupSelect02">
                                                <option selected>Role</option>
                                                <option value="1">Super Admin</option>
                                                <option value="2">Admin</option>
                                                <option value="3">Student</option>
                                            </select>
                                        </div>

                                        <button class=" submit_btn w-100 mt-2 btn btn-md text-light font-weight-bold" type="submit">Create</button>
                                    </form>
                                </div>

                            </div>

                        </div>

                    </div>
                    </div>
                    </div>
                </>
                )
}

                export default CreateAdmin;
