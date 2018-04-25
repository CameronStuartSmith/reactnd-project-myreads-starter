import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainPage extends Component {

	renderBook(book) {
		return(
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
					<div className="book-shelf-changer">
						<select>
							<option value="none" disabled>Move to...</option>
							<option value="currentlyReading" selected={'currentlyReading' === book.shelf}>Currently Reading</option>
							<option value="wantToRead" selected={'wantToRead' === book.shelf}>Want to Read</option>
							<option value="read" selected={'read' === book.shelf}>Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors[0]}</div>
			</div>
		)
	}

	renderBooks(books) {
		return books.map(book => (
			<li key={book.id}>{this.renderBook(book)}</li>
		))
	}

	filterBooks(term) {
		return this.props.books.filter(book => (
			book.shelf === term
		));
	}

	render() {
		const currentlyReading = this.filterBooks('currentlyReading');
		const read = this.filterBooks('read');
		const wantToRead = this.filterBooks('wantToRead');

		return (
			<div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                     {this.renderBooks(currentlyReading)}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.renderBooks(wantToRead)}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.renderBooks(read)}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' />
            </div>
          </div>
        )}
      </div>
		);
	}
}

export default MainPage;