import React, { Component } from 'react';
import { Bexio } from '../../App';
import './TimeSheetForm.css';

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
    hours: ''
  }

  componentDidMount() {
    Bexio.getData(); //user
    Bexio.getData(); //pr_project
    Bexio.getData(); //client_service
  }

  render() {
    return (
      <form onSubmit={}>
        <label>
          User Name:
          <input type="text" value={this.state.userName} onChange={} />
        </label>
        <label>
          Project No:
          <input type="text" value={this.state.projectNo} onChange={} />
        </label>
        <label>
          Service:
          <input type="text" value={this.state.service} onChange={} />
        </label>
        <label>
          Hours:
          <input type="number" value={this.state.hours} onChange={} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default TimeSheetForm;
