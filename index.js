const taskContainer = document.querySelector(".task-container");  //This will make a container where data store

// Globle store
const globleStore = [ ];

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" id=${taskData.id}>  
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success">
      <i class="fas fa-pencil-alt"></i>
    </button>
    <button type="button" class="btn btn-outline-danger">
      <i class="fas fa-trash-alt"></i>
    </button>
  </div>
  <img
    src=${taskData.imageUrl}
    class="card-img-top"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle}</h5>
    <p class="card-text">
      ${taskData.taskDescription}
    </p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  <div class="card-footer">
    <button type="button" class="btn btn-outline-primary float-end">
      Open Task
    </button>
  </div>
</div>
</div>
`;

const loadInitialTaskCard = () =>{
  // access localstorage
  const getInitialData = localStorage.getItem("Vipul");
  if(!getInitialData) return;

  // convert stringify-object to normal-object
  const {cards} = JSON.parse(getInitialData);

  // map aroud the array to generate HTML card and inject into DOM
  cards.map((cardObject) => {
    const createNewCard = generateNewCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
    globleStore.push(cardObject);
  });
};

const saveChanges = () => {                                 //creating a Arrow function
  const taskData =   {                                       //creating a object
    id: `${Date.now()}`,                                       // using template literal Date.now()->is function
    imageUrl: document.getElementById("imageurl").value,      // we wnat value, thats why we write ".value" 
    textTitle: document.getElementById("tasktitle").value,
    textType: document.getElementById("tasktype").value,
    textDescription: document.getElementById("taskdescription").value,  
  };   
  
  // HTML code
  const createNewCard = generateNewCard(taskData);            // create a variable and called the function

  //inserting new element --to contect parent container(taskCon..)

  taskContainer.insertAdjacentHTML("beforeend",createNewCard);
  globleStore.push(taskData);      

  // Aplication programming interface
  //Called  API for storing data inside the browser
  // setItem is a method -> interface provided for you to work with localStorage(browser)
  //JSON.stringify -> convert the Object to string 
  localStorage.setItem("Vipul", JSON.stringify({cards: globleStore}));          
};