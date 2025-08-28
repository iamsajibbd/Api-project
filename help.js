const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
}

// pets api lode function area 
const loadPets = () =>{
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
}

// button ar morhe id add kora call kora rules api link

const loadCategoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayPets(data.data)) 
    .catch((error) => console.log(error));
}


// model pet details api link 
const loadPetDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => showModal(data.petData))
    .catch((error) => console.log(error));
};


// const cardDemo = {
//      {
//     "petId": 12,
//     "breed": "Poodle",
//     "category": "Dog",
//     "date_of_birth": "2023-08-10",
//     "price": 1500,
//     "image": "https://i.ibb.co.com/R9ZHvDD/pet-12.jpg",
//     "gender": "Female",
//     "pet_details": "This elegant female Poodle, born on August 10, 2023, is intelligent and eager to learn. Fully vaccinated and priced at $1500, she's perfect for families looking for a trainable and loving companion.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Chloe"
//  }

// pets create function 
const displayPets = (pets) => {
    const petsContainer = document.getElementById("pets");
    petsContainer.innerHTML = "";
    const addCard = document.getElementById("addCard");

    if (!pets || pets.length === 0) {
        petsContainer.innerHTML = `
        <div class="min-h-screen flex-col gap-5 justify-center items-center">
        <div class="card bg-base-100 w-[800px] h-[500px] shadow-xl">
    <figure class="px-10 pt-10">
    
      <img src="./images/error.webp" alt=""  class="rounded-xl">
      
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">No Information Available</h2>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.</p>
  </div>
</div>
        </div>
        
        `; 
        return;
    }

    const petsArray = Array.isArray(pets) ? pets : [pets];

    petsArray.forEach((pet) => {
        const card = document.createElement("div");
        card.classList = "card flex flex-col  bg-base-100 shadow-xl border border-gray-400 m-auto";
        card.innerHTML = `
        <figure>
            <img src="${pet.image}" alt="${pet.pet_name}" class=" w-[265px] border rounded-md my-4"/>
        </figure>
        <div class="px-5 pt-0 pb-9">
            <h2 class="font-bold">${pet.pet_name}</h2>

            <div class="flex items-center text-center gap-2">
                <img class="w-5 py-2" src="https://img.icons8.com/?size=48&id=pjkvLZlx8SJ7&format=png" alt="">
                <p>breed: ${pet.breed}</p>
            </div>

            <div class="flex items-center text-center gap-2">
                <img class="w-5 py-2" src="https://image.shutterstock.com/image-vector/calendar-icon-vector-flat-design-150nw-522639508.jpg" alt="">
                <p>birth: ${pet.date_of_birth}</p>
            </div>

            <div class="flex items-center text-center gap-2">
                <img class="w-5 py-2" src="https://img.icons8.com/?size=60&id=oAmyGYMPbots&format=png" alt="">
                <p>gender: ${pet.gender}</p>
            </div>

            <div class="flex items-center text-center gap-2">
                <img class="w-5 py-2" src="https://img.icons8.com/?size=48&id=85801&format=png" alt="">
                <p>price: ${pet.price}</p>
            </div>

            <div class="border-b mb-px py-2"></div>

            <div class="flex items-center gap-2 p-2">
                <button id="cardImage" class="btn btn-outline btn-success p-2">
                    <img src="https://img.icons8.com/?size=48&id=82788&format=png" alt="icon" class="w-6 h-6">
                </button>

                <div class="flex flex-1 gap-2">
                   <button onclick="handleAdopt(this)" class="flex-1 btn btn-outline btn-success">Adopt</button>
                    <button class="flex-1 btn btn-outline btn-success" onclick="loadPetDetails(${pet.petId})" >Details</button>
                </div>
            </div>
        </div>
        `;
        petsContainer.append(card);
    });
};

// modal area details add function  
const showModal = (pet) => {
  document.getElementById("modalTitle").innerText = pet.pet_name || pet.breed;
  document.getElementById("modalImage").src = pet.image;
  document.getElementById("modalInfo").innerText = `
    Breed: ${pet.breed} | Gender: ${pet.gender} | DOB: ${pet.date_of_birth} | Price: $${pet.price}
  `;
  document.getElementById("modalDesc").innerText = pet.pet_details || "No extra description available";

  document.getElementById("detailsModal").showModal();
};


// modal 2 adopt model area 
const handleAdopt = (button) => {
  // Modal show
  document.getElementById("adopt-modal").checked = true;

  let countdown = 3;
  const countdownEl = document.getElementById("countdown");
  countdownEl.innerText = countdown;

  const interval = setInterval(() => {
    countdown--;
    countdownEl.innerText = countdown;

    if (countdown === 0) {
      clearInterval(interval);
      // Modal hide
      document.getElementById("adopt-modal").checked = false;
      // Adopt disable change
      button.innerText = "Adopted";
      button.disabled = true;
      button.classList.remove("btn-outline", "btn-success");
      button.classList.add("bg-gray-400", "text-white");
    }
  }, 1000);
};
// modal 2 adopt model area ned 
// {
//     "id": 1,
//     "category": "Cat",
//     "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
// }

let activeCategory = null; 
let allPetsData = {}; 
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categoryContainer.innerHTML = "";
  const categoriesArray = Array.isArray(categories)
    ? categories
    : Object.values(categories);

  categoriesArray.forEach((item) => {
    const button = document.createElement("button");
    button.className =
      "btn border-gray-500 border md:w-full lg:w-full w-[300px] m-auto flex items-center justify-center gap-2";
    button.innerHTML = `
            <img src="${item.category_icon}" alt="${item.category}" class="w-6 h-6" />
            <span>${item.category}</span>
        `;

    // click event
    button.addEventListener("click", async () => {
      // button active color remove
      const allButtons = categoryContainer.querySelectorAll("button");
      allButtons.forEach((btn) =>
        btn.classList.remove("bg-[#0E7A81]", "text-white")
      );

      // button active color add
      button.classList.add("bg-[#0E7A81]", "text-white");

      //  active category set
      activeCategory = item.category;

      // API call category pets load 
      fetch(`https://openapi.programming-hero.com/api/peddy/category/${item.category}`)
        .then((res) => res.json())
        .then((data) => {
          allPetsData[item.category] = data.data; // cache
          displayPets(data.data);
        })
        .catch((error) => console.log(error));
    });

    categoryContainer.appendChild(button);
  });
};


loadCategories();
loadPets();

// Sort by Price button click listener
document.getElementById("sortBtn").addEventListener("click", () => {
  if (!activeCategory) {
    
    return;
  }

  let pets = allPetsData[activeCategory] || [];

  // descending order 
  pets.sort((a, b) => b.price - a.price);

  displayPets(pets);
});
