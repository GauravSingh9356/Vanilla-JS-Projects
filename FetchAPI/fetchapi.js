const getData = () => {
  let url = 'https://api.github.com/users';
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((dataFinal) => {
      let tableBody = document.getElementById('tableBody');
      let html = '';
      dataFinal.forEach((data) => {
        html += `<tr>
         <th scope="row">${data.id}</th>
         <td>${data.login}</td>
         <td>${data.html_url}</td>
       </tr>`;
      });
      tableBody.innerHTML += html;
    });
};

let myBtn = document.getElementById('myBtn');
myBtn.addEventListener('click', getData);
