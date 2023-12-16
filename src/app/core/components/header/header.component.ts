import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LangService } from '../../services/lang.service';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, NgClass, NgFor, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  navLinks: string[] = [
    'login-doctor',
    'login-patient',
    'signup-doctor',
    'signup-patient',
  ];
  mobileNavOpened = false;
  lang!: string;

  constructor(
    private translate: TranslateService,
    private langService: LangService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang(this.langService.getLang());
    this.langService.setDirLangFont();

    this.langService.currentLang$.subscribe((lang) => {
      this.translate.use(lang);
      this.lang = lang;
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
