import React, { Component } from 'react';
import './App.css';
import ArticleShow from './components/ArticleShow/ArticleShow';
import ArticleForm from './components/ArticleForm/ArticleForm';
import TimeSheetShow from './components/TimeSheetShow/TimeSheetShow';
import TimeShetForm from './components/TimeSheetForm/TimeSheetForm';

class App extends Component {

    state = {
      Login: false,
      ClientID: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      ClientSecret: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      State: '',
      AccessToken: '',
      Organisation: '',
    };

  componentDidMount() {
    this.timerID = setInterval(() => this.getAccess(), 1000);
  }

  getAccess() {
    const isCode = window.location.href.match(/code=([^&]*)/);
    if (isCode) {
      const state = window.location.href.match(/state=([^&]*)/)[1];
      // if(this.state.State === state) {
      clearInterval(this.timerID);
      const code = isCode[1];
      this.getAccessToken(code);
      // }
    }
  }

  getAccessToken(code) {
    // no 'access-control-allow-origin' header is present on the requested resource.

    const http = new XMLHttpRequest();
    const url = 'https://office.bexio.com/oauth/access_token/';
    const redirect_uri = 'http://localhost:3000/';

    const params = `client_id=${this.state.ClientID}&redirect_uri=${redirect_uri}&client_secret=${
      this.state.ClientSecret
    }&code=${code}`;
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        const json = JSON.parse(http.responseText);
        const accessToken = json.access_token;
        const organisation = json.org;
        this.setState({
          Login: true,
          AccessToken: accessToken,
          Organisation: organisation,
        });
        alert('AccessToken successfully received');
      }
    };
    http.send(params);
  }

  goLogin() {
    const http = new XMLHttpRequest();
    const url = 'https://office.bexio.com/oauth/authorize';
    const redirect_uri = 'http://localhost:3000/';
    const state = () => this.generateState();
    const scope = 'article_show monitoring_show';

    const params = `client_id=${
      this.state.ClientID
    }&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`;

    http.open('GET', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        window.location = `${url}?${params}`;
      }
    };
    http.send(params);
  }

  generateState() {
    const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const UintArray = new Uint8Array(40);
    window.crypto.getRandomValues(UintArray);
    const array = UintArray.map(x => validChars.charCodeAt(x % validChars.length));
    const randomState = String.fromCharCode.apply(null, array);
    this.setState(
      {
        State: randomState,
      },
      () => console.log('state', this.state.State)
    ); // console.log does work
    return randomState;
  }

  render() {
    return (
      <div className="App" >
        <button className="button" type="button" onClick={() => this.goLogin}>
          Login to Bexio
        </button>
		<div className="container">
			<ArticleShow />
			<ArticleForm />
			<TimeSheetShow />
			<TimeShetForm />
		</div>
      </div>
    );
  }
}

export default App;
