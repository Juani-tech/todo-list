export class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }
}


class Todo {
    constructor(title, description, dueDate, priority, notes, checklist) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }
}

export default function createNewProject(projectTitle) {
    return new Project(projectTitle);
}

