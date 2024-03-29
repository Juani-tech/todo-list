import './style.css';
import { addProjectToDropdown } from './DOM_manipulation.js';
import { Project } from './projects.js';




const addProjectButton = document.getElementById('add-project-button');
const form = document.getElementById('add-project-form');
const close = document.getElementById('close-new-project-button'); 
const dialog = document.getElementById('add-project-dialog');
const title = document.getElementById('project-title');
addProjectButton.addEventListener('click', () => {
    dialog.showModal();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (title.value === '') {
        return;
    }
    const newProject = new Project(title.value);
    localStorage.setItem(title.value, JSON.stringify(newProject));
    addProjectToDropdown(newProject);
    dialog.close();
    form.reset();
}); 
close.addEventListener('click', () => {
    dialog.close();
});


const data = Object.keys(localStorage);
data.forEach((key) => {
    const project = JSON.parse(localStorage.getItem(key));
    const newProject = new Project(project.title);
    newProject.tasks = project.tasks;
    addProjectToDropdown(newProject);
});
