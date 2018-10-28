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

export function timeConverter(timeInMinutes) {
  const hours = timeInMinutes / 60;
  const wholeHours = Math.floor(hours);
  const minutes = (hours - wholeHours) * 60;
  const wholeMinutes = Math.round(minutes);
  return `${wholeHours}:${wholeMinutes}`;
}

export function currentDate() {
  const date = new Date();
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return dateString;
}

export const workingTime = [
  { value: 0, label: '0.0' },
  { value: 15, label: '0.25' },
  { value: 30, label: '0.5' },
  { value: 45, label: '0.75' },
  { value: 60, label: '1.0' },
  { value: 75, label: '1.25' },
  { value: 90, label: '1.5' },
  { value: 105, label: '1.75' },
  { value: 120, label: '2.00' },
  { value: 135, label: '2.25' },
  { value: 150, label: '2.5' },
  { value: 165, label: '2.75' },
  { value: 180, label: '3.00' },
  { value: 195, label: '3.25' },
  { value: 210, label: '3.5' },
  { value: 225, label: '3.75' },
  { value: 240, label: '4.00' },
  { value: 255, label: '4.25' },
  { value: 270, label: '4.5' },
  { value: 285, label: '4.75' },
  { value: 300, label: '5.00' },
  { value: 315, label: '5.25' },
  { value: 330, label: '5.5' },
  { value: 345, label: '5.75' },
  { value: 360, label: '6.00' },
  { value: 375, label: '6.25' },
  { value: 390, label: '6.5' },
  { value: 405, label: '6.75' },
  { value: 420, label: '7.00' },
  { value: 435, label: '7.25' },
  { value: 450, label: '7.5' },
  { value: 465, label: '7.75' },
  { value: 480, label: '8.00' },
  { value: 495, label: '8.25' },
  { value: 510, label: '8.5' },
  { value: 525, label: '8.75' },
  { value: 540, label: '9.00' },
  { value: 555, label: '9.25' },
  { value: 570, label: '9.5' },
  { value: 585, label: '9.75' },
  { value: 600, label: '10.00' },
  { value: 615, label: '10.25' },
  { value: 630, label: '10.5' },
  { value: 645, label: '10.75' },
];
