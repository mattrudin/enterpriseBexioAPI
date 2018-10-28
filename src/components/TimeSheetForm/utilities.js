export function rawUserToUsername(userArray) {
  let userNames;
  if (Array.isArray(userArray)) {
    userNames = userArray.map(user => {
      const firstLastName = `${user.firstname} ${user.lastname}`;
      return [user.id, firstLastName];
    });
  }
  return userNames;
}

export function rawProjectToProject(projectArray) {
  let projectNames;
  if (Array.isArray(projectArray)) {
    projectNames = projectArray.map(project => [project.id, project.name]);
  }
  return projectNames;
}

export function rawServiceToService(serviceArray) {
  let serviceNames;
  if (Array.isArray(serviceArray)) {
    serviceNames = serviceArray.map(service => [service.id, service.name]);
  }
  return serviceNames;
}
