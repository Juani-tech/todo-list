import { Project } from './projects.js';

export function addNewProject(project) {
    const projectList = document.querySelector('.dropdown-content');
    const newProject = document.createElement('a');
    newProject.setAttribute('class', `${project.title}-dropdown`); // Using backticks for template literals
    newProject.setAttribute('href', '#');
    newProject.innerHTML = project.title;
    projectList.appendChild(newProject);
}


export function displayProject(project) {

    const projectsContainer = document.getElementById('content');
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
    `;
    
    for (let i = 0; i < project.tasks.length; i++) {
        const task = document.createElement('div');
        task.style = `
            border: 1px solid black;
            border-radius: 5px;
            padding: 10px;
            margin: 10px;
        `;
        const taskTitle = document.createElement('p');
        const taskDueDate = document.createElement('p');
        const taskPriority = document.createElement('p'); 

        taskTitle.innerHTML = project.tasks[i].title;
        taskDueDate.innerHTML = "Due date: " + project.tasks[i].dueDate;
        taskPriority.innerHTML = "Priority: " + project.tasks[i].priority;

        task.appendChild(taskTitle);
        task.appendChild(taskDueDate);
        task.appendChild(taskPriority);

        projectContainer.appendChild(task);
    }

    projectContainer.setAttribute('class', 'project-container');
    projectsContainer.appendChild(projectContainer);
}