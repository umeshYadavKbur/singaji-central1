import React from "react"
import '../styles/AddNewStudent.css'

export  const TableCheckbox = React.forwardRef(
    ({indeterminate,...rest},ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        },[resolvedRef,indeterminate])

        return (
            <>
                <input type="checkbox"  ref={resolvedRef} {...rest} />
            </>
        )
    }
)