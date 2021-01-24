import { Select, Row, Col, Button } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import { setServers } from "dns";
import { useState } from "react";
const { Option } = Select;

export default function SortBook(props) {
	const [currentValue, setCurrentValue] = useState(1);
	const onChange = page => {
		setCurrentValue(page);
		props.setPaginationValue(page);
	};

	const handleSortChange = v => {
		props.handleChange(v);
		setCurrentValue(1);
	};

	let width = window.innerWidth;
	let paginationComponent = "";
	let clearButton = "";
	let sortButton = "";
	let styleChanges = "";
	if (width > 780) {
		styleChanges = {
			"margin-top": "10px"
		};
	}
	if (width > 1012) {
		paginationComponent = (
			<Pagination
				current={currentValue}
				defaultCurrent={1}
				onChange={onChange}
				total={props.bookListLength}
				showSizeChanger={false}
				showQuickJumper
				showTotal={total => `Total ${total * 2} items`}
			/>
		);
		clearButton = (
			<Button
				type="primary"
				onClick={e => props.clearSearch()}
				icon={<ClearOutlined />}
			>
				Clear Search
			</Button>
		);
		sortButton = (
			<Select
				small
				defaultValue="-- Sort Books --"
				align="right"
				style={{ width: 200, paddingLeft: "40px" }}
				onChange={v => handleSortChange(v)}
			>
				<Option value="highRated">Best Rated</Option>
				<Option value="lowPrice">Lowest price First</Option>
				<Option value="highPrice">Highest Price First</Option>
			</Select>
		);
	} else {
		paginationComponent = (
			<Pagination
				simple
				current={currentValue}
				defaultCurrent={1}
				onChange={onChange}
				total={props.bookListLength}
				showSizeChanger={false}
				showQuickJumper
				showTotal={total => `Total ${total * 2} items`}
			/>
		);
		clearButton = (
			<Button
				type="primary"
				onClick={e => props.clearSearch()}
				icon={<ClearOutlined />}
			></Button>
		);
		sortButton = (
			<Select
				small
				defaultValue="-- Sort Books --"
				align="right"
				style={{ width: 200, paddingLeft: "40px" }}
				onChange={v => handleSortChange(v)}
			>
				<Option value="highRated">Best Rated</Option>
				<Option value="lowPrice">Lowest price First</Option>
				<Option value="highPrice">Highest Price First</Option>
			</Select>
		);
	}

	return (
		<Row style={{ width: "100%", padding: "0px 35px" }}>
			<Col xs={24} sm={10} md={14} lg={16} xl={16}>
				{paginationComponent}
			</Col>
			<Col className={styleChanges} xs={4} sm={4} md={2} lg={4} xl={4}>
				{clearButton}
			</Col>
			<Col className={styleChanges} xs={20} sm={4} md={6} lg={4} xl={4}>
				{sortButton}
			</Col>
		</Row>
	);
}
