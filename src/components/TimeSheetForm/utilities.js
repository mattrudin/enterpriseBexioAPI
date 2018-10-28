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

export const workingTime = [
  { value: '0:00', label: '0.0' },
  { value: '0:15', label: '0.25' },
  { value: '0:30', label: '0.5' },
  { value: '0:45', label: '0.75' },
  { value: '1:00', label: '1.0' },
  { value: '1:15', label: '1.25' },
  { value: '1:30', label: '1.5' },
  { value: '1:45', label: '1.75' },
  { value: '2:00', label: '2.00' },
  { value: '2:15', label: '2.25' },
  { value: '2:30', label: '2.5' },
  { value: '2:45', label: '2.75' },
  { value: '3:00', label: '3.00' },
  { value: '3:15', label: '3.25' },
  { value: '3:30', label: '3.5' },
  { value: '3:45', label: '3.75' },
  { value: '4:00', label: '4.00' },
  { value: '4:15', label: '4.25' },
  { value: '4:30', label: '4.5' },
  { value: '4:45', label: '4.75' },
  { value: '5:00', label: '5.00' },
  { value: '5:15', label: '5.25' },
  { value: '5:30', label: '5.5' },
  { value: '5:45', label: '5.75' },
  { value: '6:00', label: '6.00' },
  { value: '6:15', label: '6.25' },
  { value: '6:30', label: '6.5' },
  { value: '6:45', label: '6.75' },
  { value: '7:00', label: '7.00' },
  { value: '7:15', label: '7.25' },
  { value: '7:30', label: '7.5' },
  { value: '7:45', label: '7.75' },
  { value: '8:00', label: '8.00' },
  { value: '8:15', label: '8.25' },
  { value: '8:30', label: '8.5' },
  { value: '8:45', label: '8.75' },
  { value: '9:00', label: '9.00' },
  { value: '9:15', label: '9.25' },
  { value: '9:30', label: '9.5' },
  { value: '9:45', label: '9.75' },
  { value: '10:00', label: '10.00' },
  { value: '10:15', label: '10.25' },
  { value: '10:30', label: '10.5' },
  { value: '10:45', label: '10.75' },
];
