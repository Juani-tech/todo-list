import { Todo } from './projects.js';
import { editTaskInLocalStorage, removeTaskFromLocalStorage, storeTaskInProject } from './information_retrieving.js';



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


function createNewTaskForm(values) {
    const newTaskForm = document.createElement('form');
    newTaskForm.setAttribute('class', 'new-task-form');

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
    newTaskTitle.setAttribute('required', '');
    newTaskDueDateLabel.innerHTML = "Due Date (YYYY-MM-DD): ";
    newTaskDueDate.setAttribute('required', '');
    newTaskDueDate.setAttribute('type', 'date');
    newTaskDueDate.setAttribute('pattern', '\d{4}-\d{2}-\d{2}');
    newTaskPriorityLabel.innerHTML = "Priority: ";
    newTaskPriority.setAttribute('required', '');
    newTaskDescriptionLabel.innerHTML = "Description: ";
    newTaskNotesLabel.innerHTML = "Notes: ";
    newTaskChecklistLabel.innerHTML = "Checklist: ";
    addTaskButton.innerHTML = "Add Task";
    addTaskButton.setAttribute('type', 'submit');
    cancelButton.innerHTML = "Cancel";

    newTaskTitle.value = values.title;
    newTaskDueDate.value = values.dueDate;
    newTaskPriority.value = values.priority;
    newTaskDescription.value = values.description;
    newTaskNotes.value = values.notes;
    newTaskChecklist.value = values.checklist;

    buttonsContainer.setAttribute('class', 'add-task-buttons-container');
    cancelButton.setAttribute('class', 'cancel-button');
    addTaskButton.setAttribute('class', 'add-task-button');

    buttonsContainer.appendChild(addTaskButton);
    buttonsContainer.appendChild(cancelButton);
    newTaskForm.appendChild(newTaskTitleLabel);
    newTaskForm.appendChild(newTaskTitle);
    newTaskForm.appendChild(newTaskDueDateLabel);
    newTaskForm.appendChild(newTaskDueDate);
    newTaskForm.appendChild(newTaskPriorityLabel);
    newTaskForm.appendChild(newTaskPriority);
    newTaskForm.appendChild(newTaskDescriptionLabel);
    newTaskForm.appendChild(newTaskDescription);
    newTaskForm.appendChild(newTaskNotesLabel);
    newTaskForm.appendChild(newTaskNotes);
    newTaskForm.appendChild(newTaskChecklistLabel);
    newTaskForm.appendChild(newTaskChecklist);
    newTaskForm.appendChild(buttonsContainer);


    return [newTaskForm, newTaskTitle, newTaskDueDate, newTaskPriority, newTaskDescription, newTaskNotes, newTaskChecklist, addTaskButton, cancelButton];
}

