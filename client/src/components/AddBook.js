import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from '../queries/queries';

const AddBook = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [addBook] = useMutation(ADD_BOOK);

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const displayAuthors = () => {
    if (loading) return <option>Loading...</option>;
    if (error) return <option>Error : {error.message}</option>;
    if (data) {
      return data?.authors?.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && genre && authorId) {
      addBook({
        variables: { name, genre, authorId },
        refetchQueries: [GET_BOOKS],
      });
      setName('');
      setGenre('');
      setAuthorId('');
    }
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)} value={authorId}>
          <option>Select Author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
};

export default AddBook;
