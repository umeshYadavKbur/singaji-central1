import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import Edit_icon from '../../assests/image/Edit_icon.svg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/AddNewStudent.css'
function StudentProfile() {
    return (
        <div>
            <Accordion className="my-2" expanded={true} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{
                        backgroundColor: '#E6E9F4 ',borderBottom: '2px solid orange',maxHeight: "50px",minHeight: "50px"
                    }}
                >
                    <Typography style={{color: "#414c97",margin: "0px"}}><b> Personal Details</b></Typography>
                </AccordionSummary>
                <AccordionDetails style={{backgroundColor: '#F4F7FC',padding: '15px'}}>
                    <Typography component={'div'} >
                        {/* Personal Details */}

                     

                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default StudentProfile
