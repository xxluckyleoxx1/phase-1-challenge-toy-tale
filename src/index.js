let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const newToyForm = document.querySelector("form.add-toy-form")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  function makeToyObjToHTML(toyObj){
    let ourToys = document.querySelector("#toy-collection")
    let toyCard = document.createElement("div")
    let toyName = document.createElement("h2")
    toyName.innerText = toyObj.name
    toyCard.append(toyName)
    let toyImg = document.createElement("img")
    toyImg.className = "toy-avatar"
    toyImg.src = toyObj.image
    toyCard.append(toyImg)
    let toyLikes = document.createElement("p")
    toyLikes.innerText = toyObj.likes
    toyCard.append(toyLikes)
    let likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    likeButton.id = toyObj.id
    likeButton.innerText = "Like"
    toyCard.append(likeButton)
    ourToys.append(toyCard)
    likeButton.addEventListener("click", (ourEvent) => {
      fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        likes: toyObj.likes + 1
      })

    })
      .then(res => res.json())
      .then((updatedToyObject) =>{ 
        toyLikes.innerText = updatedToyObject.likes
        toyObj.likes = updatedToyObject.likes
  })
    })
  }
  fetch("http://localhost:3000/toys")
      .then(res => res.json())
      .then((toysArray) =>
        toysArray.forEach(function(toyObject) {
          makeToyObjToHTML(toyObject)
        })
      )
  newToyForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let newToyName = evt.target.name.value
    let newToyImg = evt.target.image.value
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: newToyName,
        image: newToyImg,
        likes: 0
      })

    })
      .then(res => res.json())
      .then((newToyObject) =>
        makeToyObjToHTML(newToyObject)
      )
  })
});
