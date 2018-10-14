import React, { Component } from 'react';
import './ClientServiceShow.css';

class ClientServiceShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientService: [],
    };
  }

  getClientService = () => {
    const { AccessToken, Organisation } = this.props;
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/';
    const url = `${baseUrl}${Organisation}/client_service`;
    http.open('GET', url, true);
    http.setRequestHeader('Accept', 'application/json');
    http.setRequestHeader('Authorization', `Bearer ${AccessToken}`);

    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        const clientService = JSON.parse(http.responseText);
        this.setState({
            clientService,
        });
      }
    };

    http.send();
  }

  render() {
    return (
      <div>
        <button onClick={this.getClientService}>Get Client Service</button>
        <pre>
          <code>{JSON.stringify(this.state.clientService, null, 4)}</code>
        </pre>
      </div>
    );
  }
}

export default ClientServiceShow;
