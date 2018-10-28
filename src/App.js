import React, { Component } from 'react';
import './App.css';
import BexioAPI from './utilities/BexioAPI';
import { client_ID, client_secret } from './.env_data'; // hidden

import TimeShetForm from './components/TimeSheetForm/TimeSheetForm';

const config = {
  clientID: client_ID,
  clientSecret: client_secret,
  redirectURI: 'http://localhost:3000/',
  scopes: 'article_show monitoring_show monitoring_edit project_show',
};

export const Bexio = new BexioAPI(config);

class App extends Component {
  componentDidMount() {
    Bexio.callback();
  }

  render() {
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
