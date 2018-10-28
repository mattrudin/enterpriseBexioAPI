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
    selectedProject: null,
    selectedService: null,
  }

  async handleGetData() {
    const userNames = rawUserToUsername(await Bexio.getData('users'));
    const projectNos = rawProjectToProject(await Bexio.getData('projects'));
    const services = rawServiceToService(await Bexio.getData('business activities'));

    this.setState({
      userNames,
      projectNos,
      services
    }, alert('Data received!'));
  }

  handleUserChange = (selectedUser) => {
    this.setState({ selectedUser });
  }

  handleProjectChange = (selectedProject) => {
    this.setState({ selectedProject });
  }

  handleServiceChange = (selectedService) => {
    this.setState({ selectedService });
  }

  render() {
    const { selectedUser, userNames, selectedProject, projectNos, selectedService, services } = this.state;
  
    return (
      <div>
        <button className="button" type="button" onClick={() => this.handleGetData()}>
            Get data from Bexio
        </button>
        <p>User</p>
          <Select
          value={selectedUser}
          onChange={this.handleUserChange}
          options={userNames}
          />
          <p>Project No.</p>
          <Select
          value={selectedProject}
          onChange={this.handleProjectChange}
          options={projectNos}
          />
          <p>Service</p>
          <Select
          value={selectedService}
          onChange={this.handleServiceChange}
          options={services}
          />
      </div>
    );
  }
}

export default TimeSheetForm;
