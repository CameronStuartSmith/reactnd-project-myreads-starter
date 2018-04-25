import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Book = (props) => {

	const book = props.data;
	const author = _.get(book, 'authors[0]', "No Author");
	const imageLink = _.get(book, 'imageLinks.thumbnail');
	const shelf = props.shelf || book.shelf;

	return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLink}")` }}></div>
				<div className="book-shelf-changer">
					<select defaultValue={shelf} onChange={event => props.onChange(book, event.target.value)}>
						<option value="default" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">{author}</div>
		</div>
	);
};

Book.propTypes = {
	data: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	shelf: PropTypes.string
};

export default Book;