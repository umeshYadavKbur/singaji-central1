//main url in the application
export const baseUrl = "https://singaji-central-server.herokuapp.com";

export const loginUrl = "/api/login";

export const forgetPass = "/api/resetPasswordEmail";

const AllUrl ={
    verifyStudent: `${baseUrl}/api/varify_student`,
    verifyStudentPaidUnpaid: `${baseUrl}/api/reg_fees_status`,
    adminStatusChange: `${baseUrl}/api/deactive_or_activate_admin`
}
export default AllUrl

// export const newPasswordUrl = "/api/resetPasswordLink/";
