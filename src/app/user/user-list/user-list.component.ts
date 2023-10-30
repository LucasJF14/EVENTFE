import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../common/model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  @Input()
  persons: Array<User> = [];

  @Output()
  personToUpdate = new EventEmitter<number>();

  @Output()
  personToDelete = new EventEmitter<number>();

  updatePerson(userId: number): void {
    this.personToUpdate.emit(userId);
  }

  deletePerson(userId: number): void {
    this.personToDelete.emit(userId);
  }
}
