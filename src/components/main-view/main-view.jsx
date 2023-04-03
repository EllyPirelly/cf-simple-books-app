import { useState, useEffect } from "react";
import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=the+lord+of+the+rings")
      .then((response) => response.json())
      .then((data) => {
        // console.log("books from api: ", data);
        const booksFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
            image: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
            author: doc.author_name?.[0]
          };
        });

        setBooks(booksFromApi);
      });
  }, []);

  if (!user) {
    return (
      <>
        <div>
          <h3>Login View - working</h3>
          <LoginView onLoggedIn={(user) => setUser(user)} />
        </div>

        <div>
          <h3>Signup View - not working</h3>
          <p>Open Library does NOT (!) have a sign up endpoint - only for practicing purposes.</p>
          <SignupView />
        </div>
      </>
    )
  }

  if (selectedBook) {
    return (
      <BookView book={selectedBook} onBackClick={() => setSelectedBook(null)} />
    );
  }

  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <>
      <div>
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onBookClick={(newSelectedBook) => {
              setSelectedBook(newSelectedBook);
            }}
          />
        ))}
      </div>
      <button onClick={() => { setUser(null); }}>Logout</button>
    </>
  );
};
