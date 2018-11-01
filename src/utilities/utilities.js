export function generateState() {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const UintArray = new Uint8Array(40);
  window.crypto.getRandomValues(UintArray);
  const array = UintArray.map(x => validChars.charCodeAt(x % validChars.length));
  const randomState = String.fromCharCode.apply(null, array);
  return randomState;
}

export function resourceReducer(resource) {
  let resourceText;
  switch (resource) {
    // case descriptions are according resources page, name column --> https://docs.bexio.com/resources/
    case 'users':
      resourceText = 'user';
      return resourceText;
    case 'timesheets':
      resourceText = 'timesheet';
      return resourceText;
    case 'projects':
      resourceText = 'pr_project';
      return resourceText;
    case 'articles':
      resourceText = 'article';
      return resourceText;
    case 'tasks':
      resourceText = 'task';
      return resourceText;
    case 'contacts':
      resourceText = 'contact';
      return resourceText;
    case 'business activities':
      resourceText = 'client_service';
      return resourceText;
    default:
      console.log('resourceReducer: Unknown method');
      return resourceText;
  }
}

export function checkTimesheet(timesheet) {
  const keys = Object.keys(timesheet);
  const isVerified = keys.includes('user_id', 'client_service_id', 'allowable_bill', 'tracking');
  return isVerified;
}

export function checkProject(project) {
  const keys = Object.keys(project);
  const isVerified = keys.includes(
    'contact_id',
    'name',
    'pr_project_type_id',
    'pr_state_id',
    'user_id'
  );
  return isVerified;
}
