import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        alert('Login successful');
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('Login failed', error);
        alert('Login failed');
      }
    );
  }
}