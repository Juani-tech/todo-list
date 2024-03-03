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


