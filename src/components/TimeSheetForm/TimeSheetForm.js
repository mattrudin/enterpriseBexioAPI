import React, { Component } from 'react';
import { Bexio } from '../../App';
import './TimeSheetForm.css';
import Select from 'react-select';
import { rawUserToUsername } from './utilities';

//This form needs the following:
//allowable_bill / boolean -->BexioAPI
//tracking --> BexioAPI
//  "tracking": {
//    "type": "duration",
//    "date": "2013-02-01",
//    "duration": "2:30"
//  }

class TimeSheetForm extends Component {
  state = {
    userNames: [],
    projectNos: [],
    services: [],
    userName: '',
    projectNo: '',
    service: '',
    hours: '',
    selectedUser: null,
  }

  async componentDidMount() {
    const users = await Bexio.getData('users');
    this.setState({
      userNames: [...users]
    });

    //Bexio.getData(); //pr_project
    //Bexio.getData(); //client_service
  }

  handleUserChange = (selectedUser) => {
    this.setState({ selectedUser });
  }

  render() {
    const { selectedUser } = this.state;
    return (
      <div>
        <p>User</p>
          <Select
          value={selectedUser}
          onChange={this.handleUserChange}
          options={options}
          />
      </div>
    );
  }
}

export default TimeSheetForm;
