import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="card notfound">
      <h1>404 - Không tìm thấy trang</h1>
      <p>Trang bạn đang tìm kiếm không tồn tại.</p>
      <Link to="/" className="btn">Về trang chủ</Link>
    </div>
  );
}

export default NotFound;
