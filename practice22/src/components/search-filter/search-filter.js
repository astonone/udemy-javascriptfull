import {Card, Input} from "antd";
import {UserOutlined} from '@ant-design/icons';
import SearchFilterButtons from "../search-filter-buttons/search-filter-buttons";
import './search-filter.css';

const SearchFilter = () => {
    return (
        <Card style={{background: '#bae0ff'}}>
            <Input placeholder="Search employee" prefix={<UserOutlined/>}/>
            <div className="search-filter-buttons">
                <SearchFilterButtons/>
            </div>
        </Card>
    );
}

export default SearchFilter;