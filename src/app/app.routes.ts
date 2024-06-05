import { Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


export const routes: Routes = [
    {
        path: '',
        component: CalendarComponent,
        title: 'Calendar'
      },
      {
          path: 'login',
          component: LoginComponent,
          title: 'Log In'
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
      }
];

export default routes;