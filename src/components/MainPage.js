import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

function filterBooks(books, term) {
	return books.filter(book => (
		book.shelf === term
	));
}

const MainPage = (props) => {
	const { books, onBookChange } = props;
	const currentlyReading = filterBooks(books, 'currentlyReading');
	const read = filterBooks(books, 'read');
	const wantToRead = filterBooks(books, 'wantToRead');

	return (
		<div className="app">
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<BookShelf books={currentlyReading} onBookChange={onBookChange}>Currently Reading</BookShelf>
						<BookShelf books={wantToRead} onBookChange={onBookChange}>Want to Read</BookShelf>
						<BookShelf books={read} onBookChange={onBookChange}>Read</BookShelf>
					</div>
				</div>
				<div className="open-search">
					<Link to='/search' />
				</div>
			</div>
		</div>
	);
}

MainPage.propTypes = {
	books: PropTypes.array.isRequired,
	onBookChange: PropTypes.func.isRequired
};

export default MainPage;