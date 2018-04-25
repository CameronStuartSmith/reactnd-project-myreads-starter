import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class SearchPage extends Component {
	state = {
		query: ''
	}

	componentWillUnmount() {
		this.handleChange('');
	}

	handleChange = (query) => {
		this.setState({query});
		this.props.onSearch(query);
	}

	hasShelf = (id) => {
		const index = this.props.books.findIndex(b => b.id === id);
		return index >= 0 ? this.props.books[index].shelf : 'none';
	}

	renderBooks(books) {
		return books.map(book => {
			const shelf = this.hasShelf(book.id);
			return <li key={book.id}><Book data={book} shelf={shelf} onChange={this.props.onBookChange} /></li>;
		});
	}

	render() {
		// Extra check to make sure to only render results if their is a query.
		// Sometimes the last fetch promise returns after a user has cleared out the query and then it returns results.
		// This prevents that bug from happening.
		const books = this.state.query ? this.props.results : [];
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e) => this.handleChange(e.target.value)}/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.renderBooks(books)}
					</ol>
				</div>
			</div>
		);
	}
}

SearchPage.propTypes = {
	results: PropTypes.array.isRequired,
	books: PropTypes.array.isRequired,
	onSearch: PropTypes.func.isRequired,
	onBookChange: PropTypes.func.isRequired
};

export default SearchPage;