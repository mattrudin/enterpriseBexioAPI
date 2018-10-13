import React, { Component } from 'react';
import './ArticleShow.css';

class ArticleShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  getArticles = () => {
    const { AccessToken, Organisation } = this.props;
    const http = new XMLHttpRequest();
    const baseUrl = 'https://office.bexio.com/api2.php/';
    const url = `${baseUrl}${Organisation}/article`;
    http.open('GET', url, true);
    http.setRequestHeader('Accept', 'application/json');
    http.setRequestHeader('Authorization', `Bearer ${AccessToken}`);

    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        const articles = JSON.parse(http.responseText);
        this.setState({
          articles,
        });
      }
    };

    http.send();
  }

  render() {
    return (
      <div>
        <button onClick={this.getArticles}>Get Articles</button>
        <pre>
          <code>{JSON.stringify(this.state.articles, null, 4)}</code>
        </pre>
      </div>
    );
  }
}

export default ArticleShow;
