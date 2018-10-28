export function rawUserToUsername(userArray) {
  let userNames;
  if (Array.isArray(userArray)) {
    userNames = userArray.map(user => {
      const firstLastName = `${user.firstname} ${user.lastname}`;
      return { value: user.id, label: firstLastName };
    });
  }
  return userNames;
}

export function rawProjectToProject(projectArray) {
  let projectNames;
  if (Array.isArray(projectArray)) {
    projectNames = projectArray.map(project => ({ value: project.id, label: project.name }));
  }
  return projectNames;
}

export function rawServiceToService(serviceArray) {
  let serviceNames;
  if (Array.isArray(serviceArray)) {
    serviceNames = serviceArray.map(service => ({ value: service.id, label: service.name }));
  }
  return serviceNames;
}
