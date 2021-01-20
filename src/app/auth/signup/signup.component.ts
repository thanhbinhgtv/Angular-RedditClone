import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupRequestPayload: SignupRequestPayload;   //Truyền dữ liệu qua biến này
  signupForm: FormGroup;  //Biến signForm có kiểu FormGroup (B1)

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({   //Validate, Viền đỏ khi emply (B1)
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signup(){
     this.signupRequestPayload.username = this.signupForm.get('username').value;
     this.signupRequestPayload.email = this.signupForm.get('email').value;
     this.signupRequestPayload.password = this.signupForm.get('password').value;
    
     this.authService.signup(this.signupRequestPayload).subscribe(() => {
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
        console.log('Đăng ký thành công');
    }, () => {
        this.toastr.error('Registration Failed! Please try again');
        console.log('Đăng ký thất bại');
    });
  }
}
