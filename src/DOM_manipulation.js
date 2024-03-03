import { Project, Todo } from './projects.js';

export function addProjectToDropdown(project) {
    const projectList = document.querySelector('.dropdown-content');
    const newProject = document.createElement('a');
    newProject.addEventListener('click', () => {
        displayProject(project);
    });
    newProject.setAttribute('class', `${project.title}-dropdown`); // Using backticks for template literals
    newProject.setAttribute('href', '#');
    newProject.innerHTML = project.title;
    projectList.appendChild(newProject);
}

export function addNewProject() {
    const content = document.getElementById('content');
    const dialog = document.createElement('dialog');
    const form = document.createElement('form');
    const titleLabel = document.createElement('label');
    const title = document.createElement('input');
    const submit = document.createElement('button');
    const close = document.createElement('button');
    
    content.appendChild(dialog);
    dialog.appendChild(form);
    form.appendChild(titleLabel);
    form.appendChild(title);
    form.appendChild(submit);
    form.appendChild(close);
    content.appendChild(dialog);
    dialog.showModal();
    // dialog.style = `
    //     width: 50%;
    //     height: 50%;
    // `;
    titleLabel.innerHTML = "Project Title: ";
    submit.innerHTML = "Submit";
    close.innerHTML = "Close";
    
    submit.addEventListener('click', () => {
        const newProject = new Project(title.value);
        addProjectToDropdown(newProject);
        dialog.close();
    }); 
    close.addEventListener('click', () => {
        dialog.close();
    });
}



function addNewTaskButton(project, projectContainer) {
    const newTaskButton = document.createElement('button');
    newTaskButton.setAttribute('class', 'new-task-button');
    newTaskButton.innerHTML = "New Task";

    newTaskButton.addEventListener('click', () => {
        newTaskButton.parentNode.removeChild(newTaskButton);

        const newTask = document.createElement('div');
        newTask.style = `
            border: 1px solid black;
            border-radius: 5px;
            display: grid;
            padding: 0.5rem;
            `;
        const newTaskTitleLabel = document.createElement('label');
        const newTaskTitle = document.createElement('input');
        const newTaskDueDateLabel = document.createElement('label');
        const newTaskDueDate = document.createElement('input');
        const newTaskPriorityLabel = document.createElement('label');
        const newTaskPriority = document.createElement('input');
        const newTaskDescriptionLabel = document.createElement('label');
        const newTaskDescription = document.createElement('input'); 
        const newTaskNotesLabel = document.createElement('label');
        const newTaskNotes = document.createElement('input');
        const newTaskChecklistLabel = document.createElement('label');
        const newTaskChecklist = document.createElement('input');
        const buttonsContainer = document.createElement('div');
        const addTaskButton = document.createElement('button');
        const cancelButton = document.createElement('button');

        newTaskTitleLabel.innerHTML = "Title: ";  
        newTaskDueDateLabel.innerHTML = "Due Date: ";
        newTaskPriorityLabel.innerHTML = "Priority: ";
        newTaskDescriptionLabel.innerHTML = "Description: ";
        newTaskNotesLabel.innerHTML = "Notes: ";
        newTaskChecklistLabel.innerHTML = "Checklist: ";
        addTaskButton.innerHTML = "Add Task";
        cancelButton.innerHTML = "Cancel";

        buttonsContainer.setAttribute('class', 'add-task-buttons-container');
        cancelButton.setAttribute('class', 'cancel-button');
        addTaskButton.setAttribute('class', 'add-task-button');

  
        addTaskButton.addEventListener('click', () => {
            const newProjectTask = new Todo(
                newTaskTitle.value,
                newTaskDescription.value,
                newTaskDueDate.value,
                newTaskPriority.value,
                newTaskNotes.value,
                newTaskChecklist.value.split(',')
            );
            project.addTask(newProjectTask);
            displayProject(project);
            projectContainer.removeChild(newTask);
        });
        cancelButton.addEventListener('click', () => {
            projectContainer.removeChild(newTask);
            projectContainer.appendChild(newTaskButton);
        });


        buttonsContainer.appendChild(addTaskButton);
        buttonsContainer.appendChild(cancelButton);
        newTask.appendChild(newTaskTitleLabel);
        newTask.appendChild(newTaskTitle);
        newTask.appendChild(newTaskDueDateLabel);
        newTask.appendChild(newTaskDueDate);
        newTask.appendChild(newTaskPriorityLabel);
        newTask.appendChild(newTaskPriority);
        newTask.appendChild(newTaskDescriptionLabel);
        newTask.appendChild(newTaskDescription);
        newTask.appendChild(newTaskNotesLabel);
        newTask.appendChild(newTaskNotes);
        newTask.appendChild(newTaskChecklistLabel);
        newTask.appendChild(newTaskChecklist);
        newTask.appendChild(buttonsContainer);
        projectContainer.appendChild(newTask);
    });
    projectContainer.appendChild(newTaskButton);
}
// This function will display the name of the project and its tasks in the DOM
export function displayProject(project) {
    const projectsContainer = document.getElementById('content');
    projectsContainer.innerHTML = "";
    const projectTitle = document.createElement('h2');
    projectTitle.style = `
        text-align: center;

    `;
    projectTitle.innerHTML = project.title;

    projectsContainer.appendChild(projectTitle);
    
    const projectContainer = document.createElement('div');
    projectContainer.style = `
        display: grid;
        grid-template: auto / repeat(4, 1fr);
        gap: 1rem;
    `;
    
    for (let i = 0; i < project.tasks.length; i++) {
        const task = document.createElement('div');
        task.style = `
            border: 1px solid black;
            border-radius: 5px;
            padding: 10px;
            // margin: 10px;
        `;
        const removeTaskButton = document.createElement('button');
        const taskTitle = document.createElement('p');
        const taskDueDate = document.createElement('p');
        const taskPriority = document.createElement('p'); 

        taskTitle.innerHTML = project.tasks[i].title;
        taskDueDate.innerHTML = "Due date: " + project.tasks[i].dueDate;
        taskPriority.innerHTML = "Priority: " + project.tasks[i].priority;
        removeTaskButton.innerHTML = "Remove";
        removeTaskButton.style = `
            background-color: #04AA6D;
            color: white;
            padding: 10px 20px;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
        `;
        removeTaskButton.addEventListener('click', () => {
            project.removeTask(taskTitle.innerHTML);
            projectContainer.removeChild(task);
        });

        task.appendChild(taskTitle);
        task.appendChild(taskDueDate);
        task.appendChild(taskPriority);
        task.appendChild(removeTaskButton);

        projectContainer.appendChild(task);
    }

    addNewTaskButton(project, projectContainer);
    projectContainer.setAttribute('class', 'project-container');
    projectsContainer.appendChild(projectContainer);
}



