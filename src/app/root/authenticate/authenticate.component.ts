import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authenticate',
  imports: [FormsModule],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.scss'
})
export class AuthenticateComponent {

  username: string = '';
  password: string = '';

  private auth = inject(AuthService);
  private readonly router = inject(Router);
  
  constructor() { }

  onLogin() {
    this.auth.login(this.username, this.password).subscribe((response) => {
      console.log('Login succesful', response);  

      console.log('El token del user', response.userToken);
      localStorage.setItem('token', response.userToken);

      this.navigateToArticuloExt();

    }, (error) => {
      console.error('Login failed', error);
    });
  }

  navigateToArticuloExt() {
    this.router.navigate(['/articuloext', localStorage.getItem('token')]);
  }

}
