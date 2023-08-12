//Changing Background 
function changeBg(options) {
  const rightBox = document.getElementsByClassName("right-box")[0];
  if (options.color) {
    rightBox.style.backgroundColor = options.color;
  }
  if (options.imgname) {
    rightBox.style.backgroundImage = `url('/${options.imgname}')`;
    rightBox.style.backgroundSize = "cover";
    rightBox.style.backgroundPosition = "center";
    rightBox.style.backgroundRepeat = "no-repeat";
    document.querySelector('.heading').style.color = "#792a2a";
  }

}

//Toggle completed list and incomplete lists
function taskfunc(checkboxElement) {
  const liElement = checkboxElement.closest("li");
  const taskList = document.getElementById("task-list");
  const completedList = document.getElementById("completed-list");
  const cbtn = document.getElementById("cbtn");
  if (taskList.contains(liElement)) {
    taskList.removeChild(liElement);
    completedList.appendChild(liElement);
  }
  else if (completedList.contains(liElement)) {
    completedList.removeChild(liElement);
    taskList.appendChild(liElement);
  }
}


//Predefined Lists
var groceries = ["Milk", "Bread", "Eggs", "Cheese", "Bananas", "Apples", "Tomatoes"]
var important = ["Complete project proposal", "Prepare for presentation", "Pay bills and expenses", "Buy groceries"]
var assignedTasks = ["Review budget report", "Update website content", "Prepare meeting agenda", "Submit sales report"]
var hometasks = ["Clean the floor", "Vacuum the living room", "Water the plants", "organize the pantry"]
var Todo = ["Wash Clothes", "Exercise for 1 hour", "Pay Current Bill", 'Read Book "The Power of Now"']
var startguide = ["Create your first List by clicking on 👍 Create New list", "Add your first task by clicking on 👍 Add a task", "Check out our sample grocery list and customise it for yourself", "Tap all the circles in this list to complete your tasks ✅"]

function toggleBg(listElement) {
  const allListItems = document.querySelectorAll(".fixed-groups li");
  allListItems.forEach(item => {
    item.style = ""; // Reset background color for all list items
  });

  const allUserListItems = document.querySelectorAll("#user-lists li");
  allUserListItems.forEach(item => {
    item.style = ""; // Reset background color for all user list items
  });

  listElement.style = "background-color:rgb(0 0 0 / 33%)"; // Set background color for the clicked list item
}

function showPredefinedList(grp) {
  toggleBg(this);
  grp.style = "background-color:rgb(0 0 0 / 33%)";//Styling the selected list
  const list = grp.querySelector("p");
  const headingElement = document.querySelector(".heading")
  headingElement.textContent = list.innerText;//Dynamic Adding of heading

  switch (list.innerText) {
    case 'Important': CreateTasklist(important)
      break;
    case 'Groceries': CreateTasklist(groceries)
      break;
    case 'Assigned to me': CreateTasklist(assignedTasks)
      break;
    case 'Tasks': CreateTasklist(hometasks)
      break;
    default: CreateTasklist(startguide)
      break;
  }
}
function CreateTasklist(array) {
  const taskul = document.getElementById("task-list");
  taskul.innerHTML = "";
  for (let i = 0; i < array.length; i++)  //Iterating through predefined task list to display
  {
    const li = document.createElement("li");
    li.innerHTML = `
        <div class="task">
            <div class="round-checkbox" onclick="taskfunc(this)">
            <i class="fa-solid fa-check"></i>
        </div>
        <p>${array[i]}</p>
        </div>
        `;
    taskul.appendChild(li);
  }
}

const todoLists = [];
let selectedIndex = -1; // Initialize with no selected index

function Createlist() {
  const newListInput = document.getElementById("newlist");
  const listName = newListInput.value.trim();

  if (listName !== "") {
    const newList = {
      name: listName,
      tasks: [],
    };
    todoLists.push(newList);
    newListInput.value = "";
    renderTodoLists();
  }
}

function addtask() {
  const newTaskInput = document.getElementById("newtask");
  const taskDescription = newTaskInput.value.trim();

  if (taskDescription !== "") {
    if (selectedIndex !== -1) {
      todoLists[selectedIndex].tasks.push(taskDescription);
      newTaskInput.value = "";
      renderTaskList(todoLists[selectedIndex]);
    }
  }
}

function renderTodoLists() {
  const userLists = document.getElementById("user-lists");
  userLists.innerHTML = "";
  todoLists.forEach((list, index) => {
    const listElement = document.createElement("li");
    listElement.onclick = function () {
      toggleBg(this);
      showlist(index);
    };
    listElement.innerHTML = `
      <div class="task">
          <i class="fa-solid fa-list-ul"></i>
          <p>${list.name}</p>
      </div>`;
    userLists.appendChild(listElement);
  });
}

function showlist(index) {

  selectedIndex = index;
  renderTodoLists();
  renderTaskList(todoLists[index]);
}

function renderTaskList(selectedList) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  const heading = document.querySelector(".heading");
  heading.textContent = selectedList.name;

  selectedList.tasks.forEach((task, taskIndex) => {
    const taskElement = document.createElement("li");
    taskElement.innerHTML = `
      <div class="task">
        <div class="round-checkbox" onclick="taskfunc(this)">
          <i class="fa-solid fa-check"></i>
        </div>
        <p>${task}</p>
      </div>
    `;

    taskList.appendChild(taskElement);
  });
}

