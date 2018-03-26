var todoList = {
  todos: [],
  // displayTodos: function() {
  //   // debugger;
  //   if (this.todos.length === 0) {
  //     console.log("This todo list is empty!");
  //   } else {
  //     console.log("My Todos:");
  //     for (var i = 0; i < this.todos.length; i++) {
  //       if (this.todos[i].completed === true) {
  //         console.log("(X)", this.todos[i].todoText);
  //       } else {
  //         console.log("( )", this.todos[i].todoText);
  //       }
  //     }
  //   }
  // },
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    // this.displayTodos();
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    // this.displayTodos();
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    // this.displayTodos();
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    // this.displayTodos();
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    //get number of completed todos
    // for (var i = 0; i < totalTodos; i++) {
    //   if (this.todos[i].completed === true) {
    //     completedTodos++;
    //   }
    // }
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    // // case 1 if everything is true, make everything false
    // if (completedTodos === totalTodos) {
    //   // for (var i = 0; i < totalTodos; i++) {
    //   //   this.todos[i].completed = false;
    //   // }
    //   this.todos.forEach(function(todo) {
    //     todo.completed = false;
    //   });
    // } else {
    //   // for (var i = 0; i < totalTodos; i++) {
    //   //   this.todos[i].completed = true;
    //   // }
    //   this.todos.forEach(function(todo) {
    //     todo.completed = true;
    //   });
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
  // this.displayTodos();
};
// var displayTodosButton = document.getElementById("displayTodosButton");
// // console.log(displayTodosButton);
// displayTodosButton.addEventListener("click", function() {
//   todoList.displayTodos();
// });

// var toggleAllButton = document.getElementById("toggleAllButton");
// // console.log(toggleAllButton);
// toggleAllButton.addEventListener("click", function() {
//   todoList.toggleAll();
// });

var handlers = {
  // displayTodos: function() {
  //   todoList.displayTodos();
  // },
  addTodo: function() {
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function() {
    var changePositionInput = document.getElementById(
      "changeTodoPositionInput"
    );
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeTodo(
      changeTodoPositionInput.valueAsNumber,
      changeTodoTextInput.value
    );
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position) {
    // var deleteTodoPositionInput = document.getElementById(
    //   "deleteTodoPositionInput"
    // );
    todoList.deleteTodo(position); // deleteTodoPositionInput.value = "";
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById(
      "toggleCompletedPositionInput"
    );
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todoUl = document.querySelector("ul");
    todoUl.innerHTML = "";
    // for (var i = 0; i < todoList.todos.length; i++) {
    //   var todoLi = document.createElement("li");
    //   var todo = todoList.todos[i];
    //   var todoTextWithCompletion = "";

    //   if (todo.completed === true) {
    //     todoTextWithCompletion = "(x)" + todo.todoText;
    //   } else {
    //     todoTextWithCompletion = "( )" + todo.todoText;
    //   }
    //   todoLi.id = i;
    //   todoLi.textContent = todoTextWithCompletion;
    //   todoLi.appendChild(this.createDeleteButton());
    //   todoUl.appendChild(todoLi);
    // }

    // this
    // forEach(callback,this)

    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement("li");
      var todoTextWithCompletion = "";

      if (todo.completed === true) {
        todoTextWithCompletion = "(x)" + todo.todoText;
      } else {
        todoTextWithCompletion = "( )" + todo.todoText;
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  setUpEventListener: function() {
    var todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", function(event) {
      // console.log(event.target.parentNode.id);
      var eventClicked = event.target;
      if (eventClicked.className === "deleteButton") {
        handlers.deleteTodo(parseInt(eventClicked.parentNode.id));
      }
    });
  }
};
view.setUpEventListener();
