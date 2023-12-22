import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { LangService } from '../services/lang.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'age',
  standalone: true,
  pure: false, // to allow the pipe to react to changes of the language
})
export class AgePipe implements PipeTransform, OnDestroy {
  lang!: 'ar' | 'en';
  langService: LangService;
  langSubscription: Subscription;

  constructor(langService: LangService) {
    this.langService = langService;
    this.langSubscription = this.langService.currentLang$.subscribe((lang) => {
      this.lang = lang;
    });
  }

  transform(birthdate: Date): string | null {
    if (!birthdate) return null;

    const today = new Date();
    const birthdateDate = new Date(birthdate);

    let ageYears = today.getFullYear() - birthdateDate.getFullYear();
    let ageMonths = today.getMonth() - birthdateDate.getMonth();

    // Adjust the age for negative month difference
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    let result = '';

    if (ageYears > 0) {
      result += `${ageYears} ${
        this.lang === 'ar' ? 'سنة' : ageYears === 1 ? 'year' : 'years'
      }`;
    } else if (ageYears === 0 && ageMonths > 0) {
      if (result !== '') {
        result += ' ';
      }
      result += `${ageMonths} ${
        this.lang === 'ar' ? 'شهر' : ageMonths === 1 ? 'month' : 'months'
      }`;
    }

    return result.trim();
  }

  ngOnDestroy() {
    this.langSubscription.unsubscribe();
  }
}
