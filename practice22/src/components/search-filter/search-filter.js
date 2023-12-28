import {Card, Input} from "antd";
import {UserOutlined} from '@ant-design/icons';
import SearchFilterButtons from "../search-filter-buttons/search-filter-buttons";
import './search-filter.css';
import {Component} from "react";

const {Search} = Input;

class SearchFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
    }

    onSearch = (value) => {
        const term = value;
        this.setState({term});
        this.props.onSearch(term);
    }

    render() {
        return (
            <Card style={{background: '#bae0ff'}}>
                <Search
                    onChange={e => this.onSearch(e.target.value)}
                    placeholder="Search employee"
                    prefix={<UserOutlined/>}
                    enterButton
                />
                <div className="search-filter-buttons">
                    <SearchFilterButtons/>
                </div>
            </Card>
        );
    }

}

export default SearchFilter;