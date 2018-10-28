import React, { Component } from 'react';
import { Bexio } from '../../App';
import './TimeSheetForm.css';
import Select from 'react-select';
import { rawUserToUsername, rawProjectToProject, rawServiceToService, workingTime } from './utilities';


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
      Montag: null,
      Dienstag: null,
      Mittwoch: null,
      Donnerstag: null,
      Freitag: null,
      Samstag: null,
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

  handleWeekdayInput = (weekday) => {
    this.setState({weekday})
  }

  handleMontag = (Montag) => {
    this.setState({Montag})
  }
  handleDienstag = (Dienstag) => {
    this.setState({Dienstag})
  }
  handleMittwoch = (Mittwoch) => {
    this.setState({Mittwoch})
  }
  handleDonnerstag = (Donnerstag) => {
    this.setState({Donnerstag})
  }
  handleFreitag = (Freitag) => {
    this.setState({Freitag})
  }
  handleSamstag = (Samstag) => {
    this.setState({Samstag})
  }

  render() {
    const { selectedUser, userNames, selectedProject, projectNos, selectedService, services } = this.state;
    const { Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag } = this.state;
  
    return (
      <div>
        <button className="button" type="button" onClick={() => this.handleGetData()}>
            Get data from Bexio
        </button>
        <div className="timeSheet-control">
          <label className="Spec-Input">
              User
              <Select
              value={selectedUser}
              onChange={this.handleUserChange}
              options={userNames}
              />
          </label>
          <label className="Spec-Input">
            Project No.
            <Select
            value={selectedProject}
            onChange={this.handleProjectChange}
            options={projectNos}
            />
          </label>
          <label className="Spec-Input">
            Service
            <Select
            value={selectedService}
            onChange={this.handleServiceChange}
            options={services}
            />
          </label>
          <label className="Time-Input">
          Montag:
          <Select
              value={Montag}
              onChange={this.handleMontag}
              options={workingTime}
              />
          </label> 
          <label className="Time-Input">
            Dienstag:
            <Select
                value={Dienstag}
                onChange={this.handleDienstag}
                options={workingTime}
                />
          </label> 
          <label className="Time-Input">
            Mittwoch:
            <Select
                value={Mittwoch}
                onChange={this.handleMittwoch}
                options={workingTime}
                />
          </label> 
          <label className="Time-Input">
            Donnerstag:
            <Select
                value={Donnerstag}
                onChange={this.handleDonnerstag}
                options={workingTime}
                />
          </label> 
          <label className="Time-Input">
            Freitag:
            <Select
                value={Freitag}
                onChange={this.handleFreitag}
                options={workingTime}
                />
          </label> 
          <label className="Time-Input">
            Samstag:
            <Select
                value={Samstag}
                onChange={this.handleSamstag}
                options={workingTime}
                />
          </label>   
        </div>
      </div>
    );
  }
}

export default TimeSheetForm;
