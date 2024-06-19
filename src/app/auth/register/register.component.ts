import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService: AuthService;

  constructor(authService: AuthService, private router: Router) {
    this.authService = authService;
  }

  onSubmit(form: NgForm) {
    this.authService.register(form.value.email, form.value.password, form.value.lastName, form.value.firstName).subscribe(
      (response) => {
        console.log('Register successful', response);
        alert('Registration successful');
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('Register failed', error);
        alert('Registration failed');
      }
    );
  }
}
