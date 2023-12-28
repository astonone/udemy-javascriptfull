import {Avatar, Button, List} from 'antd';
import {DeleteOutlined, LineChartOutlined, StarOutlined} from "@ant-design/icons";
import {Component} from "react";
import './employees-list-item.css';

class EmployeesListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            increase: false,
            forAward: false
        }
    }

    onIncrease = () => {
        this.setState(({increase}) => ({
            increase: !increase
        }));
    }

    onForAward = () => {
        this.setState(({forAward}) => ({
            forAward: !forAward
        }));
    }

    render() {
        const {onDelete} = this.props;
        const {name, salary, index} = this.props.item;
        const {increase, forAward} = this.state;

        let nameStyle = {};
        if (increase) {
            nameStyle = {color: 'red'};
        }

        return (
            <List.Item actions={
                [
                    <Button onClick={this.onIncrease} icon={<LineChartOutlined/>} type="primary" shape="circle"/>,
                    <Button icon={<DeleteOutlined/>} type="default" shape="circle" onClick={onDelete} />,
                    (forAward && <StarOutlined/>)
                ]}>
                <List.Item.Meta
                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}/>}
                    title={<p className="list-item-title" onClick={this.onForAward}
                              style={nameStyle}>{name}</p>}
                    description={salary + '$'}
                />
            </List.Item>
        );
    }
}

export default EmployeesListItem;