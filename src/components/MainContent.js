import BookList from "./BookList";
import SearchBook from "./SearchBook";
import SortBook from "./SortBook";
import axios from "axios";
import { useState, useEffect } from "react";
import { notification } from "antd";
import "./MainContent.css";
import { Pagination } from "antd";

notification.config({
	placement: "bottomRight",
	bottom: 50,
	duration: 2,
	rtl: true
});

const BOOK_URL =
	"https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json";

export default function MainContent(props) {
	const [searchInput, setSearchInput] = useState("");
	const [booksList, setBooksList] = useState([]);
	const [filteredList, setFilteredBookList] = useState([]);
	const [cartList, setCartList] = useState([]);
	useEffect(async () => {
		var apiResult = await axios.get(BOOK_URL);
		console.log(apiResult);
		// apiResult.data.sort(
		// 	(a, b) => parseFloat(b.average_rating) - parseFloat(a.average_rating)
		// );
		setBooksList(apiResult.data);
		setFilteredBookList(apiResult.data);
	}, []);

	useEffect(() => {
		if (cartList.length !== 0) {
			props.updateCartCount(cartList.length);
			props.updateCart(cartList);
			openNotification();
		}
	}, [cartList]);

	const updateCartList = async val => {
		setCartList([...cartList, val]);
	};

	const updateSearchResults = input => {
		let filteredResult = booksList.filter(v => {
			let title = String(v.title).toLowerCase();
			return !input || title.includes(input.toLowerCase());
		});
		setSearchInput(input);
		setFilteredBookList(filteredResult);
	};

	const openNotification = () => {
		notification["success"]({
			message: "Added to cart successfully",
			bottom: 0
		});
	};

	const handleChange = value => {
		let sortedResult = [];
		if (value === "highRated") {
			sortedResult = booksList.sort(
				(a, b) => parseFloat(b.average_rating) - parseFloat(a.average_rating)
			);
		}
		if (value === "lowPrice") {
			sortedResult = booksList.sort(
				(a, b) => parseFloat(a.price) - parseFloat(b.price)
			);
		}
		if (value === "highPrice") {
			sortedResult = booksList.sort(
				(a, b) => parseFloat(b.price) - parseFloat(a.price)
			);
		}
		setFilteredBookList([...sortedResult]);
	};

	return (
		<div>
			<SearchBook
				searchInput={searchInput}
				onInputChange={updateSearchResults}
			/>
			<SortBook
				handleChange={handleChange}
				bookListLength={filteredList.length / 20}
			/>
			<BookList
				className="book-list-style"
				bookList={filteredList}
				addToCart={updateCartList}
			/>
		</div>
	);
}
