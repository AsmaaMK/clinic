import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangService } from '../../services/lang.service';
import { NgClass, NgFor } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavLink } from '../../models/nav-link.model';

const AUTH_NAV_LINKS: NavLink[] = [
  { name: 'header.login-doctor', route: 'login-doctor' },
  { name: 'header.login-patient', route: 'login-patient' },
  { name: 'header.signup-doctor', route: 'signup-doctor' },
  { name: 'header.signup-patient', route: 'signup-patient' },
];

const PATIENT_NAV_LINKS: NavLink[] = [
  { name: 'header.info', route: 'patient-profile/info' },
  // { name: 'header.update-info', route: 'patient-profile/update-info' },
  { name: 'header.change-password', route: 'patient-profile/change-password' },
  { name: 'header.records', route: 'patient-profile/records' },
];

const DOCTOR_NAV_LINKS: NavLink[] = [
  { name: 'header.info', route: 'doctor-profile/info' },
  // { name: 'header.update-info', route: 'doctor-profile/update-info' },
  { name: 'header.change-password', route: 'doctor-profile/change-password' },
  { name: 'header.records', route: 'doctor-profile/records' },
  // { name: 'header.create-record', route: 'doctor-profile/create-record' },
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, NgClass, NgFor, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navLinks!: NavLink[];
  mobileNavOpened = false;
  lang!: string;

  constructor(
    private translate: TranslateService,
    private langService: LangService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang(this.langService.getLang());
    this.langService.setDirLangFont();
    this.handleNavLinksDynamicaly();

    this.langService.currentLang$.subscribe((lang) => {
      this.translate.use(lang);
      this.lang = lang;
    });
  }

  handleNavLinksDynamicaly() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let user = this.authService.getUserDataFormStorage();
        if (!user) this.navLinks = AUTH_NAV_LINKS;
        else if (user.hasOwnProperty('specialty'))
          this.navLinks = DOCTOR_NAV_LINKS;
        else this.navLinks = PATIENT_NAV_LINKS;
      }
    });
  }

  toggleLang() {
    this.langService.setLang(this.langService.getLang() === 'en' ? 'ar' : 'en');
  }

  openMobileNav() {
    this.mobileNavOpened = true;
  }

  closeMobileNav() {
    this.mobileNavOpened = false;
  }
}
