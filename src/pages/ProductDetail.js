import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { formatPrice } from "../components/ProductItem";

function ProductDetail() {
  const { id } = useParams();          
  const navigate = useNavigate();     
  const product = products.find((p) => p.id === Number(id));

  const backButton = (
    <button className="btn outline" onClick={() => navigate("/products")}>
      Quay lại danh sách
    </button>
  );

  if (!product) {
    return (
      <div className="card">
        {backButton}
        <p className="empty">Không tìm thấy sản phẩm có ID = {id}.</p>
      </div>
    );
  }

  return (
    <div className="card">
      {backButton}
      <div className="detail">
        <div className="image">[ Ảnh sản phẩm ]</div>
        <div className="info">
          <h2>{product.name}</h2>
          <dl>
            <dt>ID</dt><dd>{product.id}</dd>
                        <dt>Danh mục</dt><dd>{product.category}</dd>
            <dt>Giá</dt><dd>{formatPrice(product.price)}</dd>
            <dt>Mô tả</dt><dd>{product.description}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
