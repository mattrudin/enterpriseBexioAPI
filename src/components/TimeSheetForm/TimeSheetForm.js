import React, { Component } from 'react';
import { Bexio } from '../../App';
import './TimeSheetForm.css';
import Select from 'react-select';
import { rawUserToUsername, rawProjectToProject, rawServiceToService } from './utilities';


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
    const userNames = rawUserToUsername(await Bexio.getData('users'));
    const projectNos = rawProjectToProject(await Bexio.getData('projects'));
    const services = rawServiceToService(await Bexio.getData('business activities'));

    this.setState({
      userNames,
      projectNos,
      services
    });
    console.log(this.state.userNames, this.state.projectNos, this.state.services);
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
