'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    // todoRemove = document.querySelector('.todo-remove');
    todoItem = document.querySelector('todo-item');


let todoData = [];

if (localStorage.getItem('value')){ 
    todoData = JSON.parse(localStorage.getItem('value'));
}

const render = function() {

    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<li class="todo-item"><span class="text-todo">' + item.value + '</span>' + 
            '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div></li>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            localStorage.setItem('value', JSON.stringify(todoData));
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function(){
        
            li.remove();
            todoData.splice(todoData.indexOf(item), 1);
            localStorage.setItem('value', JSON.stringify(todoData));

        });

    });

};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false,
    };
    
    if(headerInput.value !== ''){
        todoData.push(newTodo);
        localStorage.setItem('value', JSON.stringify(todoData));
        headerInput.value = '';
    }

    render();
});


const showText = function(){
    console.log(localStorage.value);
};



render();
showText();
