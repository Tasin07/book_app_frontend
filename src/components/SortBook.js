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
	return (
		<Row style={{ width: "100%", padding: "0px 40px" }}>
			<Col span={16}>
				<Pagination
					current={currentValue}
					defaultCurrent={1}
					onChange={onChange}
					total={props.bookListLength}
					showSizeChanger={false}
					showQuickJumper
					showTotal={total => `Total ${total * 2} items`}
				/>
			</Col>

			<Col justify="end">
				<Button
					type="primary"
					onClick={e => props.clearSearch()}
					icon={<ClearOutlined />}
				>
					Clear Search
				</Button>
				<Select
					defaultValue="-- Sort Books --"
					align="right"
					style={{ width: 200, paddingLeft: "40px" }}
					onChange={v => handleSortChange(v)}
				>
					<Option value="highRated">Best Rated</Option>
					<Option value="lowPrice">Lowest price First</Option>
					<Option value="highPrice">Highest Price First</Option>
				</Select>
			</Col>
		</Row>
	);
}