function addNewTaskButton(project, projectContainer, values) {
    const newTaskButton = document.createElement('button');
    newTaskButton.setAttribute('class', 'new-task-button');
    newTaskButton.innerHTML = "New Task";

    newTaskButton.addEventListener('click', () => {
        newTaskButton.parentNode.removeChild(newTaskButton);

        const newTask = document.createElement('div');
        newTask.setAttribute('class', 'task-container')

        const [newTaskForm, newTaskTitle, newTaskDueDate, newTaskPriority, newTaskDescription, newTaskNotes, newTaskChecklist, addTaskButton, cancelButton] = createNewTaskForm(values);
        
        newTaskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const newProjectTask = new Todo(
                newTaskTitle.value,
                newTaskDescription.value,
                newTaskDueDate.value,
                newTaskPriority.value,
                newTaskNotes.value,
                newTaskChecklist.value.split(',')
            );

            // Save the new task to the local storage

            storeTaskInProject(project, newProjectTask);
            project.addTask(newProjectTask);
            projectContainer.removeChild(newTask);
            displayProject(project);
        });
        cancelButton.addEventListener('click', () => {
            projectContainer.removeChild(newTask);
            projectContainer.appendChild(newTaskButton);
        });

        newTask.appendChild(newTaskForm);
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
        task.setAttribute('class', 'task-container');
        const removeTaskButton = document.createElement('button');
        const seeTaskButton = document.createElement('button');
        const editTaskButton = document.createElement('button');
        const taskTitle = document.createElement('p');
        const taskDueDate = document.createElement('p');
        const taskPriority = document.createElement('p'); 

        taskTitle.innerHTML = project.tasks[i].title;
        taskDueDate.innerHTML = "Due date: " + project.tasks[i].dueDate;
        taskPriority.innerHTML = "Priority: " + project.tasks[i].priority;
        removeTaskButton.innerHTML = "Remove";
        seeTaskButton.innerHTML = "See";
        editTaskButton.innerHTML = "Edit";

        seeTaskButton.setAttribute('class', 'see-task-button');
        removeTaskButton.setAttribute('class', 'remove-task-button');
        editTaskButton.setAttribute('class', 'edit-task-button');

        removeTaskButton.addEventListener('click', () => {
            project.removeTask(taskTitle.innerHTML);
            removeTaskFromLocalStorage(project, i);
            projectContainer.removeChild(task);
        });
        seeTaskButton.addEventListener('click', () => {
            task.innerHTML = "";
            const taskTitle = document.createElement('p');
            const taskDescription = document.createElement('p');
            const taskDueDate = document.createElement('p');
            const taskPriority = document.createElement('p');
            const taskNotes = document.createElement('p');
            const taskChecklist = document.createElement('p');
            const hideButton = document.createElement('button');

            taskTitle.innerHTML = "Title: " + project.tasks[i].title;
            taskDescription.innerHTML = "Description: " + project.tasks[i].description;
            taskDueDate.innerHTML = "Due date: " + project.tasks[i].dueDate;
            taskPriority.innerHTML = "Priority: " + project.tasks[i].priority;
            taskNotes.innerHTML = "Notes: " + project.tasks[i].notes;
            taskChecklist.innerHTML = "Checklist: " + project.tasks[i].checklist;
            hideButton.innerHTML = "Hide";

            task.appendChild(taskTitle);
            task.appendChild(taskDescription);
            task.appendChild(taskDueDate);
            task.appendChild(taskPriority);
            task.appendChild(taskNotes);
            task.appendChild(taskChecklist);
            task.appendChild(hideButton);

            hideButton.addEventListener('click', () => {
                task.innerHTML = "";
                task.appendChild(taskTitle);
                task.appendChild(taskDueDate);
                task.appendChild(taskPriority);
                task.appendChild(seeTaskButton);
                task.appendChild(editTaskButton);
                task.appendChild(removeTaskButton);
            });
        });
        editTaskButton.addEventListener('click', () => {
            task.innerHTML = "";
            const [newTaskForm, newTaskTitle, newTaskDueDate, newTaskPriority, newTaskDescription, newTaskNotes, newTaskChecklist, addTaskButton, cancelButton] = createNewTaskForm(project.tasks[i]);
            
            newTaskForm.addEventListener('submit', (event) => {
                event.preventDefault();
                project.removeTask(taskTitle.innerHTML);
                const newProjectTask = new Todo(
                    newTaskTitle.value,
                    newTaskDescription.value,
                    newTaskDueDate.value,
                    newTaskPriority.value,
                    newTaskNotes.value,
                    newTaskChecklist.value.split(',')
                );
                editTaskInLocalStorage(project, i, newProjectTask);
                project.addTask(newProjectTask);
                displayProject(project);
            });
            cancelButton.addEventListener('click', () => {
                displayProject(project);
            });
            
            task.appendChild(newTaskForm);

        }
        );
        task.appendChild(taskTitle);
        task.appendChild(taskDueDate);
        task.appendChild(taskPriority);
        task.appendChild(seeTaskButton);
        task.appendChild(editTaskButton);
        task.appendChild(removeTaskButton);
        projectContainer.appendChild(task);
    }

    addNewTaskButton(project, projectContainer, { title: '', description: '', dueDate: '', priority: '', notes: '', checklist: '' });
    projectContainer.setAttribute('class', 'project-container');
    projectsContainer.appendChild(projectContainer);
}



