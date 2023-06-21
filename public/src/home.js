function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  books.forEach((book) => {
    const borrowed = book.borrows.some((borrow) => borrow.returned === false);
    if (borrowed) {
      count++;
    }
  });
  return count;
}



function getMostCommonGenres(books) {
  const genreCounts = books.reduce((count, book) => {
    const { genre } = book;
    count[genre] = (count[genre] || 0) + 1;
    return count;
  }, {});

  const sortedGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }))
    .slice(0, 5);

  return sortedGenres;
}







function getMostPopularBooks(books) {
  const popularity = books.map((book) => {
    return {
      name: book.title,
      count: book.borrows.length,
    };
  });

  popularity.sort((a, b) => b.count - a.count);

  return popularity.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const popularity = books.reduce((count, book) => {
    const { authorId, borrows } = book;
    const author = authors.find((author) => author.id === authorId);
    const authorName = `${author.name.first} ${author.name.last}`;
    if (count[authorName]) {
      count[authorName] += borrows.length;
    } else {
      count[authorName] = borrows.length;
    }
    return count;
  }, {});

  const sortedAuthors = Object.entries(popularity)
    .sort((a, b) => b[1] - a[1])
    .map(([authorName, count]) => ({
      name: authorName,
      count: count,
    }));

  return sortedAuthors.slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
