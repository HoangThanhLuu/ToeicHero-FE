import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { HomeComponent } from './home/home.component';
import {ClientRoutingModule} from "./client-routing.module";
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import { FooterComponent } from './footer/footer.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    ClientComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    RegisterComponent
  ],
    imports: [
      NgbModule,
      CommonModule,
      ClientRoutingModule,
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      FontAwesomeModule
    ],
  providers: [],
  bootstrap: [ClientComponent]
})
export class ClientModule { }
