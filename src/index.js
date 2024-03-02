import './style.css';
import { addNewProject, displayProject } from './DOM_manipulation.js';
    import {createNewProject, Todo, Project,} from './projects.js';


const proyecto1 = createNewProject("Proyecto 1");
const task1 = new Todo("Tarea 1", "Descripcion 1", "2021-08-01", "alta", "Notas 1", ["item1", "item2"]);
const task2 = new Todo("Tarea 2", "Descripcion 2", "2021-08-02", "baja", "Notas 2", ["item1", "item2"]);
proyecto1.addTask(task1);
proyecto1.addTask(task2);

addNewProject(proyecto1);
displayProject(proyecto1);

console.log("hola")