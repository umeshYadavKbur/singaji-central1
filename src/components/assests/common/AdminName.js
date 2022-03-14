
const AdminName = () => {
    //     const [style , setStyle] = useState(false)
    //     const currentLocation = useLocation().pathname;
    //     if(currentLocation ===  "/account_admin_dashboard"){
    // setStyle(true)
    //     }
    //     else{
    //         setStyle(false)
    //     }

    var adminFullName = localStorage.getItem("user");;
    var details = []
    // ---------styled in index.css -----------
    details = adminFullName.split(' ');
    console.log(details[0])

    
    return (
        <div className="admin-name"  >
            {details[0]}
        </div>
    )
}

export default AdminName 