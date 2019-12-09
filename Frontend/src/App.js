import React, { Component } from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql'
});

class App extends Component {
  render() {
    return (
        //Use Browser Router to route to different pages
        <BrowserRouter>
        <ApolloProvider client={client}>
      <div className="App">
       <Main />
      </div>
        </ApolloProvider>
        </BrowserRouter>
    );
  }
}

export default App;