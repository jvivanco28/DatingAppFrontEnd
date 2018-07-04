import {Observable} from "rxjs/Observable";

export function handleError(error: any) {
  // Check for application error/unhandled error on server (internal server error).
  const applicationError = error.headers.get('Application-Error');
  if (applicationError) {
    return Observable.throw(applicationError);
  }
  // Check for model state errors.
  const serverError = error.json();
  let modelStateErrors = '';

  if (serverError) {
    for (const key in serverError) {
      if (serverError[key]) {
        modelStateErrors += serverError[key] + '\n';
      }
    }
  }
  return Observable.throw(
    modelStateErrors || 'Server error'
  );
}
