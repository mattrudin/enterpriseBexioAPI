import React, { Component } from 'react';
import './TimeSheetForm.css';

class TimeSheetForm extends Component {
  getTimesheets() {
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/';
    const url = `${baseUrl}${this.state.Organisation}/timesheet`;
    http.open('GET', url, true);
    http.setRequestHeader('Accept', 'application/json');
    http.setRequestHeader('Authorization', `Bearer ${this.state.AccessToken}`);

    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200) {
        const timeSheets = JSON.parse(http.responseText);
        console.log(timeSheets);
      }
    };

    http.send();
  }

  render() {
    return (
      <div>
        <p>post timesheets</p>
      </div>
    );
  }
}
