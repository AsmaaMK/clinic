import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { ScrollToTopBtnComponent } from './core/components/scroll-to-top-btn/scroll-to-top-btn.component';
import { SignUpDoctorComponent } from './pages/sign-up-doctor/sign-up-doctor.component';
import { ToasterComponent } from './core/components/toaster/toaster.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ScrollToTopBtnComponent,
    SignUpDoctorComponent,
    ToasterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'clinic';
}
