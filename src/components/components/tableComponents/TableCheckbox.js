import React from "react"
import '../styles/AddNewStudent.css'

export  const TableCheckbox = React.forwardRef(
    ({indeterminate,...rest},ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        },[resolvedRef,indeterminate])

        var test = {

            accentColor:'rgb(212 128 59)',
            // marginLeft: "10px"
          
          }
        return (
            <>
            <div style={test}>
            <input type="checkbox"  ref={resolvedRef} {...rest} />
            {/* <input type="checkbox" id="fruit1" name="fruit-1" value="Apple"/> */}
  {/* <label for="fruit1"></label> */}

            </div>
            </>
        )
    }
)