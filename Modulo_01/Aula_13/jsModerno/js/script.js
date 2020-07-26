let global_Names = ["Um", "Dois", "Tres", "Quatro"];
let global_InputName = null;
let global_IsEditing = false;
let global_CurrentIndex = null;

window.addEventListener("load", () => {
  global_InputName = document.querySelector("#inputName");
  preventFormSubmit();
  activateInput();
  render();
});

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  let form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

function activateInput() {
  global_InputName.focus();
  global_InputName.addEventListener("keyup", handleTyping);

  function insertName(newName) {
    //global_Names.push(newName);
    global_Names = [...global_Names, newName];
  }

  function updateName(newName) {
    global_Names[global_CurrentIndex] = newName;
  }

  function handleTyping(event) {
    if (event.key === "Enter") {
      let hasText = !!event.target.value && event.target.value.trim() !== "";

      if (hasText === false) {
        clearInput();
        return;
      }

      if (global_IsEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      global_IsEditing = false;
      render();
    }
  }
}

function render() {
  function createDeleteButton(index) {
    function DeleteName(event) {
      //global_Names.splice(index, 1);

      // global_Names = global_Names.filter((name, i) => {
      //   // if (i === index) {
      //   //   return false;
      //   // }
      //   // return true;
      //   return i !== index;
      // });
      
      global_Names = global_Names.filter((_, i) => i !== index);
      render();
    }

    let button = document.createElement("button");
    button.textContent = "x";
    button.classList.add("deleteButton");

    button.addEventListener("click", DeleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem(event) {
      global_InputName.value = name;
      global_InputName.focus();
      global_IsEditing = true;
      global_CurrentIndex = index;
    }

    let span = document.createElement("span");
    span.classList.add("clickable");
    span.textContent = name;

    span.addEventListener("click", editItem);
    return span;
  }

  let divName = document.querySelector("#names");
  divName.innerHTML = "";

  let ul = document.createElement("ul");
  for (let index = 0; index < global_Names.length; index++) {
    let name = global_Names[index];
    let li = document.createElement("li");

    let button = createDeleteButton(index);
    let span = createSpan(name, index);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }
  divName.appendChild(ul);
  clearInput();
}

// function clearInput() {
//   global_InputName.value = "";
//   global_InputName.focus();
// }

const clearInput = () => {
  global_InputName.value = "";
  global_InputName.focus();
}