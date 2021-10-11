import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }
  login(): void {
    if (this.form.value && this.form.valid) {
      this.loading = true;
      this.authService.logIn(this.form.value.email, this.form.value.password).subscribe(
        result => {
          this.router.navigate(['/admin']);
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

}
