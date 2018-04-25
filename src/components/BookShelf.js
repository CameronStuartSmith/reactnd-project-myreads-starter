import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = (props) => {
	return(
		<div className="bookshelf">
			<h2 className="bookshelf-title">{props.children}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{props.books.map(b => (
						<li key={b.id}><Book data={b} onChange={props.onBookChange}/></li>
					))}
				</ol>
			</div>
		</div>
	);
};

BookShelf.propTypes = {
	books: PropTypes.array.isRequired,
	children: PropTypes.string.isRequired,
	onBookChange: PropTypes.func.isRequired
};

export default BookShelf;