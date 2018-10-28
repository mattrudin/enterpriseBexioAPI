import React, { Component } from 'react';
import { Bexio } from '../../App';
import './TimeSheetForm.css';
import Select from 'react-select';
import { rawUserToUsername, rawProjectToProject, rawServiceToService, timeConverter, currentDate, workingTime } from './utilities';

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
      Montag: 0,
      Dienstag: 0,
      Mittwoch: 0,
      Donnerstag: 0,
      Freitag: 0,
      Samstag: 0,
      weekLoadInMinutes: '',
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

  handleMontag = (Montag) => {
    this.setState({Montag: Montag.value}, () => this.calculateWeekLoad())
  }
  handleDienstag = (Dienstag) => {
    this.setState({Dienstag: Dienstag.value}, () => this.calculateWeekLoad())
  }
  handleMittwoch = (Mittwoch) => {
    this.setState({Mittwoch: Mittwoch.value}, () => this.calculateWeekLoad())
  }
  handleDonnerstag = (Donnerstag) => {
    this.setState({Donnerstag: Donnerstag.value}, () => this.calculateWeekLoad())
  }
  handleFreitag = (Freitag) => {
    this.setState({Freitag: Freitag.value}, () => this.calculateWeekLoad())
  }
  handleSamstag = (Samstag) => {
    this.setState({Samstag: Samstag.value}, () => this.calculateWeekLoad());
  }

  calculateWeekLoad = () => {
    const weekLoadInMinutes = this.state.Montag + this.state.Dienstag + this.state.Mittwoch + this.state.Donnerstag + this.state.Freitag + this.state.Samstag;
    this.setState({
      weekLoadInMinutes
    })
  }

  handleSendTimesheet = () => {
    const { selectedUser, selectedService, selectedProject } = this.state;
    const dateString = currentDate();
    const durationInHours = timeConverter(this.state.weekLoadInMinutes); 
    const timeSheet = {
      "user_id": selectedUser.value,
      "client_service_id": selectedService.value,
      "allowable_bill": false,
      "tracking": {
        "type": "duration",
        "date": dateString,
        "duration": durationInHours
      },
      "pr_project_id": selectedProject.value
    };
    Bexio.postTimetracking(timeSheet);
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
        <button className="button" type="button" onClick={() => this.handleSendTimesheet()}>
            Send Timesheet to Bexio
        </button>
        <p>Montag: {this.state.Montag}</p>
        <p>Dienstag: {this.state.Dienstag}</p>
        <p>Mittwoch: {this.state.Mittwoch}</p>
        <p>Donnerstag: {this.state.Donnerstag}</p>
        <p>Freitag: {this.state.Freitag}</p>
        <p>Samstag: {this.state.Samstag}</p>
        <p>Gesamte Woche: {this.state.weekLoadInMinutes}</p>
      </div>
    );
  }
}

export default TimeSheetForm;