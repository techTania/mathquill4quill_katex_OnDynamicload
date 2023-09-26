import { Component, Renderer2 } from '@angular/core';
import 'mathquill4quill';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'quill-editor';
  enableKatex = false;
  QuillConfiguration = {};

  constructor(public _renderer: Renderer2) { }

  ngOnInit(): void {

    this.loadCScriptconfig();
  }
  loadCScriptconfig() {

    this.loadkatex();
    this.loadConfiguredStyles();
  }
loadkatex()
{
   const self = this;
    const script = this._renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.js';
    script.setAttribute('crossorigin', 'anonymous');
    script.onload = (data: any) => {
      (window as any).katex = data;
      self.loadJquery();
      console.log('done 1')
    }
    document.getElementsByTagName('head')[0].appendChild(script)
}
  loadJquery() {
    const self = this;
    const script = this._renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js';
    script.setAttribute('crossorigin', 'anonymous');
    script.onload = (data: any) => {
      self.loadmathmin();

      console.log('done 2')
    }
    document.getElementsByTagName('head')[0].appendChild(script)

  }
  loadmathmin() {
    const self = this;
    const script = this._renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.jsdelivr.net/npm/@edtr-io/mathquill@0.11.0/build/mathquill.min.js';
    script.setAttribute('crossorigin', 'anonymous');
    script.onload = (data: any) => {

      self.QuillConfiguration = {
        formula: true,
        toolbar: [
          ["formula"],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          ['link'],
          ['clean'],
        ],
      };
      self.enableKatex = true;
      console.log('done 3')
    }
    document.getElementsByTagName('head')[0].appendChild(script)
  }


  loadConfiguredStyles() {

    const cssFiles = [
      {
        url: 'https://cdn.jsdelivr.net/npm/@edtr-io/mathquill@0.11.0/build/mathquill.css',
        integrity: 'sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X'
      }
    ];
    const promises: any[] = [];
    cssFiles.forEach((link) => promises.push(this.loadStyles(link)));
    Promise.all(promises).then(function (data) {

    })
  }
  loadStyles(linkPathobj: any) {
    console.log('createStyles loaded')
    return new Promise((resolve, reject) => {
      const link = this._renderer.createElement('link');
      link.rel = 'stylesheet';
      link.href = linkPathobj.url;
      link.classList.add('dynamic-css');
      link.onload = () => {
        resolve({
          url: linkPathobj.url,
          isLoaded: true
        })
      }
      link.onerror = (error: any) => resolve({ link: linkPathobj.url, loaded: false, status: 'Loaded', error: error });
      document.getElementsByTagName('head')[0].appendChild(link)
    })
  }
  onEditorCreated(quill: any) {
    (window as any).mathquill4quill({ Quill: quill })(quill, {
      operators: [
      ["\+", "\+"],
      ["\\times", "\\times"],
      ["\\div", "\\div"],
      ["\\log{x}", "\\log{x}"],
      ["\\log_{a} {b}", "\\log_{a} {b}"],
      ["\\pm", "\\pm"],
      ["\\sqrt{x}", "\\sqrt"],
      ["\\sqrt[n]{x}", "\\nthroot"],
      ["\\frac{x}{y}", "\\frac"],
      ["x^n", "{x}^{n}"],
      ["x_a", "{x}_{a}"]
    ]
    });
  }
}
