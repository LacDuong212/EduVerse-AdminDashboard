"use client"; 

import { Button } from 'react-bootstrap';
import Image from 'next/image'; 

const InstructorList = ({ instructorsData, isLoading, onBlock, onUnblock }) => {

  return <div className="table-responsive border-0">
    <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
      <thead>
        <tr>
          <th scope="col" className="border-0 rounded-start">
            Instructor name
          </th>
          <th scope="col" className="border-0">
            Email
          </th>
          <th scope="col" className="border-0">
            Join date
          </th>
          <th scope="col" className="border-0">
            Last updated
          </th>
          <th scope="col" className="border-0">
            Activated
          </th>
          <th scope="col" className="border-0 rounded-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          // SỬA Ở ĐÂY: <td> dính liền với <tr>
          <tr><td colSpan={6} className="text-center">Loading...</td></tr>
        ) : instructorsData && instructorsData.length > 0 ? (
          instructorsData.map((item) => (
            <tr key={item._id}>
              {/* SỬA Ở ĐÂY: <td> đầu tiên dính liền với <tr> */}
              <td>
                <div className="d-flex align-items-center position-relative">
                  <div className="avatar avatar-md">
                    {item?.pfpImg ? (
                      <Image 
                        src={item.pfpImg}
                        className="rounded-circle"
                        alt={'avatar'}
                        width={40} 
                        height={40}
                        style={{ objectFit: 'cover' }} 
                      />
                      ) : (
                      <div className="avatar-img rounded-circle border-white border-3 shadow d-flex align-items-center justify-content-center bg-light text-dark fw-bold fs-4">
                        {(item?.name?.[0] || "U").toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="mb-0 ms-3">
                    <h6 className="mb-0">
                      {item.name}
                    </h6>
                  </div>
                </div>
              </td>
              {/* SỬA Ở ĐÂY: Các <td> sau dính liền với </td> trước đó */}
              <td>
                {item.email}
              </td>
              <td>
                &nbsp;{
                  new Date(item.createdAt).toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })
                }
              </td>
              <td>
                &nbsp;{
                  new Date(item.updatedAt).toLocaleString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })
                }
              </td>
              <td>
                <span className={`badge text-bg-${item.isActivated ? 'success' : 'warning'}`}>
                  {item.isActivated ? 'Yes' : 'No'}
                </span>
              </td>
              {
                item.isActivated
                  ? <td>
                    <Button variant="warning-soft" size="sm" className="me-1 mb-1 mb-md-0" onClick={() => onBlock(item._id)}>
                      Block
                    </Button>
                  </td>
                  : <td>
                    <Button variant="success-soft" size="sm" className="me-1 mb-1 mb-md-0" onClick={() => onUnblock(item._id)}>
                      UnBlock
                    </Button>
                  </td>
              }
            </tr>
          ))
        ) : (
          // SỬA Ở ĐÂY: <td> dính liền với <tr>
          <tr><td colSpan={6} className="text-center">No instructors found.</td></tr>
        )}
      </tbody>
    </table>
  </div>;
};
export default InstructorList;