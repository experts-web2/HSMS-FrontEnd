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
  @Output() sectionVisible = new EventEmitter<{ isVisible: boolean; sectionId: string }>();

  constructor(private el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  checkVisibility() {
    const container = this.el.nativeElement;
    const childSections = container.querySelectorAll('section');

    childSections.forEach((section: HTMLElement) => {
      const isSectionVisible = this.isElementInContainer(section, container);
      this.sectionVisible.emit({ isVisible: isSectionVisible, sectionId: section.id });
    });
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

}
