import './app.css';
import AppInfo from "../app-info/app-info";
import SearchFilter from "../search-filter/search-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";
import {Component} from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [
                {
                    id: 1,
                    name: 'John Smith',
                    salary: 1500,
                    increase: false,
                    rise: true
                },
                {
                    id: 2,
                    name: 'Ivan Ivanov',
                    salary: 800,
                    increase: true,
                    rise: false
                },
                {
                    id: 3,
                    name: 'Erik Tamm',
                    salary: 2000,
                    increase: false,
                    rise: false
                }],
            term: '',
            filter: 'all'
        }
    }

    deleteEmployee = (id) => {
        this.setState(({employees}) => {
            return {
                employees: employees.filter((item) => item.id !== id)
            }
        });
    }

    addEmployee = (newEmployee) => {
        this.setState(({employees}) => {
            return {
                employees: [...employees, newEmployee]
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({employees}) => ({
            employees: employees.map((item) => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }));
    }

    searchEmployee = (items, term) => {
        if (!term.trim().length) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

    filterEmployee = (items, filter) => {
        switch (filter) {
            case 'all' :
                return items;
            case 'promotion' :
                return items.filter(item => item.increase);
            case 'gt' :
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onSearch = (term) => {
        this.setState({term});
    }

    onFilter = (value) => {
        this.setState({filter: value});
    }

    render() {
        const {employees, term, filter} = this.state;
        const visibleData = this.filterEmployee(this.searchEmployee(employees, term), filter);

        return (
            <div className="app">
                <AppInfo total={employees.length}
                         increase={employees.filter(item => item.increase).length}
                />
                <div className="my-panel">
                    <SearchFilter onSearch={this.onSearch}
                                  onFilter={this.onFilter}
                    />
                </div>
                <div className="my-panel">
                    <EmployeesList
                        employees={visibleData}
                        onDelete={this.deleteEmployee}
                        onToggleProp={this.onToggleProp}
                    />
                </div>
                <div className="my-panel">
                    <EmployeesAddForm
                        onAdd={this.addEmployee}
                    />
                </div>
            </div>
        );
    }
}

export default App;