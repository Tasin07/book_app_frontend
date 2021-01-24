import BookList from "./BookList";
import SearchBook from "./SearchBook";
import SortBook from "./SortBook";
import axios from "axios";
import { useState, useEffect } from "react";
import { notification } from "antd";
import "./MainContent.css";

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
	const [paginatedResult, setPaginatedResult] = useState([]);
	const [cartList, setCartList] = useState([]);
	useEffect(async () => {
		var apiResult = await axios.get(BOOK_URL);
		setBooksList(apiResult.data);
		console.log(apiResult.data.length);
		setFilteredBookList(apiResult.data);
		setPaginatedResult(apiResult.data.slice(0, 20));
	}, []);

	useEffect(() => {
		setPaginatedResult(filteredList.slice(0, 20));
	}, [filteredList]);

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

	const setPaginationValue = val => {
		let paginationResults = filteredList.slice(val * 20 - 20, val * 20);
		setPaginatedResult(paginationResults);
	};

	const handleChange = value => {
		let sortedResult = [];

		if (value === "highRated") {
			sortedResult = filteredList.sort(
				(a, b) => parseFloat(b.average_rating) - parseFloat(a.average_rating)
			);
		}
		if (value === "lowPrice") {
			sortedResult = filteredList.sort(
				(a, b) => parseFloat(a.price) - parseFloat(b.price)
			);
		}
		if (value === "highPrice") {
			sortedResult = filteredList.sort(
				(a, b) => parseFloat(b.price) - parseFloat(a.price)
			);
		}
		setFilteredBookList([...sortedResult]);
	};

	const clearSearch = () => {
		updateSearchResults("");
	};

	return (
		<div>
			<SearchBook
				searchInput={searchInput}
				onInputChange={updateSearchResults}
			/>
			<SortBook
				clearSearch={clearSearch}
				handleChange={handleChange}
				setPaginationValue={setPaginationValue}
				bookListLength={parseInt(filteredList.length / 2)}
			/>
			<BookList
				className="book-list-style"
				bookList={paginatedResult}
				addToCart={updateCartList}
			/>
		</div>
	);
}
