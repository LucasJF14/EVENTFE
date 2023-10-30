import {Component} from '@angular/core';
import {User} from '../../common/model/user.model';
import {UserService} from '../../common/service/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {

  persons: Array<User> = [];

  person?: User;

  constructor(private service: UserService) {
    this.getPersons();
  }

  getPersons(): void {
    this.service.getUsers().subscribe((persons: User[]) => {
        this.persons = persons;
    })
  }

  createPerson(person: User): void {
    this.service.createUser(person)
      .subscribe(() => {
        console.log('OSOBA bola uspesne ulozena.')
        this.getPersons();
      })
  }

  updatePerson(person: User): void {
    this.service.updateUser(person)
      .subscribe(() => {
        console.log('OSOBA bola uspesne upravena.')
        this.getPersons();
      })
  }

  selectPersonToUpdate(personId: number): void {
    this.service.getUser(personId)
      .subscribe((person: User) => {
        this.person = person;
      })
  }

  deletePerson(personId: number): void {
    this.service.deleteUser(personId).subscribe(() => {
      console.log('OSOBA bola uspesne zmazana.')
      this.getPersons();
    })
  }
}
