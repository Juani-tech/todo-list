export function getProjectTasks(project){
    const data = JSON.parse(localStorage.getItem(project.title));
    return data.tasks;
}

export function removeTaskFromLocalStorage(project, index) {
    const data = JSON.parse(localStorage.getItem(project.title));
    const tasks = data.tasks;
    tasks.splice(index, 1);
    localStorage.setItem(project.title, JSON.stringify(data));
}

export function storeTaskInProject(project, task){
    const data = JSON.parse(localStorage.getItem(project.title));
    data.tasks.push(task);
    localStorage.setItem(project.title, JSON.stringify(data));
}

export function editTaskInLocalStorage(project, index, task){
    const data = JSON.parse(localStorage.getItem(project.title));
    data.tasks[index] = task;
    localStorage.setItem(project.title, JSON.stringify(data));
}

