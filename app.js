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
const editSection = document.querySelector(".editSection");
const mainClass = document.querySelector(".main");
const addBookBtn = document.querySelector(".addBookBtn");
const editMinusImg = document.querySelector("#editMinusImg");
//edit inputs
const editTitle = document.querySelector("#editTitle");
const editAuthor = document.querySelector("#editAuthor");
const editPages = document.querySelector("#editPages");
const editHaveRead = document.querySelector("#editHaveRead");

let book = function (id, title, author, pages, haveRead) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
};

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
  db.collection("books-info").add({
    title: book.title,
    author: book["author"],
    pages: book.pages,
    haveRead: book.haveRead,
  });
  getItems();
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
        editSection.classList.remove("displayNone");
        addSection.classList.add("displayNone");
        body.classList.remove("minusClicked");
        body.classList.add("editClicked");
        addBookBtn.classList.remove("displayNone");
        editData(editBtn.dataset.info);
      });
      deleteBtn.addEventListener("click", () => {
        Alert.render(deleteBtn.dataset.info);
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

function customAlert() {
  this.bookId;
  this.render = function (bookId) {
    this.bookId = bookId;
    const dialogoverlay = document.querySelector("#dialogoverlay");
    const dialogbox = document.querySelector("#dialogbox");
    dialogoverlay.style.display = "block";
    dialogbox.style.display = "block";
    dialogbox.style.left = "25%";
    dialogbox.style.top = "25%";
    document.querySelector("#dialogboxhead").innerHTML = "DELETE CONFIRMATION";
    document.querySelector("#dialogboxbody").innerHTML =
      "Are you sure you want to delete it?";
    document.querySelector("#dialogboxfoot").innerHTML =
      '<button onClick = "Alert.ok()">Ok</button> <button onClick = "Alert.cancel()">Cancel</button>';
  };

  this.ok = function () {
    dialogoverlay.style.display = "none";
    dialogbox.style.display = "none";
    db.collection("books-info")
      .doc(this.bookId)
      .delete()
      .then(() => {
        console.log(`Document successfully deleted! ${this.bookId}`);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  this.cancel = function () {
    dialogoverlay.style.display = "none";
    dialogbox.style.display = "none";
  };
}
let Alert = new customAlert();
getItems();
//displayAllBooks(bookLibrary);

const id = document.querySelector(".idText");
function editData(bookId) {
  id.textContent = `${bookId}`;
  let item = db.collection("books-info").doc(bookId);
  item.get().then(function (doc) {
    if (doc.exists) {
      console.log(doc.data());
      editTitle.placeholder = doc.data().title;
      editPages.placeholder = doc.data().pages;
      editAuthor.placeholder = doc.data().author;
      if (doc.data().haveRead == "Yes") {
        editHaveRead.checked = true;
      } else {
        editHaveRead.checked = false;
      }
    }
  });
}

editBtn.addEventListener("click", function () {
  let item = db.collection("books-info").doc(id.textContent);
  item.get().then(function (doc) {
    if (doc.exists) {
      if (
        editTitle.value != "" &&
        editAuthor.value != "" &&
        editPages.value != ""
      ) {
        if (doc.data().haveRead != checkChecker(editHaveRead.checked)) {
          item.update({
            title: editTitle.value,
            author: editAuthor.value,
            pages: editPages.value,
            haveRead: checkChecker(editHaveRead.checked),
          });
          console.log("Updated All");
        } else {
          item.update({
            title: editTitle.value,
            author: editAuthor.value,
            pages: editPages.value,
          });
          console.log("Updated without haveRead");
        }
      } else {
        if (editTitle.value != "") {
          item.update({
            title: editTitle.value,
          });
          console.log("Update title");
        }
        if (editAuthor.value != "") {
          item.update({
            author: editAuthor.value,
          });
          console.log("Update author");
        }
        if (editPages.value != "") {
          item.update({
            pages: editPages.value,
          });
          console.log("Update pages");
        }
        if (doc.data().haveRead != checkChecker(editHaveRead.checked)) {
          item.update({
            haveRead: checkChecker(editHaveRead.checked),
          });
          console.log("Update haveRead");
        }
      }
    }
  });
});

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
  addBookBtn.classList.remove("displayNone");
});

addBookBtn.addEventListener("click", () => {
  addSection.classList.remove("minusClickedVisibility");
  addSection.classList.remove("displayNone");
  mainClass.classList.remove("minusClickedMain");
  body.classList.remove("minusClicked");
  body.classList.remove("editClicked");
  addBookBtn.classList.add("displayNone");
  editSection.classList.add("displayNone");
});

editMinusImg.addEventListener("click", () => {
  body.classList.remove("editClicked");
  editSection.classList.add("displayNone");
  mainClass.classList.add("minusClickedMain");
  body.classList.add("minusClicked");
  addSection.classList.add("displayNone");
});
