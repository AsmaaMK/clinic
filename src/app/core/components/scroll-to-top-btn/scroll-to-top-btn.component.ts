import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-btn',
  standalone: true,
  imports: [],
  templateUrl: './scroll-to-top-btn.component.html',
  styleUrl: './scroll-to-top-btn.component.scss',
})
export class ScrollToTopBtnComponent {
  @ViewChild('scrollToTopBtn') scrollToTopBtn!: ElementRef;

  ngAfterViewInit() {
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
