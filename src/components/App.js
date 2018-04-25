import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import '../styles/App.css';
import MainPage from './MainPage';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
	state = {
		books: [],
		searchResults: []
	}

	componentDidMount() {
		this.fetchBooks();
	}

	fetchBooks = () => {
		BooksAPI.getAll().then(books => {
			this.setState({books});
		});
	}

	fetchSearch = (term) => {
		BooksAPI.search(term).then(books => {
			const newResults = books ? (books.error ? [] : books) : [];
			this.setState({ searchResults: newResults });
		});
	}

	onBookChange = (book, value) => {
		BooksAPI.update(book, value).then(() => {
			this.setState(prevState => {
				let index = prevState.books.findIndex(b => b.id === book.id);
				/*  Splice the book from the array so we can add it to the end of the array.
				This way the book will be in the same order as when we refresh.
				*/
				let newBook = prevState.books.splice(index, 1)[0];
				newBook.shelf = value;
				prevState.books.push(newBook);
				return { books: prevState.books };
			});
		});
	}

	onBookChangeSearch = (book, value) => {
		BooksAPI.update(book, value).then(() => {
			this.setState(prevState => {
				let index = prevState.books.findIndex(b => b.id === book.id);
				if(index >= 0) {
					prevState.books[index].shelf = value;
					return { books: prevState.books };
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
		);
	}
}

export default BooksApp;
