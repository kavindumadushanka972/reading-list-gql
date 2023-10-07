import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [selectedBookId, setSelectedBookId] = useState(null)

  const displayBooks = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (data) {
      return data?.books?.map((book) => <li key={book.id} onClick={(e) => setSelectedBookId(book.id)}>{book.name}</li>);
    }
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>

      <BookDetails bookId={selectedBookId} />
    </div>
  );
};

export default BookList;
