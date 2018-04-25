import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI'
import '../styles/App.css'
import MainPage from './MainPage';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
	state = {
		books: []
	}

	fetchBooks = () => {
		BooksAPI.getAll().then(books => {
			this.setState({books});
			console.log(books);
		});
	}

	componentDidMount() {
		this.fetchBooks();
	}

  render() {
    return (
      <div>
		<Route exact path='/' render={() => (
			<MainPage books={this.state.books} />
		)} />
		<Route exact path='/search' render={() => (
			<SearchPage />
		)} />
	  </div>
	)
  }
}

export default BooksApp
