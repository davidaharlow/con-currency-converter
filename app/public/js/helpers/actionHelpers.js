export const getErrorMsg = (resp) => {
  let msg = 'Error. Please try again later.';

  if (resp && resp.request && resp.request.status === 0) {
    msg = 'Application is offline';
  }

  return msg;
}