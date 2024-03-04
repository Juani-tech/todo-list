import './style.css';
import { addProjectToDropdown, displayProject } from './DOM_manipulation.js';
import {createNewProject, Todo, Project,} from './projects.js';





const addProjectButton = document.getElementById('add-project-button');
// const submit = document.getElementById('add-new-project-button');
const form = document.getElementById('add-project-form');
const close = document.getElementById('close-new-project-button'); 
const dialog = document.getElementById('add-project-dialog');
const title = document.getElementById('project-title');
addProjectButton.addEventListener('click', () => {
    dialog.showModal();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newProject = new Project(title.value);
    addProjectToDropdown(newProject);
    dialog.close();
    form.reset();
}); 
close.addEventListener('click', () => {
    dialog.close();
});



// addProjectButton.addEventListener('click', addNewProject);

const proyecto1 = createNewProject("Proyecto 1");
const task1 = new Todo("Tarea 1", "Descripcion 1", "2021-08-01", "alta", "Notas 1", ["item1", "item2"]);
const task2 = new Todo("Tarea 2", "Descripcion 2", "2021-08-02", "baja", "Notas 2", ["item1", "item2"]);
proyecto1.addTask(task1);
proyecto1.addTask(task2);

addProjectToDropdown(proyecto1);
displayProject(proyecto1);
