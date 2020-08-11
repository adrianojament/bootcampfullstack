window.addEventListener("load", start);

var global_Names = ["Um", "Dois", "Tres", "Quatro"];
var global_InputName = null;
var global_IsEditing = false;
var global_CurrentIndex = null;

function start(event) {
  global_InputName = document.querySelector("#inputName");
  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

function activateInput() {
  global_InputName.focus();
  global_InputName.addEventListener("keyup", handleTyping);

  function insertName(newName) {
    global_Names.push(newName);
  }

  function updateName(newName) {
    global_Names[global_CurrentIndex] = newName;
  }

  function handleTyping(event) {
    if (event.key === "Enter") {
      var hasText = !!event.target.value && event.target.value.trim() !== "";

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
      global_Names.splice(index, 1);
      render();
    }

    var button = document.createElement("button");
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

    var span = document.createElement("span");
    span.classList.add("clickable");
    span.textContent = name;

    span.addEventListener("click", editItem);
    return span;
  }

  var divName = document.querySelector("#names");
  divName.innerHTML = "";

  var ul = document.createElement("ul");
  for (var index = 0; index < global_Names.length; index++) {
    var name = global_Names[index];
    var li = document.createElement("li");

    var button = createDeleteButton(index);
    var span = createSpan(name, index);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }
  divName.appendChild(ul);
  clearInput();
}

function clearInput() {
  global_InputName.value = "";
  global_InputName.focus();
}
