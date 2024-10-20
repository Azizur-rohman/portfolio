import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isMenuOpen = false;
  
  words: string[] = ["HR Payroll", "Point of Sale", "E-commerce", "Food Delivery Web App"]; // List of words
  displayedWord: string[] = []; // Characters of the word being typed
  currentIndex: number = 0; // Index of the current word in the list
  currentTextIndex: number = 0; // Index of the current letter in the word
  flashIndex: number | null = null;

  lastScrollTop = 0;
  isNavbarHidden = false;
  constructor() { }

  ngOnInit(): void {
    this.cycleWords();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.toggle('active');
    }
  }

  cycleWords() {
    this.displayedWord = [];
    this.currentTextIndex = 0;
    const currentWord = this.words[this.currentIndex];
    this.typeTextWithLightning(currentWord);
    this.currentIndex = (this.currentIndex + 1) % this.words.length;
  }

  typeTextWithLightning(word: string) {
    const typingSpeed = 500; // Speed for letter appearance
    const interval = setInterval(() => {
      if (this.currentTextIndex < word.length) {
        this.displayedWord.push(word[this.currentTextIndex]); // Add current letter
        this.flashIndex = this.currentTextIndex; // Set the index to flash
        setTimeout(() => {
          this.flashIndex = null; // Remove flash effect
        }, 100); // Flash duration
        this.currentTextIndex++; // Move to the next letter
      } else {
        clearInterval(interval); // Stop typing once the word is fully displayed
        setTimeout(() => this.cycleWords(), 2000); // Delay before moving to the next word
      }
    }, typingSpeed);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop) {
      // Scrolling down, hide the navbar
      this.isNavbarHidden = true;
    } else {
      // Scrolling up, show the navbar
      this.isNavbarHidden = false;
    }

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Avoid negative scroll values
  }
  
}
