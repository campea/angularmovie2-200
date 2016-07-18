import {Directive, ElementRef, Renderer} from '@angular/core';
import {Http} from '@angular/http';

@Directive({
  selector: '[lazy]',
  inputs: ['url:lazy'],
  host: {
    '(click)': 'load()'
  }
})
export class Lazy {
  hasLoad: boolean;
  url: string;
  element: ElementRef;
  http: Http;
  renderer: Renderer;
  root: string = 'http://127.0.0.1:9000';

  constructor(element: ElementRef, renderer: Renderer, http: Http) {
    this.element = element;
    this.http = http;
    this.renderer = renderer;
  }

  load() {
    if (!this.hasLoad) {
      this.http.get(this.root + this.url).map(res => res.json()).subscribe((data) => {
        this.setInner(data);
      });
    }
  }

  setInner(content) {
    this.renderer.setElementProperty(this.element.nativeElement, 'innerHTML', content);
    this.hasLoad = true;
  }
}
