import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {MemberEditComponent} from "../members/member-edit/member-edit.component";

@Injectable()
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {

  canDeactivate(component: MemberEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {

    // If the form is dirty, ask the user if they want to continue.
    return component.editForm.dirty ?
      confirm("Are you sure you want to continue? Any unsaved changes will be lost.") :
      true;
  }
}
