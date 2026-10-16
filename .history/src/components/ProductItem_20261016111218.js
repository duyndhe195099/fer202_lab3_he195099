import { Link } from "react-router-dom";

export const formatPrice = (price) => price.toLocaleString("vi-VN") + "đ";

// Mỗi sản phẩm là 1 dòng của bảng
function ProductItem({ product }) {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{formatPrice(product.price)}</td>
      <td>
        <Link to={`/products/${product.id}`} className="btn outline">Chi tiết</Link>
      </td>
    </tr>
  );
}

export default ProductItem;
