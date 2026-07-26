import { books } from "../data/books";

function ReadingList() {
  return (
    <>
      <div className="book-scroll" tabIndex="0" aria-label="Scrollable reading list">
        <table className="book-list">
          <tbody>
            {books.map((book) => (
              <tr key={`${book.status}-${book.title}`}>
                <td>
                  <span className={`tag ${book.status.toLowerCase()}`}>
                    [{book.status}]
                  </span>
                </td>
                <td className={book.rtl ? "rtl" : undefined}>{book.title}</td>
                <td>{book.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="list-footer">
        <span>shelf: {books.length} tracked</span>
      </div>
    </>
  );
}

export default ReadingList;
