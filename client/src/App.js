import BookList from './components/BookList';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AddBook from './components/AddBook';

// apollo client instance
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // backend graphql uri
  cache: new InMemoryCache(), // uses to cache query results after fetching them
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Kavindu's Reading List</h1>

        <BookList />

        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
