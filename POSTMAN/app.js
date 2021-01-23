var index = 1;
let toggleBtn = document.getElementById('toggleBtn');
const toggle = () => {
  var element = document.body;
  element.classList.toggle('dark-mode');
  //console.log(toggleBtn.value);
};

toggleBtn.addEventListener('click', toggle);

let parametersBox = document.getElementById('parametersBox');

let requestJsonBox = document.getElementById('requestJsonBox');

let paramsradio = document.getElementById('paramsRadio');
let jsonRadio = document.getElementById('jsonRadio');

requestJsonBox.style.display = 'none';

paramsradio.addEventListener('click', () => {
  requestJsonBox.style.display = 'none';
  parametersBox.style.display = 'block';
});
jsonRadio.addEventListener('click', () => {
  parametersBox.style.display = 'none';
  requestJsonBox.style.display = 'block';
});

// parametersBox.style.display = 'none';

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addmaterial);

function addmaterial() {
  console.log('goinf inside');
  index++;
  let html = `<div class="row">
          <label class="form-check-label my-2" for="params"
            ><strong>Parameter ${index}</strong>
          </label>
          <div class="col">
            <input
              id="parameterKeyId${index}"
              type="text"
              class="form-control"
              placeholder="Enter Parameter ${index} key"
              aria-label="First name"
            />
          </div>
          <div class="col">
            <input
              id="parameterValueId${index}"
              type="text"
              class="form-control"
              placeholder="Enter Parameter ${index} Value"
              aria-label="Last name"
            />
          </div>
          <div class="col">
            <button  type="button" class="deleteBtn btn btn-primary"> -</button>
          </div>
        </div>`;

  //   console.log('added');

  //   parametersBox.innerHTML += html;
  let newDiv = document.getElementById('addedParams');
  newDiv.innerHTML += html;
  let deleteParam = document.getElementsByClassName('deleteBtn');
  //   console.log(deleteParam);

  for (item of deleteParam) {
    item.addEventListener('click', (e) => {
      let secondparent = e.target.parentElement;
      console.log(secondparent);
      secondparent.parentElement.remove();
      index--;
    });
  }
}

//When Submit button is clicked

let submitBtn = document.getElementById('submit');

submit.addEventListener('click', () => {
  // show please wait i thr response box to request patience
  document.getElementById('responsePrism').value =
    'Please wait...Fetching Response';

  //fetching all the inputs from feilds
  let url = document.getElementById('urlId').value;

  let requestType = document.querySelector("input[name='requestType']:checked")
    .value;

  let contentType = document.querySelector("input[name='contentType']:checked")
    .value;

  console.log(requestType, contentType, url);

  // if user has used params instead of JSON then collect alll params

  if (contentType == 'Params') {
    data = {};
    for (let i = 1; i <= index; i++) {
      if (document.getElementById(`parameterKeyId${i}`) != undefined) {
        let key = document.getElementById(`parameterKeyId${i}`).value;
        let value = document.getElementById(`parameterValueId${i}`).value;
        //   console.log(key, value);
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById('jsontextId').value;
  }

  //   console.log(data);

  //FecthApi work

  if (requestType == 'GET') {
    fetch(url, {
      method: 'GET',
    })
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        document.getElementById('responsePrism').innerHTML = response;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        document.getElementById('responsePrism').innerHTML = response;
        Prism.highlightAll();
      });
  }
});
