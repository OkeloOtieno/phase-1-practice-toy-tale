let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
 const addBtn = document.querySelector("#new-toy-btn");
 const toyFormContainer = document.querySelector(".container");
 addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
 });

 document.querySelector('.container').addEventListener('submit', handleSubmit);
});

function handleSubmit(e) {
 e.preventDefault();
 let name = document.getElementById('toy-name').value;
 let image = document.getElementById('toy-url').value;
 let likes = 0;
 let toyObj = {
    name,
    image,
    likes
 };
 addNewToy(toyObj);
}

function renderToys(toy) {
 let card = document.createElement('li');
 card.className = 'card';
 card.innerHTML = `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p id="toy-likes-${toy.id}">${toy.likes}</p>
      <button class="like-btn" id="like-btn-${toy.id}">Like ❤️</button>
    </div>
 `;
 document.querySelector('#toy-collection').appendChild(card);


 document.getElementById(`like-btn-${toy.id}`).addEventListener('click', () => updateLikes(toy.id));
}

function updateLikes(toyId) {
 let currentLikes = document.querySelector(`#toy-likes-${toyId}`).textContent;
 let updatedLikes = parseInt(currentLikes) + 1;

 fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: updatedLikes
    })
 })
 .then(response => response.json())
 .then(data => {
    // Update the DOM to reflect the new number of likes
    document.querySelector(`#toy-likes-${toyId}`).textContent = data.likes;
 });
}

function getAllToys() {
 fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => data.forEach(toy => renderToys(toy)));
}

function addNewToy(newToy) {
 fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToy)
 })
 .then(res => res.json())
 .then(data => {
    console.log(data);
    getAllToys();
 });
}

function initialize() {
 getAllToys();
}

initialize();
