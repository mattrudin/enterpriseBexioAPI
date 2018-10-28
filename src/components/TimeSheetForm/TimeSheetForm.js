import React, { Component } from 'react';
import { Bexio } from '../../App';
import './TimeSheetForm.css';
import Select from 'react-select';
import { rawUserToUsername } from './utilities';
import SetInterval from 'set-interval'


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

  async handleGetData() {
    const users = await Bexio.getData('users');
    const projects = await Bexio.getData('projects');
    const client_services = await Bexio.getData('business activities');

    this.setState({
      userNames: [...users],
      projectNos: [...projects],
      services: [...client_services]
    });
  }

  handleUserChange = (selectedUser) => {
    this.setState({ selectedUser });
  }

  render() {
    const { selectedUser } = this.state;
    return (
      <div>
        <button className="button" type="button" onClick={() => this.handleGetData()}>
            Get data from Bexio
        </button>
        <p>User</p>
          <Select
          value={selectedUser}
          onChange={this.handleUserChange}
          options={this.state.userNames}
          />
      </div>
    );
  }
}

export default TimeSheetForm;
