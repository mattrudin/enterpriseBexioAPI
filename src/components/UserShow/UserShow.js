import React, { Component } from 'react';
import './UserShow.css';

class UserShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.getUsers = this.getUsers.bind(this);
  }

  getUsers() {
    const { AccessToken, Organisation } = this.props;
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/';
    const url = `${baseUrl}${Organisation}/user`;
    http.open('GET', url, true);
    http.setRequestHeader('Accept', 'application/json');
    http.setRequestHeader('Authorization', `Bearer ${AccessToken}`);

    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        const users = JSON.parse(http.responseText);
        this.setState({
          users,
        });
      }
    };

    http.send();
  }

  render() {
    return (
      <div>
        <button onClick={this.getUsers}>Get Users</button>
        <pre>
          <code>{JSON.stringify(this.state.users, null, 4)}</code>
        </pre>
      </div>
    );
  }
}

export default UserShow;
