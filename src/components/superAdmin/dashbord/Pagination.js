import React from 'react'

function Pagination() {
    return (
        <div>
            <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item "><a className="page-link text-secondary font-weight-bold" href="#">Previous</a></li>
          <li className="page-item "><a className="page-link text-secondary font-weight-bold" href="#">1</a></li>
          <li className="page-item "><a className="page-link text-secondary font-weight-bold" href="#">2</a></li>
          <li className="page-item "><a className="page-link text-secondary font-weight-bold" href="#">3</a></li>
          <li className="page-item "><a className="page-link text-secondary font-weight-bold" href="#">4</a></li>
          <li className="page-item "><a className="page-link text-secondary font-weight-bold" href="#"> 200-Next</a></li>
        </ul>
      </nav>
        </div>
    )
}

export default Pagination;
