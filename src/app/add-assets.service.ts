import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class AddAssetsService {
  private renderer: Renderer2;

  constructor(private meta: Meta, private title: Title, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }


  public initClient(): void {
    // this.removeExistingMetaTags();
    this.addNewMetaTags();

    // this.addScriptToBody('https://code.jquery.com/jquery-3.4.1.min.js');
    // this.addScriptToBody('https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js');
    // this.addScriptToBody('/assets/lib/easing/easing.min.js');
    // this.addScriptToBody('/assets/lib/waypoints/waypoints.min.js');
    // this.addScriptToBody('/assets/lib/owlcarousel/owl.carousel.min.js');
    // this.addScriptToBody('/assets/js/main.js');
  }

  public removeExistingMetaTags() {
    const head = document.getElementsByTagName('head')[0];
    const links = head.querySelectorAll('link');
    const scripts = head.querySelectorAll('script');
    links.forEach(link => {
      head.removeChild(link);
    });
    scripts.forEach(script => {
      head.removeChild(script);
    });
  }

  public addNewMetaTags() {
    const head = document.getElementsByTagName('head')[0];

    // Thêm các thẻ link và script mới vào head
    const metaTags: any = [
      {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true},
      {
        href: 'https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600&family=Nunito:wght@600;700;800&display=swap',
        rel: 'stylesheet'
      },
      {href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css', rel: 'stylesheet'},
      {href: '/assets/css/style.css', rel: 'stylesheet'},
    ];

    metaTags.forEach((tag: any) => {
      const newTag = document.createElement('link');
      Object.keys(tag).forEach(key => {
        newTag.setAttribute(key, tag[key]);
      });
      head.appendChild(newTag);
    });
  }

  public addScriptToBody(src: string): void {
    const script = this.renderer.createElement('script');
    script.src = src;
    this.renderer.appendChild(document.body, script);
  }

}
