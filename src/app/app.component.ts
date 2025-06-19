import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  texts: string[] = ['Angular Developer', 'Frontend Engineer', 'Mobile App Creator'];
  currentText = '';
  textIndex = 0;
  charIndex = 0;
  isDeleting = false;

  projects = [
    {
      title: 'Vakil Uncle',
      description: 'A legal directory and lawyer search app for users to find advocates by type, city, or state.'
    },
    {
      title: 'Turning Brain',
      description: 'An educational platform for learning logic, programming, and reasoning skills.'
    },
    {
      title: 'Portfolio Website',
      description: 'This responsive Angular 16 portfolio built with SCSS and animations.'
    }
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({ duration: 1000 });
      this.typeWriter();
    }
  }

  typeWriter(): void {
    const fullText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.currentText = fullText.substring(0, --this.charIndex);
    } else {
      this.currentText = fullText.substring(0, ++this.charIndex);
    }

    let delay = this.isDeleting ? 50 : 120;

    if (!this.isDeleting && this.charIndex === fullText.length) {
      delay = 1500;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      delay = 500;
    }

    setTimeout(() => this.typeWriter(), delay);
  }
}
