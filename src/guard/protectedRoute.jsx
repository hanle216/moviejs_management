import { Navigate } from "react-router-dom"

const ProtectedRoute =({children})=>{
    // children: component được truyền vào khi sử dụng ProtectedRoute
    // children là props đặc biệt của React, phải ghi đúng tên
    // lấy từ localStorgae xuống: convert string object => object
    const user = JSON.parse(localStorage.getItem("user"))
    // case 1: nếu chưa login -> redirect về trang auth
    if(!user || user.maLoaiNguoiDung !== "QuanTri" ){
        return <Navigate to="/auth"/>
    }
    return children
}
export default ProtectedRoute