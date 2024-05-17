import { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../Assets/cross_icon.png";
const ListProduct = () => {
	const [allProducts, setAllProducts] = useState([]);

	const fetchInfo = async () => {
		await fetch("http://localhost:4000/allproducts")
			.then((res) => res.json())
			.then((data) => setAllProducts(data));
	};

	const removeProduct = async (id) => {
		await fetch("http://localhost:4000/removeproduct", {
			method: "delete",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json",
			},
			body: JSON.stringify({ id }),
		});
		await fetchInfo();
	};

	useEffect(() => {
		fetchInfo();
	}, []);
	return (
		<div className="listproduct">
			<h1>All Products List</h1>
			<div className="listproduct-format-main">
				<p>Product</p>
				<p>Title</p>
				<p>Old Price</p>
				<p>New Price</p>
				<p>Category</p>
				<p>Remove</p>
			</div>
			<div className="listproduct-allProducts">
				<hr />
				{allProducts.map((product, index) => {
					return (
						<>
							{" "}
							<div
								key={index}
								className="listproduct-format-main listproduct-format"
							>
								<img
									src={product.image}
									alt=""
									className="listproduct-product-icon"
								/>
								<p>{product.name}</p>
								<p>${product.old_price}</p>
								<p>${product.new_price}</p>
								<p>${product.category}</p>
								<img
									onClick={() => removeProduct(product.id)}
									src={cross_icon}
									alt=""
									className="listproduct-remove-icon"
								/>
							</div>
							<hr />
						</>
					);
				})}
			</div>
		</div>
	);
};

export default ListProduct;
