import React, { Component } from 'react';
import './ProjectShow.css';

class ProjectShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
    this.getProjects = this.getProjects.bind(this);
  }

  getProjects() {
    const { AccessToken, Organisation } = this.props;
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/';
    const url = `${baseUrl}${Organisation}/pr_project`;
    http.open('GET', url, true);
    http.setRequestHeader('Accept', 'application/json');
    http.setRequestHeader('Authorization', `Bearer ${AccessToken}`);

    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        const projects = JSON.parse(http.responseText);
        this.setState({
          projects,
        });
      }
    };

    http.send();
  }

  render() {
    return (
      <div>
        <button onClick={this.getProjects}>Get Projects</button>
        <pre>
          <code>{JSON.stringify(this.state.projects, null, 4)}</code>
        </pre>
      </div>
    );
  }
}

export default ProjectShow;
