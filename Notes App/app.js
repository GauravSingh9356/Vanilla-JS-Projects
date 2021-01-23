// if user's add's something add to localStorage
showNotes();

let addbtn = document.getElementById('addBtn');

addbtn.addEventListener('click', (e) => {
  let addTxt = document.getElementById('addTxt');
  let title = document.getElementById('title');
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push({ title: `${title.value}`, value: addTxt.value });

  localStorage.setItem('notes', JSON.stringify(notesObj));
  addTxt.value = '';
  //   console.log(notes);
  title.value = '';
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = '';

  notesObj.forEach((element, index) => {
    html += `  <div class="noteCard card mx-2" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">${element.value}</p>
      <button onclick="deleteNote(this.id)" id=" ${index}" class="btn btn-primary">Delete Note</button>
    </div>
  </div>`;
  });

  let notesElm = document.getElementById('notes');
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<h1>Nothing to show!</h1>`;
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem('notes');
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById('searchTxt');

search.addEventListener('input', () => {
  let inputVal = search.value;

  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach((element) => {
    let cardTxt = element.getElementsByTagName('h5')[0];
    // console.log(cardTxt.innerText);
    let txt = cardTxt.innerText;
    // console.log(txt);
    if (!txt.includes(inputVal)) {
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }
  });
});
