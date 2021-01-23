var index = 0;

const showBooks = () => {
  let books = localStorage.getItem('books');
  if (books == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(books);
  }

  if (booksObj.length != 0) {
    let html = '';
    booksObj.forEach((book) => {
      html += `<tr>
          <th scope="row">${book.index}</th>
          <td>${book.name}</td>
          <td>${book.author}</td>
          <td>${book.type}</td>
        </tr>`;
    });
    let tableParent = document.getElementById('tableParent');
    let tableBody = tableParent.getElementsByTagName('tbody')[0];
    tableBody.innerHTML += html;
  }
};

showBooks();

class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }

  Validate() {
    if (
      this.name.length < 2 ||
      this.author.length < 2 ||
      this.type.length < 2
    ) {
      return false;
    } else {
      return true;
    }
  }

  success() {
    let Message = document.getElementById('message');
    let messageSuccess = ` <div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Aww yeah!</strong>, You have successfully added the book in
    library.
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>`;
    Message.innerHTML += messageSuccess;

    setTimeout(() => {
      Message.innerHTML = '';
    }, 4000);
  }

  error() {
    let messageError = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Af..</strong>,Please review your entries! Name, author should be of valid length.
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>`;
    let Message = document.getElementById('message');
    Message.innerHTML += messageError;

    setTimeout(() => {
      Message.innerHTML = '';
    }, 4000);
  }
}

const addTable = (book) => {
  let books = localStorage.getItem('books');
  if (books == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(books);
  }

  if (book.Validate()) {
    index++;
    booksObj.push({
      index: index,
      name: book.name,
      author: book.author,
      type: book.type,
    });
    localStorage.setItem('books', JSON.stringify(booksObj));
    let htmltext = `<tr>
    <th scope="row">${index}</th>
    <td>${book.name}</td>
    <td>${book.author}</td>
    <td>${book.type}</td>
  </tr>`;

    let tableParent = document.getElementById('tableParent');
    let tableBody = tableParent.getElementsByTagName('tbody')[0];
    tableBody.innerHTML += htmltext;
    book.success();
  } else {
    book.error();
  }
  formId.reset();
};

const formId = document.getElementById('libForm');

formId.addEventListener('submit', (e) => {
  e.preventDefault();

  let name = document.getElementById('bookName').value;
  let author = document.getElementById('authorName').value;
  let type;
  let fiction = document.getElementById('Fiction');
  let romance = document.getElementById('Romance');
  let coding = document.getElementById('Coding');
  let cooking = document.getElementById('Cooking');

  if (fiction.checked) {
    type = fiction.value;
  } else if (romance.checked) {
    type = romance.value;
  } else if (coding.checked) {
    type = coding.value;
  } else if (cooking.checked) {
    type = cooking.value;
  }

  //   console.log(name, author, type);
  let book = new Book(name, author, type);
  addTable(book);
});
