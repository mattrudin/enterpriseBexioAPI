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
  constructor(props) {
    super(props);
    this.state = {
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

    this.handleWeekdayInput = this.handleWeekdayInput.bind(this);
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

  handleWeekdayInput(weekday, event) {
    switch(weekday) {
      case 'Montag':
        this.setState({Montag: event.target.value});
        break;
      case 'Dienstag':
        this.setState({Dienstag: event.target.value});
        break;
      case 'Mittwoch':
        this.setState({Mittwoch: event.target.value});
        break;
      case 'Donnerstag':
        this.setState({Donnerstag: event.target.value});
        break;
      case 'Freitag':
        this.setState({Freitag: event.target.value});
        break;
      case 'Samstag':
        this.setState({Samstag: event.target.value});
        break;
      default:
        alert('No day provided');
    }
  }

  render() {
    const { selectedUser, userNames, selectedProject, projectNos, selectedService, services } = this.state;
    const weekDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const timeInputs = weekDays.map(weekday => { return (
      <label key={weekday}>
        {weekday}:
        <input type="text" value={this.state.weekday} onChange={(event) => this.handleWeekdayInput(weekday, event)} />
      </label>
    )
    })
  
    return (
      <div>
        <button className="button" type="button" onClick={() => this.handleGetData()}>
            Get data from Bexio
        </button>
        <label>
          <p>User</p>
            <Select
            value={selectedUser}
            onChange={this.handleUserChange}
            options={userNames}
            />
        </label>
        <label>
          <p>Project No.</p>
          <Select
          value={selectedProject}
          onChange={this.handleProjectChange}
          options={projectNos}
          />
        </label>
        <label>
          <p>Service</p>
          <Select
          value={selectedService}
          onChange={this.handleServiceChange}
          options={services}
          />
        </label>
        {timeInputs}        
      </div>
    );
  }
}

export default TimeSheetForm;
