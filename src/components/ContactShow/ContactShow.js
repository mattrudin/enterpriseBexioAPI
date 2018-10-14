import React, { Component } from 'react';

class ContactShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  getContacts = () => {
    const { AccessToken, Organisation } = this.props;
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/';
    const url = `${baseUrl}${Organisation}/contact`;
    http.open('GET', url, true);
    http.setRequestHeader('Accept', 'application/json');
    http.setRequestHeader('Authorization', `Bearer ${AccessToken}`);

    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        const contacts = JSON.parse(http.responseText);
        this.setState({
            contacts,
        });
      }
    };

    http.send();
  }

  render() {
    return (
      <div>
        <button onClick={this.getContacts}>Get Contacts</button>
        <pre>
          <code>{JSON.stringify(this.state.contacts, null, 4)}</code>
        </pre>
      </div>
    );
  }
}

export default ContactShow;
