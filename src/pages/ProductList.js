import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductItem from "../components/ProductItem";
import Pagination from "../components/Pagination";

const PAGE_SIZE = 3;

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();


  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    []
  );


  const filteredProducts = useMemo(() => {
    const result = products.filter(
      (p) =>
        p.name.toLowerCase().includes(keyword.toLowerCase()) &&
        (category === "" || p.category === category)
    );
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [keyword, category, sort]);

  const totalProducts = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const displayProducts = filteredProducts.slice(start, start + PAGE_SIZE);

 
  function updateParams(changes) {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === "" || value === null) next.delete(key);
      else next.set(key, String(value));
    });
    setSearchParams(next);
  }


  const handleSearch = (value) => updateParams({ keyword: value, page: 1 });
  const handleCategory = (value) => updateParams({ category: value, page: 1 });
  const handleSort = (e) => updateParams({ sort: e.target.value, page: 1 });
  const handlePage = (p) => updateParams({ page: p });

  return (
    <div className="card">
            <div className="toolbar">
        <SearchBar keyword={keyword} onSearch={handleSearch} />
        <CategoryFilter categories={categories} value={category} onChange={handleCategory} />
        <select value={sort} onChange={handleSort}>
          <option value="">Sắp xếp: Mặc định</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
        </select>
      </div>

      <div className="summary">
        <span>Tổng: {totalProducts} &nbsp;|&nbsp; Trang: {currentPage}/{totalPages}</span>
      </div>

      {displayProducts.length === 0 ? (
        <p className="empty">Không tìm thấy sản phẩm nào.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {displayProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePage}
      />
    </div>
  );
}

export default ProductList;
