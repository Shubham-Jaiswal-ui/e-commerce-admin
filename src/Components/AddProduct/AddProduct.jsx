import "./AddProduct.css";
import upload_area_image from "../../Assets/upload_area.svg";
import { useState } from "react";

const AddProduct = () => {
	const [image, setImage] = useState(false);
	const [productDetails, setProductDetails] = useState({
		name: "",
		image: "",
		category: "women",
		new_price: "",
		old_price: "",
	});

	const changeHandler = (e) => {
		setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
	};

	const Add_Product = async () => {
		console.log(productDetails);
		let responseData;
		let product = productDetails;
		let formData = new FormData();
		formData.append("product", image);

		await fetch("http://localhost:4000/upload", {
			method: "post",
			headers: {
				Accept: "Application/json",
			},
			body: formData,
		})
			.then((resp) => resp.json())
			.then((data) => {
				responseData = data;
			});

		if (responseData.success) {
			product.image = responseData.image_url;
			console.log(product);
			await fetch("http://localhost:4000/addproduct", {
				method: "post",
				headers: {
					Accept: "Application/json",
					"Content-Type": "Application/json",
				},
				body: JSON.stringify(product),
			})
				.then((resp) => resp.json())
				.then((data) => {
					data.success ? alert("Product Added") : alert("Failed");
				});
		}
	};

	const imageHandler = (e) => {
		setImage(e.target.files[0]);
	};
	return (
		<div className="addproduct">
			<div className="addproduct-itemfield">
				<p>Product title</p>
				<input
					value={productDetails.name}
					onChange={changeHandler}
					type="text"
					name="name"
					placeholder="Type here"
				/>
			</div>
			<div className="addproduct-price">
				<div className="addproduct-itemfield">
					<p>Price</p>
					<input
						value={productDetails.old_price}
						onChange={changeHandler}
						type="text"
						name="old_price"
						placeholder="Type here"
					/>
				</div>
				<div className="addproduct-itemfield">
					<p>Offer Price</p>
					<input
						value={productDetails.new_price}
						onChange={changeHandler}
						type="text"
						name="new_price"
						placeholder="Type here"
					/>
				</div>
			</div>
			<div className="addproduct-itemfield">
				<p>Product Category</p>
				<select
					value={productDetails.category}
					onChange={changeHandler}
					name="category"
					className="addproduct-selector"
				>
					<option value="women">Women</option>
					<option value="men">Men</option>
					<option value="kid">Kid</option>
				</select>
			</div>
			<div className="addproduct-itemfield">
				<label htmlFor="file-input">
					<img
						src={image ? URL.createObjectURL(image) : upload_area_image}
						alt=""
						className="addproduct-thumnail-img"
					/>
				</label>
				<input
					onChange={imageHandler}
					type="file"
					name="image"
					id="file-input"
					hidden
				/>
			</div>
			<button
				onClick={() => {
					Add_Product();
				}}
				className="addproduct-btn"
			>
				ADD
			</button>
		</div>
	);
};

export default AddProduct;
