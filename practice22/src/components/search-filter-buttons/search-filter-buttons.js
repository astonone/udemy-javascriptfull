import {Radio} from 'antd';

const SearchFilterButtons = () => {
    return (
        <Radio.Group>
            <Radio.Button value="all">All employees</Radio.Button>
            <Radio.Button value="promotion">For promotion</Radio.Button>
            <Radio.Button value="gt">Salary greater than 1000$</Radio.Button>
        </Radio.Group>
    );
}

export default SearchFilterButtons;