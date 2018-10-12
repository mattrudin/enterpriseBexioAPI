import React, { Component } from 'react';
import './PackageShow.css';

class PackageShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packages: [],
    };
    this.getPackages = this.getPackages.bind(this);
  }

  getPackages() {
    const { AccessToken, Organisation } = this.props;
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/';
    const url = `${baseUrl}${Organisation}/pr_packages`;
    http.open('GET', url, true);
    http.setRequestHeader('Accept', 'application/json');
    http.setRequestHeader('Authorization', `Bearer ${AccessToken}`);

    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        const packages = JSON.parse(http.responseText);
        this.setState({
          packages,
        });
      }
    };

    http.send();
  }

  render() {
    return (
      <div>
        <button onClick={this.getPackages}>Get Packages</button>
        <pre>
          <code>{JSON.stringify(this.state.packages, null, 4)}</code>
        </pre>
      </div>
    );
  }
}

export default PackageShow;
