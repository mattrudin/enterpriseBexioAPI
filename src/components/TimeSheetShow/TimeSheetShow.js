import React, { Component } from 'react';
import './TimeSheetShow.css';

class TimeSheetShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSheets: [],
    };
  }

  getTimesheets = () => {
    const { AccessToken, Organisation } = this.props;
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/';
    const url = `${baseUrl}${Organisation}/timesheet`;
    http.open('GET', url, true);
    http.setRequestHeader('Accept', 'application/json');
    http.setRequestHeader('Authorization', `Bearer ${AccessToken}`);

    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        const timeSheets = JSON.parse(http.responseText);
        this.setState({
          timeSheets,
        });
      }
    };

    http.send();
  }

  render() {
    return (
      <div>
        <button onClick={this.getTimesheets}>Get Timesheets</button>
        <pre>
          <code>{JSON.stringify(this.state.timeSheets, null, 4)}</code>
        </pre>
      </div>
    );
  }
}

export default TimeSheetShow;
