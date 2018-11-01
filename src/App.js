import React, { Component } from 'react';
import './App.css';
import BexioAPI from './utilities/BexioAPI';
import { client_ID, client_secret } from './.env_data'; // hidden
import SetInterval from 'set-interval';

import TimeShetForm from './components/TimeSheetForm/TimeSheetForm';

const config = {
  clientID: client_ID,
  clientSecret: client_secret,
  redirectURI: 'https://localhost:3000/',
  scopes: 'article_show monitoring_show monitoring_edit project_show',
};

export const Bexio = new BexioAPI(config);

class App extends Component {
  state = {
    Login: false, //<----------------------------------------------------------------------- can be set to true for development
  }

  //old concept
  componentDidMount() {
    Bexio.callback();
    SetInterval.start(() => {
      const isLogin = localStorage.getItem('Login');
      if (isLogin) {
        localStorage.clear();
        SetInterval.clear('checkLogin');
        this.setState({
          Login: true
        })
      }
    }, 500, 'checkLogin')
  }
  //new concept
  /* async componentDidMount() {
    await Bexio.callback().then(this.setState({
      Login: true
    }));
  } */

  render() {
    const { Login } = this.state;
    return (
      <div className="App">
        {Login ? null : (
          <button className="button" type="button" onClick={() => Bexio.login()}>
            Login to Bexio
          </button>
        )}

        {Login ? (
          <div className="container">
            <TimeShetForm />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
