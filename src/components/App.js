import React from 'react'
import { Route } from 'react-router-dom';
// import * as BooksAPI from './BooksAPI'
import '../styles/App.css'
import MainPage from './MainPage';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
  render() {
    return (
      <div>
		<Route exact path='/' render={() => (
			<MainPage />
		)} />
		<Route exact path='/search' render={() => (
			<SearchPage />
		)} />
	  </div>
	)
  }
}

export default BooksApp
