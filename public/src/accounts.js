function capitalizeString(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a.name.last.localeCompare(b.name.last));
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((total, book) => {
    const borrowed = book.borrows.some((borrow) => borrow.id === accountId);
    return total + (borrowed ? 1 : 0);
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const borrowedBooks = books.filter((book) =>
    book.borrows.some((borrow) => borrow.id === accountId && !borrow.returned)
  );
  return borrowedBooks.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return { ...book, author };
  });
}

module.exports = {
  capitalizeString,
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
