import {Avatar, Button, List} from 'antd';
import {DeleteOutlined, LineChartOutlined, StarOutlined} from "@ant-design/icons";
import './employees-list-item.css';

const EmployeesListItem = (props) => {

    const {onDelete, onToggleProp} = props;
    const {name, salary, index, increase, rise} = props.item;

    let nameStyle = {};
    if (increase) {
        nameStyle = {color: 'red'};
    }

    return (
        <List.Item actions={
            [
                <Button
                    data-toggle="rise"
                    onClick={onToggleProp}
                    icon={<LineChartOutlined/>}
                    type="primary"
                    shape="circle"

                />,
                <Button
                    icon={<DeleteOutlined/>}
                    type="default"
                    shape="circle"
                    onClick={onDelete}
                />,
                (rise && <StarOutlined/>)
            ]}>
            <List.Item.Meta
                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}/>}
                title={<p data-toggle="increase"
                          className="list-item-title"
                          onClick={onToggleProp}
                          style={nameStyle}>{name}
                        </p>}
                description={salary + '$'}
            />
        </List.Item>
    );

}

export default EmployeesListItem;