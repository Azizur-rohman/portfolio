import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cursor!: HTMLElement;
  circle!: HTMLElement;

  ngOnInit() {
    this.cursor = document.querySelector('.cursor')!;
    this.circle = document.querySelector('.mouseCircle')!;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Update cursor position (immediate movement)
    this.cursor.style.left = `${event.clientX}px`;
    this.cursor.style.top = `${event.clientY}px`;

    // Update circle position (smooth follow)
    if (target.classList.contains('nav-item')) {
    this.moveBigCircle(event.clientX, event.clientY);
    }else{
      this.moveCircle(event.clientX, event.clientY);
      
    const elementUnderCursor = document.elementFromPoint(event.clientX, event.clientY);

    if (elementUnderCursor) {
      const computedColor = window.getComputedStyle(elementUnderCursor).color;
      const isWhiteText = this.isWhiteText(computedColor);

      if (isWhiteText) {
        // Change cursor and circle color to black if text is white
        this.cursor.style.backgroundColor = 'black';
        this.circle.style.borderColor = 'black';
      } else {
        // Change cursor and circle color to white for other text colors
        this.cursor.style.backgroundColor = 'lightcyan';
        this.circle.style.borderColor = 'lightcyan';
      }
    }
   }
  }

  // Hover effect listeners
  @HostListener('mouseover', ['$event'])
  onMouseOver(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('nav-item')) {
      // Increase the size of the circle when hovering on a nav item
      this.circle.style.width = '50px';
      this.circle.style.height = '50px';
      this.circle.style.borderColor = 'lightcyan'; // Change the color
      this.circle.style.border = '2px solid'
    }
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('nav-item')) {
      // Return the circle size to normal after leaving the nav item
      this.circle.style.width = '20px';
      this.circle.style.height = '20px';
      this.circle.style.borderColor = 'lightcyan'; // Reset to original color
    }
  }

  moveCircle(mouseX: number, mouseY: number) {
    // Get the current circle position
    const circleWidth = parseInt(getComputedStyle(this.circle).width);
    const circleHeight = parseInt(getComputedStyle(this.circle).height);
    
    // Center the circle around the mouse position
    const circleX = mouseX; // X position
    const circleY = mouseY; // Y position

    // Set the position of the circle, ensuring it centers correctly
    this.circle.style.transform = `translate(${circleX - circleWidth / 2.2}px, ${circleY - circleHeight * 6.5}px)`;
  }

  moveBigCircle(mouseX: number, mouseY: number) {
    // Get the current circle position
    const circleWidth = parseInt(getComputedStyle(this.circle).width);
    const circleHeight = parseInt(getComputedStyle(this.circle).height);
    
    // Center the circle around the mouse position
    const circleX = mouseX; // X position
    const circleY = mouseY; // Y position

    // Set the position of the circle, ensuring it centers correctly
    this.circle.style.transform = `translate(${circleX - circleWidth / 2.2}px, ${circleY - circleHeight * 2.89}px)`;
  }

   // Utility function to detect if the color is close to white
   isWhiteText(color: string): boolean {
    const rgb = color.match(/\d+/g); // Extract RGB values from color string
    if (rgb) {
      const [r, g, b] = rgb.map(Number);
      // Check if the color is close to white (values near 255)
      return r > 190 && g > 190 && b > 190;
    }
    return false;
  }
}
