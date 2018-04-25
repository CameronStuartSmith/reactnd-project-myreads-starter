import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class SearchPage extends Component {
	state = {
		query: ''
	}

	handleChange = (query) => {
		this.setState({query});
		this.props.onSearch(query);
	}

	hasShelf = (id) => {
		let index = this.props.books.findIndex(b => b.id === id);
		return index >= 0 ? this.props.books[index].shelf : 'none';
	}

	renderBook(book) {
		const authors = _.get(book, 'authors[0]', "No Author");
		const imageLink = _.get(book, 'imageLinks.thumbnail');
		const shelf = this.hasShelf(book.id);
		return(
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLink}")` }}></div>
					<div className="book-shelf-changer">
						<select defaultValue={shelf} onChange={event => this.props.onBookChange(book, event.target.value)}>
							<option value="default" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{authors}</div>
			</div>
		)
	}

	renderBooks(books) {
		return books.map(book => (
			<li key={book.id}>{this.renderBook(book)}</li>
		))
	}

	render() {
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
			  	{this.renderBooks(this.props.results)}
			  </ol>
            </div>
          </div>
		);
	}
}

export default SearchPage;