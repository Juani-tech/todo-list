export class ProjectsContainer { 
    constructor() {
        if (!ProjectsContainer.instance) {
            this.projects = [];
            ProjectsContainer.instance = this;
        }
        return ProjectsContainer.instance;
    }

    #checkIfExists(projectTitle) {
        this.projects.forEach((p) => {
            if (p.title === projectTitle) {
                return true;
            }
        });
        return false;
    }

    addProject(project) {
        if (this.#checkIfExists(project.title)) {
            return;
        }
        this.projects.push(project);
    }

    removeProject(projectTitle) {
        this.projects = this.projects.filter((p) => p.title !== projectTitle);
    }

    getProject(projectTitle) {
        return this.projects.find((p) => p.title === projectTitle);
    }

}


const projectsContainer = new ProjectsContainer();
Object.freeze(projectsContainer);
export default projectsContainer;


export class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }
    #checkIfExists(taskTitle) {
        this.tasks.forEach((t) => {
            if (t.title === taskTitle) {
                return true;
            }
        });
        return false;
    }

    addTask(task) {
        if (this.#checkIfExists(task.title)) {
            return;
        }
        this.tasks.push(task);
    }

    removeTask(taskTitle) {
        this.tasks = this.tasks.filter((t) => t.title !== taskTitle);
    }

    getTask(taskTitle) {
        return this.tasks.find((t) => t.title === taskTitle);
    }
}


export class Todo {
    constructor(title, description, dueDate, priority, notes, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }
    get attributes(){
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            notes: this.notes,
            checklist: this.checklist
        };
    
    }
}

export function createNewProject(projectTitle) {
    return new Project(projectTitle);
}


