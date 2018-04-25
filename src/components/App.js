import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI'
import '../styles/App.css'
import MainPage from './MainPage';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
	state = {
		books: [],
		searchResults: [],
		shelf: {
			currentlyReading: [],
			read: [],
			wantToRead: []
		}
	}

	fetchBooks = () => {
		BooksAPI.getAll().then(books => {
			let shelf = {};
			books.forEach(element => {
				shelf[element.shelf] = shelf[element.shelf] || [];
				shelf[element.shelf].push(element.id);
			});
			this.setState({books, shelf});
		});
	}

	fetchSearch = (term) => {
		BooksAPI.search(term).then(books => {
			const newResults = books ? (books.error ? [] : books) : [];
			this.setState({ searchResults: newResults });
		});
	}

	componentDidMount() {
		this.fetchBooks();
	}

	onBookChange = (book, value) => {
		BooksAPI.update(book, value).then(shelf => {
			this.setState(prevState => {
				let index = prevState.books.findIndex(b => b.id === book.id);
				prevState.books[index].shelf = value;
				return { books: prevState.books }
			});
		})
	}

	onBookChangeSearch = (book, value) => {
		BooksAPI.update(book, value).then(shelf => {
			this.setState(prevState => {
				let index = prevState.books.findIndex(b => b.id === book.id);
				if(index >= 0) {
					prevState.books[index].shelf = value;
					return { books: prevState.books }
				} else {
					book.shelf = value;
					prevState.books.push(book);
					return { books: prevState.books };
				}
			});
		});
	}

  render() {
    return (
      <div>
		<Route exact path='/' render={() => (
			<MainPage 
				books={this.state.books}
				onBookChange={this.onBookChange}
			/>
		)} />
		<Route exact path='/search' render={() => (
			<SearchPage
				results={this.state.searchResults}
				books={this.state.books}
				onSearch={this.fetchSearch}
				onBookChange={this.onBookChangeSearch}
			/>
		)} />
	  </div>
	)
  }
}

export default BooksApp
