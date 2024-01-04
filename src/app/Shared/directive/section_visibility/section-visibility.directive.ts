import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appSectionVisibility]',
  standalone: true
})
export class SectionVisibilityDirective {
  // @Output() sectionVisible = new EventEmitter<boolean>();

  // constructor(private el: ElementRef) {}

  // @HostListener('scroll', ['$event'])
  // checkVisibility(event: Event) {
  //   const sectionElement = this.el.nativeElement;
  //   const container = event.target as HTMLElement;

  //   if (container instanceof HTMLElement) {
  //     const isSectionVisible = this.isElementInContainer(sectionElement, container);
  //     this.sectionVisible.emit(isSectionVisible);
  //   }
  // }

  // private isElementInContainer(el: HTMLElement, container: HTMLElement): boolean {
  //   const rect = el.getBoundingClientRect();
  //   const containerRect = container.getBoundingClientRect();

  //   return (
  //     rect.top <= containerRect.bottom &&
  //     rect.bottom >= containerRect.top &&
  //     rect.left <= containerRect.right &&
  //     rect.right >= containerRect.left
  //   );
  // }
  // @Output() sectionVisible = new EventEmitter<{ isVisible: boolean; sectionId: string }>();

  // constructor(private el: ElementRef) {}

  // @HostListener('scroll', ['$event'])
  // checkVisibility() {
  //   const container = this.el.nativeElement;
  //   const childSections = container.querySelectorAll('section');

  //   childSections.forEach((section: HTMLElement) => {
  //     const isSectionVisible = this.isElementInContainer(section, container);
  //     this.sectionVisible.emit({ isVisible: isSectionVisible, sectionId: section.id });
  //   });
  // }

  // private isElementInContainer(el: HTMLElement, container: HTMLElement): boolean {
  //   const rect = el.getBoundingClientRect();
  //   const containerRect = container.getBoundingClientRect();

  //   return (
  //     rect.top <= containerRect.bottom &&
  //     rect.bottom >= containerRect.top &&
  //     rect.left <= containerRect.right &&
  //     rect.right >= containerRect.left
  //   );
  // }

  @Output() mostVisibleSection = new EventEmitter<string>();

  private sectionVisibilityMap: Map<string, number> = new Map();

  constructor(private el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  checkVisibility() {
    const container = this.el.nativeElement;
    const childSections = container.querySelectorAll('section');

    childSections.forEach((section: HTMLElement) => {
      const isSectionVisible = this.isElementInContainer(section, container);
      const visibilityPercentage = this.calculateVisibilityPercentage(section, container);

      // Update the visibility percentage for each section in the map
      this.sectionVisibilityMap.set(section.id, visibilityPercentage);
    });

    // Find the section with the maximum visibility percentage
    const mostVisibleSection = this.findMostVisibleSection();
    this.mostVisibleSection.emit(mostVisibleSection);
  }

  private isElementInContainer(el: HTMLElement, container: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    return (
      rect.top <= containerRect.bottom &&
      rect.bottom >= containerRect.top &&
      rect.left <= containerRect.right &&
      rect.right >= containerRect.left
    );
  }

  private calculateVisibilityPercentage(el: HTMLElement, container: HTMLElement): number {
    const rect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate the percentage of the element visible within the container
    const visibleHeight = Math.min(rect.bottom, containerRect.bottom) - Math.max(rect.top, containerRect.top);
    const percentage = (visibleHeight / el.offsetHeight) * 100;

    return Math.max(0, percentage);
  }

  private findMostVisibleSection(): string {
    let maxVisibility = 0;
    let mostVisibleSection = '';

    // Iterate through the map to find the section with the maximum visibility percentage
    this.sectionVisibilityMap.forEach((visibility, sectionId) => {
      if (visibility > maxVisibility) {
        maxVisibility = visibility;
        mostVisibleSection = sectionId;
      }
    });

    return mostVisibleSection;
  }

}
