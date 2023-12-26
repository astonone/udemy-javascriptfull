import {Avatar, Button, List} from 'antd';
import {DeleteOutlined, LineChartOutlined} from "@ant-design/icons";

const EmployeesListItem = ({item, index}) => {
    return (
        <List.Item actions={
            [
                <Button icon={<LineChartOutlined/>} type="primary" shape="circle"/>,
                <Button icon={<DeleteOutlined/>} type="default" shape="circle"/>
            ]}>
            <List.Item.Meta
                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}/>}
                title={item.name}
                description={item.salary + '$'}
            />
        </List.Item>
    );
}

export default EmployeesListItem;