import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOK_DETAILS_BY_ID } from '../queries/queries';

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS_BY_ID, {
    variables: { id: bookId },
  });

  const displayBookDetails = () => {
    if (data?.book) {
      return (
        <div>
          <h2>Book: {data.book.name}</h2>
          <p>Genre: {data.book.genre}</p>
          <p>Author: {data.book.author.name}</p>
          <p>All Books By This Author:</p>

          <ul className="other-books">
            {data.book.author.books.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      if (loading) {
        return <div>Loading...</div>;
      } else {
        return <div>No book selected...</div>;
      }
    }
  };

  return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetails;
