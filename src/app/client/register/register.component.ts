import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm !: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void{
    this.registerForm = this.formBuilder.group({
      email: [""],
      fullName:[""],
      password:[""]
    })
  }

  register(){
    this.http.post('/user/register', this.registerForm.value).subscribe(
      res=>{
        alert('dang ki thanh cong');
        this.registerForm.reset()
        this.router.navigate(['/home'])
      }, err => {
        alert('dang ki that bai')
      })
  }

  }
