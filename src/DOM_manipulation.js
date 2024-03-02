export function addNewProject(project) {
    const projectList = document.getElementById('project-list-dropdown');
    const newProject = document.createElement('a');
    newProject.setAttribute('href', '#');
    newProject.innerHTML = project.name;
    projectList.appendChild(newProject);
}