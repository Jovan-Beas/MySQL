let todoList = [];
let filteredList =[];
// var editBox = $('#EditBox');
var editInput = $('#editTodo');
var editItem_data;
var AddInput = $('#AddTodoInput');
// editBox.hide();
$("#find").keyup(event=>{let search_string = event.target.value; search(search_string)})
function search (search_string){
    //console.log("key pressed",event.target.value); //CHecking the value of the word entered
    if(search_string!='')
    {
      filteredList=todoList.filter(item=>item.TaskName.includes(search_string));
      displayTodo();
    }
    else
    {
        filteredList = todoList;
        displayTodo();
    }
}
getTodoList();

function getTodoList() {
    $.ajax({
        url: "http://localhost:4500/getTasks",
        dataType: "text",
        success: function (result) {
            let data = JSON.parse(result);
            todoList = data;
            filteredList= data;
            let search_string = $('#find').val();
            search(search_string);
            //displayTodo();
        },
        error: function (error) {
            console.error(error);
        },
        timeout: 3000
    });
}

function displayTodo() {
    // document.getElementById("todoList").innerHTML = "";
    // todoList.forEach(todo => {
    //     var list = document.createElement("li");
    //     list.innerHTML = `<b>${todo['TaskName']}</b>
    //             <button class="editButton" onclick="editItem(${todo['TaskId']})">Edit</button>
    //             <button class="deleteButton" onclick="deleteItem(${todo['TaskId']})">Delete</button>`;
    //     document.getElementById("todoList").appendChild(list);
    // });
    // for(let i = 0; i < todoList.length; i++){
    //     var list = document.createElement("li");
    //     list.innerHTML = `<b>${todoList[i]}</b>
    //         <button class="editButton" onclick="editItem(${i})">Edit</button>
    //         <button class="deleteButton" onclick="deleteItem(${i})">Delete</button>`;
    //     document.getElementById("todoList").appendChild(list);
    // }
    const todoTableElement = $('#todoTable');
    todoTableElement.html('');
    // todoList.forEach(todo => {
        filteredList.forEach(todo => {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${todo['TaskName']}</td>
            <td><button class="btn btn-info" onclick="editItem(${todo['TaskId']})"  data-toggle="modal" data-target="#exampleModal">Edit</button></td>
            <td><button class="btn btn-danger" onclick="deleteItem(${todo['TaskId']})">Delete</button></td>`;
        todoTableElement.append(tr);
    });
}

function AddTodo() {
    //Plain old JS
    // let todoElement = document.getElementById("todo");
    // var todo = todoElement.value;

    //Jquery
    // let todoElement = $('#todo');
    // var todo = todoElement.val();
    //todoList.push(todo);
    let todo = AddInput.val();
    $.ajax({
        url: "http://localhost:4500/addTask",
        method: "POST",
        dataType: "text",
        data: JSON.stringify({
            "TaskName": todo
        }),
        success: function (result) {
            // console.log(result);
            AddInput.val('');
            getTodoList();
            $('#AddModal').modal('hide');  // hides the popup(Modal/Dialog) box after add 
        },
        error: function (error) {
            console.error(error);
        },
        timeout: 3000
    });

    // var list = document.createElement("li");
    // list.innerHTML = `<b>${todo}</b>`;
    // var text = document.createTextNode(todo);
    // list.appendChild(text);
    // document.getElementById("todoList").appendChild(list);
}

function deleteItem(TaskId) {
    // todoList.splice(index, 1);
    // displayTodo();
    $.ajax({
        url: "http://localhost:4500/deleteTask",
        method: "POST",
        dataType: "text",
        data: JSON.stringify({
            TaskId: TaskId          
        }),
        success: function (result) {
            // console.log(result);
            getTodoList();
        },
        error: function (error) {
            console.error(error);
        },
        timeout: 3000
    });
}

function editItem(TaskId) { //editItem did not previpously work because it was a already a varibale name.
    // editBox.show();
    //debugger
    //editItemIndex = TaskId;
    editItem_data = todoList.find(todo => todo.TaskId == TaskId);
    // console.log(editItem);
    editInput.val(editItem_data.TaskName);
    // displayTodo();
}

function updateTodo() {
    // todoList[editItemIndex] = editInput.val();
    editItem_data.TaskName = editInput.val();

    // AJAX to update the database
    $.ajax({
        url: "http://localhost:4500/updateTask",
        method: "POST",
        dataType: "text",
        data: JSON.stringify({
            TaskId: editItem_data.TaskId,
            TaskName: editItem_data.TaskName            
        }),
        success: function (result) {
            console.log(result);
            getTodoList();
            $('#exampleModal').modal('hide');
            // editBox.hide();
        },
        error: function (error) {
            console.error(error);
        },
        timeout: 3000
    });
}