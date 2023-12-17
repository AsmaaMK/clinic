import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-btn',
  standalone: true,
  imports: [],
  templateUrl: './scroll-to-top-btn.component.html',
  styleUrl: './scroll-to-top-btn.component.scss',
})
export class ScrollToTopBtnComponent {
  @ViewChild('scrollToTopBtn') scrollToTopBtn!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId))
      window.addEventListener('scroll', () => {
        const scrollToTopBtn = this.scrollToTopBtn.nativeElement;
        if (window.scrollY > 100) {
          scrollToTopBtn.classList.add('show');
        } else {
          scrollToTopBtn.classList.remove('show');
        }
      });
  }

  scrollToTop() {
    window.scroll({ top: 0 });
  }
}
