import PropTypes from "prop-types";

export const BookCard = ({ book, onBookClick }) => {
  return (
    <div
      onClick={() => {
        onBookClick(book);
      }}
    >
      {book.title}
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string.isRequired,
    author: PropTypes.string
    // genre: PropTypes.shape({
    //   name: ...
    //   ...
    // })
  }).isRequired,
  onBookClick: PropTypes.func.isRequired
};
