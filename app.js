const displaySection = document.querySelector(".displaySection");
const addBtn = document.querySelector(".addBtn");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const author = document.querySelector("#author");

let book = function (title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
};

let bookLibrary = [];
bookLibrary.push(
  new book("The Diary of a Young Girl", "Anne Frank", "337", true),
  new book("The Girl on the Train", "Paula Hawkins", "395", true),
  new book("The Diary of a Young Girl", "Anne Frank", "337", true),
  new book("The Girl on the Train", "Paula Hawkins", "395", true),
  new book("The Diary of a Young Girl", "Anne Frank", "337", true),
  new book("The Girl on the Train", "Paula Hawkins", "395", true),
  new book("The Diary of a Young Girl", "Anne Frank", "337", true),
  new book("The Girl on the Train", "Paula Hawkins", "395", true)
);

function addBookToLibrary(book) {
  bookLibrary.push(book);

  for (const items in book) {
    const card = document.createElement("div");
    card.classList.add("card");
    /*
    const info = document.createElement("p");
    info.value = `book.${items}`;
    console.log(info.value);
    card.appendChild(info);
    displaySection.appendChild(card);
    */
    displaySection.value = `book.${items}`;
    displaySection.appendChild(card);
  }
  console.log(bookLibrary);
}

function displayAllBooks(bookLibrary) {
  if (bookLibrary.length != 0) {
    for (let i = 0; i < bookLibrary.length; i++) {
      let book = bookLibrary[i];
      const card = document.createElement("div");
      card.classList.add("card");
      console.log(book);
      for (let key in book) {
        console.log(key);
        const info = document.createElement("p");
        info.setAttribute("id", key);
        info.textContent = book[key];
        card.appendChild(info);
      }
      displaySection.appendChild(card);
    }
  }
}

displayAllBooks(bookLibrary);

addBtn.addEventListener("click", function () {
  addBookToLibrary(
    new book(title.value, author.value, pages.value, haveRead.value)
  );
});
