import {Component, EventEmitter, Output} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../model/auth.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  form = new FormGroup({
    username: new FormControl(undefined, Validators.required),
    password: new FormControl(undefined, Validators.required)
  })

  error_message: string | undefined;

  @Output()
  succes_login_message = new EventEmitter<String>();

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.error_message = this.route.snapshot.queryParams['message'];
  }

  login(): void {
    if (this.form.valid) {
      if (this.form.controls.username.value && this.form.controls.password.value) {
        const auth: Auth = {
          username: this.form.controls.username.value!,
          password: this.form.controls.password.value!,
        };

        this.authService.login(auth).subscribe(() => {
          this.succes_login_message.emit("Succesfull login.");
          this.router.navigate(['/']);
          }, error => {
          console.log(error);
          this.error_message = "Invalid username or password.";
        });
      }
    } else
      this.error_message = "Please fill in all the fields.";
  }

  redirectToMain(): void {
    this.router.navigate(['/']);
  }
}
