"use client"; // 1. Thêm "use client" vì component này chứa các trình xử lý sự kiện (onClick)

import { Button } from 'react-bootstrap';
import Image from 'next/image'; // 2. (Khuyến nghị) Dùng next/image

const StudentList = ({ studentsData, isLoading, onBlock, onUnblock, onDelete }) => {

  return <div className="table-responsive border-0">
    <table className="table table-dark-gray align-middle p-4 mb-0 table-hover">
      <thead>
        <tr>
          <th scope="col" className="border-0 rounded-start">
            Student name
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
            Verified
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
          // SỬA LỖI 1: <td> dính liền với <tr>
          <tr><td colSpan={7} className="text-center">Loading...</td></tr>
        ) : studentsData && studentsData.length > 0 ? (
          studentsData.map((item) => (
            // SỬA LỖI 2: <td> đầu tiên dính liền với <tr>
            <tr key={item._id}><td>
                <div className="d-flex align-items-center position-relative">
                  <div className="avatar avatar-md">
                    {item?.pfpImg ? (
                      // 2. Thay <img> bằng <Image> của Next.js
                      <Image 
                        src={item.pfpImg}
                        className="rounded-circle"
                        alt={'avatar'}
                        width={40} // Thêm width và height
                        height={40}
                        style={{ objectFit: 'cover' }} // Đảm bảo ảnh tròn
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
                <span className={`badge text-bg-${item.isVerified ? 'success' : 'warning'}`}>
                  {item.isVerified ? 'Yes' : 'No'}
                </span>
              </td>
              <td>
                <span className={`badge text-bg-${item.isActivated ? 'success' : 'warning'}`}>
                  {item.isActivated ? 'Yes' : 'No'}
                </span>
              </td>
              {/* Logic nút bấm giữ nguyên */}
              {item.isVerified
                ? (
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
                )
                : (
                  <td>
                    <Button variant="danger-soft" size="sm" className="me-1 mb-1 mb-md-0" onClick={() => onDelete(item._id)}>
                      Delete
                    </Button>
                  </td>
                )
              }
            </tr>
          ))
        ) : (
          // SỬA LỖI 3: <td> dính liền với <tr>
          <tr><td colSpan={7} className="text-center">No students found.</td></tr>
        )}
      </tbody>
    </table>
  </div>;
};
export default StudentList;