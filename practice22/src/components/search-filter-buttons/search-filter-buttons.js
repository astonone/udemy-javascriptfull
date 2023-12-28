import {Radio} from 'antd';
import {Component} from "react";

class SearchFilterButtons extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [
                {label: 'All employees', value: 'all'},
                {label: 'For promotion', value: 'promotion'},
                {label: 'Salary greater than 1000$', value: 'gt'},
            ],
            value: 'all'
        }
    }

    const
    onFilter = ({target: {value}}) => {
        this.setState({value})
        this.props.onFilter(value);
    };

    render() {
        return (
            <Radio.Group
                options={this.state.options}
                value={this.state.value}
                onChange={this.onFilter}
                optionType="button"
                buttonStyle="solid"
            />
        );
    }
}

export default SearchFilterButtons;