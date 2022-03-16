const displaySection = document.querySelector(".displaySection");
const addBtn = document.querySelector(".addBtn");
const editBtn = document.querySelector(".editBtn");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const author = document.querySelector("#author");
const haveRead = document.querySelector("#haveRead");
const bookInput = document.querySelectorAll(".bookInput");
const minusImg = document.querySelector("#minusImg");
const body = document.querySelector("body");
const addSection = document.querySelector(".addSection");
const mainClass = document.querySelector(".main");
const addBookBtn = document.querySelector(".addBookBtn");

let book = function (id, title, author, pages, haveRead) {
  this.id = id;
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

function getItems() {
  db.collection("books-info").onSnapshot((snapshot) => {
    let items = [];
    snapshot.docs.forEach((doc) => {
      items.push(
        new book(
          doc.id,
          doc.data().title,
          doc.data().author,
          doc.data().pages,
          doc.data().haveRead
        )
      );
    });
    displayAllBooks(items);
  });
}

function addBookToLibrary(book) {
  bookLibrary.push(book);
  db.collection("books-info").add({
    title: book.title,
    author: book["author"],
    pages: book.pages,
    haveRead: book.haveRead,
  });
  getItems();
  //displayAllBooks(bookLibrary);
  /*
  for (const items in book) {
    const card = document.createElement("div");
    card.classList.add("card");
    
    const info = document.createElement("p");
    info.value = `book.${items}`;
    console.log(info.value);
    card.appendChild(info);
    displaySection.appendChild(card);
    displaySection.value = `book.${items}`;
    displaySection.appendChild(card);
  }
  console.log(bookLibrary);
  */
}

function displayAllBooks(bookArray) {
  displaySection.innerHTML = "";
  if (bookArray.length != 0) {
    for (let i = 0; i < bookArray.length; i++) {
      let book = bookArray[i];
      const card = document.createElement("div");
      card.classList.add("card");
      for (let key in book) {
        const info = document.createElement("span");
        info.setAttribute("id", key);
        info.textContent = `${book[key]}`;
        if (key !== "id") {
          card.appendChild(info);
        } else {
          card.setAttribute("data-info", book[key]);
        }
      }
      const imgOptions = document.createElement("div");
      imgOptions.classList.add("imgOptions");
      imgOptions.classList.add("hidden");
      const editBtn = document.createElement("img");
      editBtn.src = "img/pencil.png";
      editBtn.classList.add("edit");
      editBtn.setAttribute("data-info", card.dataset.info);
      const deleteBtn = document.createElement("img");
      deleteBtn.src = "img/delete.png";
      deleteBtn.classList.add("delete");
      deleteBtn.setAttribute("data-info", card.dataset.info);
      editBtn.addEventListener("click", () => {
        console.log(editBtn.dataset.info);
        editData(editBtn.dataset.info);
      });
      //responsive button with image change
      editBtn.addEventListener("mouseover", () => {
        editBtn.src = "img/lead-pencil.png";
      });
      editBtn.addEventListener("mouseleave", () => {
        editBtn.src = "img/pencil.png";
      });
      deleteBtn.addEventListener("mouseover", () => {
        deleteBtn.src = "img/delete-empty.png";
      });
      deleteBtn.addEventListener("mouseleave", () => {
        deleteBtn.src = "img/delete.png";
      });
      imgOptions.appendChild(editBtn);
      imgOptions.appendChild(deleteBtn);
      card.appendChild(imgOptions);
      displaySection.appendChild(card);
    }
  }
}

function checkChecker(check) {
  if (check == true) {
    return "Yes";
  }
  return "No";
}
getItems();
//displayAllBooks(bookLibrary);

function editData(bookId) {
  const id = document.querySelector(".idText");
  id.textContent = `Id: ${bookId}`;
}

addBtn.addEventListener("click", function () {
  if (title.value == "") {
    title.placeholder = "Please enter title";
    title.classList.add("error");
  } else if (author.value == "") {
    author.placeholder = "Please enter author name";
    author.classList.add("error");
  } else if (pages.value == "") {
    pages.placeholder = "Please enter a value";
    pages.classList.add("error");
  } else {
    addBookToLibrary(
      new book(
        title.value,
        author.value,
        pages.value,
        checkChecker(haveRead.checked)
      )
    );
  }
});

editBtn.addEventListener("click", function () {});

bookInput.forEach((element) => {
  element.addEventListener("input", () => {
    if (element.classList.contains("error")) {
      element.classList.remove("error");
    }
  });
});

minusImg.addEventListener("click", () => {
  addSection.classList.add("minusClickedVisibility");
  mainClass.classList.add("minusClickedMain");
  body.classList.add("minusClicked");
  addBookBtn.classList.remove("addBookBtn");
});

addBookBtn.addEventListener("click", () => {
  addSection.classList.remove("minusClickedVisibility");
  mainClass.classList.remove("minusClickedMain");
  body.classList.remove("minusClicked");
  addBookBtn.classList.add("addBookBtn");
});
