class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }
}

export function createNewProject(projectTitle) {
    return new Project(projectTitle);
}