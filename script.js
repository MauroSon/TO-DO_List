const maxBackgroundTasks = 13;
let tasks = [];

function createListItem(){
    const ul = document.getElementById('lista');
    const li = document.createElement('li');
    li.style.display = 'flex';

    const div1 = document.createElement('div');
    div1.style.borderColor = 'transparent red blue transparent';
    div1.style.borderStyle = 'solid';
    div1.style.width = '10%';
    div1.style.height = '5vh';
    div1.style.borderWidth = "1px";

    const div2 = document.createElement('div');
    div2.style.borderColor = 'transparent transparent blue transparent';
    div2.style.borderStyle = 'solid';
    div2.style.width = '90%';
    div2.style.height = '5vh';
    div2.style.borderWidth = "1px";

    const div3 = document.createElement('div');
    div3.style.display = "flex";
    div3.style.alignItems = "center"; 
    div3.className = "task_content";
    div3.style.justifyContent = "space-between"

    // Adicionar as divs dentro do <li>
    li.appendChild(div1);
    li.appendChild(div2);
    div2.appendChild(div3);

    // Adicionar o <li> dentro do <ul>
    ul.appendChild(li);
}

window.onload = function renderBackground(){
    // Criar 12 elementos <li> com o layout desejado
    for (let i = 0; i < maxBackgroundTasks; i++) {
        createListItem()
    }
}

document.getElementById("addButton").addEventListener("click",adicionar)
document.getElementById("text_info").addEventListener("keypress",function(evento){
    if (evento.key === "Enter"){
        adicionar()
    }
})

function adicionar() {
    // Adicionar a tarefa ao array
    const feedBack = document.getElementById("feedbackMessage")
    const taskInput = document.getElementById("text_info");
    if (taskInput.value==""){
        feedBack.textContent = "O campo não pode estar vazio"
        feedBack.style.color = "red"

        setTimeout(() => {
            feedbackMessage.textContent = "";
        }, 3000);

        return
    }
    let task = {taskName:text_info.value, isChecked:false}
    tasks.push(task);
    
    if (tasks.length>=maxBackgroundTasks){
        createListItem()
    }

    taskInput.value = "";
    feedBack.textContent = "A atividade foi adicionada com sucesso"
        feedBack.style.color = "green"

        setTimeout(() => {
            feedbackMessage.textContent = "";
        }, 3000);
    // Chamar renderList para atualizar a lista
    renderList();
}

function deletar(taskIndex){
    const feedBack = document.getElementById("feedbackMessage")
    feedBack.textContent = "A atividade foi removida com sucesso"
        feedBack.style.color = "green"

        setTimeout(() => {
            feedbackMessage.textContent = "";
        }, 3000);

    tasks.splice(taskIndex,1)

    renderList()
}

function renderList() {
    const check_audio = new Audio("check_sound.mp3")
    const erase_audio = new Audio("eraser_sound.mp3")
    let innerContent = document.getElementsByClassName("task_content");

    // Limpar o conteúdo das divs task_content antes de adicionar as novas tarefas
    for (let i = 0; i < innerContent.length; i++) {
        innerContent[i].textContent = ''; // Limpa o conteúdo atual
    }

    // Adicionar as tarefas ao layout
    for (let i = 0; i < tasks.length; i++) {

        const checkbox = document.createElement("span");
        checkbox.style.height = "30px";
        checkbox.style.width = "30px";
        checkbox.style.backgroundImage = tasks[i].isChecked ? "url(checked.png)":"url(unchecked.png)"
        checkbox.style.backgroundRepeat = "no-repeat";
        checkbox.style.marginRight = "1em"
        checkbox.style.marginLeft = "3em"
        checkbox.style.cursor = 'pointer';
        checkbox.onclick = function() {
            if (tasks[i].isChecked){
                tasks[i].isChecked = false;
                checkbox.style.backgroundImage = "url(unchecked.png)"
            } else {
                tasks[i].isChecked = true;
                checkbox.style.backgroundImage = "url(checked.png)"
                check_audio.play()
            }
        };

        const deleteButton = document.createElement("div")
        deleteButton.style.backgroundImage = "url(delete.png)"
        deleteButton.style.height = "30px"
        deleteButton.style.width = "30px"
        deleteButton.style.justifyContent = "end"
        deleteButton.style.backgroundRepeat = "no-repeat"
        deleteButton.style.cursor = "pointer"
        deleteButton.style.marginRight = "3em"
        deleteButton.onclick = function() {
            deletar(i);
            erase_audio.play()
        }

        const taskText = document.createElement("span");
        taskText.style.flexGrow = 1;
        taskText.style.fontFamily = "Playwrite US Trad"
        taskText.style.justifyContent = "flex-start"
        taskText.textContent = tasks[i].taskName
        innerContent[i].appendChild(checkbox)
        innerContent[i].appendChild(taskText)
        innerContent[i].appendChild(deleteButton)
    }
}
