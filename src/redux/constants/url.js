//main url in the application
// export const baseUrl = "https://singaji-central-server.herokuapp.com";
export const baseUrl = "http://localhost:5000";



export const loginUrl = "/api/login";

export const forgetPass = "/api/resetPasswordEmail";

const AllUrl = {
    // Register New student url
    newRegistraionUrl: `${baseUrl}/api/register`,

    // Fess structure related url 
    updateSchema: `${baseUrl}/api/update_schema`,
    createSchema: `${baseUrl}/api/create_schema`,
    allSchemaList: `${baseUrl}/api/list_schema`,
    activeMultipleSchema: `${baseUrl}/api/active_schema_multiple_selections`,
    activeSchema: `${baseUrl}/api/active_schema`,
    //_____________________________________

    //Admin related url
    createNewAdmin: `${baseUrl}/api/createNewAdmin`,
    infoAllAdmin: `${baseUrl}/api/infoOfAdmins`,
    allActiveStudent: `${baseUrl}/api/infoOfAllActiveStudents`,
    showFees: `${baseUrl}/api/show_fees/`,
    adminStatusChange: `${baseUrl}/api/deactive_or_activate_admin`,
    roleList: `${baseUrl}/api/role_list`,
    //_____________________________________


    //Student related url
    allRegistratedStudent: `${baseUrl}/api/registrated_student`,
    deleteStudent: `${baseUrl}/api/delete_cancel_student`,
    verifyStudent: `${baseUrl}/api/varify_student`,
    verifyStudentPaidUnpaid: `${baseUrl}/api/reg_fees_status`,
    addNewStudent: `${baseUrl}/api/register`,
    //_____________________________________

    //landing pages urls 
    login: `${baseUrl}/api/login`,
    registerNewStudent: `${baseUrl}/api/register`,
    forgotPassword: `${baseUrl}/api/resetPasswordLink/`, //new password
    resetPassword: `${baseUrl}/api/resetPasswordEmail`, //only email send
    //_____________________________________

    // helpers related url
    receiptGenerate: `${baseUrl}/api/generatingFeesRashid`,
    trackList: `${baseUrl}/api/track_list`,
    branchList: `${baseUrl}/api/list_branch`,
    villageNameList: `${baseUrl}/api/village_name`,
    villageNameById: `${baseUrl}/api//track_name/3`, // where 3 is an id of track
    uploadFile: `${baseUrl}/api/uploadFile`,
    //_____________________________________

}
export default AllUrl



