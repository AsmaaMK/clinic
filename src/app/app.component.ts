import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { ScrollToTopBtnComponent } from './core/components/scroll-to-top-btn/scroll-to-top-btn.component';
import { SignUpDoctorComponent } from './pages/sign-up-doctor/sign-up-doctor.component';
import { ToasterComponent } from './core/components/toaster/toaster.component';
import { BgComponent } from './app-bg.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ScrollToTopBtnComponent,
    SignUpDoctorComponent,
    ToasterComponent,
    BgComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'clinic';
}
