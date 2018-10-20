import React, { Component } from 'react';
import './App.css';
import BexioAPI from './utilities/BexioAPI';
import TimeShetForm from './components/TimeSheetForm/TimeSheetForm';

const config = {
  clientID: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  clientSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  redirectURI: 'http://localhost:3000/',
  scopes: 'article_show monitoring_show project_show',
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
