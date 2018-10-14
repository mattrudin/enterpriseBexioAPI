import React, { Component } from 'react';

class TaskShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  getTasks = () => {
    const { AccessToken, Organisation } = this.props;
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/';
    const url = `${baseUrl}${Organisation}/task`;
    http.open('GET', url, true);
    http.setRequestHeader('Accept', 'application/json');
    http.setRequestHeader('Authorization', `Bearer ${AccessToken}`);

    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        const tasks = JSON.parse(http.responseText);
        this.setState({
            tasks,
        });
      }
    };

    http.send();
  }

  render() {
    return (
      <div>
        <button onClick={this.getTasks}>Get Tasks</button>
        <pre>
          <code>{JSON.stringify(this.state.tasks, null, 4)}</code>
        </pre>
      </div>
    );
  }
}

export default TaskShow;
