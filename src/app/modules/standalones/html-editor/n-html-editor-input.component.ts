import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  OnInit
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { StringNullOrEmpty } from "src/app/utils/string-null-or-empty.function";

@Component({
  selector: "app-new-html-editor-input",
  template: `
    <textarea
      [(froalaModel)]="myValue"
      (froalaModelChange)="onChange($event)"
      [froalaEditor]="options"
    ></textarea>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewHtmlEditorInputComponent),
      multi: true
    }
  ]
})
export class NewHtmlEditorInputComponent
  implements ControlValueAccessor, OnInit {
  @Input() set emailSignature(input: string) {
    this.setSignature(input);
  }
  @Output() blur = new EventEmitter();

  options: Object = {
    attribution: false, // Removes the Powered By Froala message
    charCounterCount: true,
    enter: 2, // 2 equals: FroalaEditor.ENTER_BR
    useClasses: false,
    fullPage: true,
    fontSizeDefaultSelection: "14",
    fontSizeSelection: true,
    fontSize: ["8", "10", "12", "14", "18", "30", "60", "96"],
    key: "?????", // the Froala License key
    language: "nl",
    fontFamilyDefaultSelection: "Arial",
    fontFamilySelection: true,
    heightMin: 200,
    htmlExecuteScripts: false,
    iframeStyle: "body table tr td, body table tr th { border: 0; }",
    placeholderText: undefined,
    toolbarButtons: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "backgroundColor",
          "inlineClass",
          "inlineStyle",
          "clearFormatting"
        ],
        buttonsVisible: 6
      },
      moreText2: {
        buttons: ["fontFamily", "fontSize", "textColor"]
      },
      moreRich: {
        buttons: ["insertLink", "insertImage", "insertTable"]
      },
      moreMisc: {
        buttons: ["undo", "redo", "html"],
        align: "right",
        buttonsVisible: 3
      }
    },
    fontFamily: {
      "Arial,Helvetica,sans-serif": "Arial",
      "Georgia,serif": "Georgia",
      "Impact,Charcoal,sans-serif": "Impact",
      "Tahoma,Geneva,sans-serif": "Tahoma"
    },
    events: {
      "image.beforeUpload": function(files) {
        const editor = this;
        if (files.length) {
          // Create a File Reader.
          const reader = new FileReader();
          // Set the reader to insert images when they are loaded.
          reader.onload = function(e: any) {
            const result = e.target.result;
            editor.image.insert(result, null, null, editor.image.get());
          };
          // Read image as base64.
          reader.readAsDataURL(files[0]);
        }
        editor.popups.hideAll();
        // Stop default upload chain.
        return false;
      }
    }
  };

  private _defaultValue = undefined;
  myValue: string = this._defaultValue;

  ngOnInit() {
    this.setSignature();
  }

  writeValue(obj: any): void {
    if (StringNullOrEmpty(obj)) {
      obj = this._defaultValue;
    }
    this.myValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // do nothing
  }

  onChange = (_: any) => {};

  private setSignature(input?: string) {
    let signature = input;
    if (!signature) {
      signature = "";
    }

    const bodyContentRegex = /<body[^>]*>([\s\S]*)<\/body>/gi; // named capture groups does not work
    const signatureBodyMatches = bodyContentRegex.exec(input);
    if (signatureBodyMatches) {
      const signatureBody = signatureBodyMatches[1]; // this is the capture group
      if (!StringNullOrEmpty(signatureBody)) {
        signature = signatureBody;
      }
    }

    if (StringNullOrEmpty(this.myValue)) {
      this.myValue = `<!DOCTYPE html><html><head><title></title></head><body><br><br><div class="signature-content">${signature}</div></body></html>`;
    } else {
      const doc = new DOMParser().parseFromString(this.myValue, "text/html");
      const elements = doc.getElementsByClassName("signature-content");
      if (elements.length > 0) {
        const signatureContent = new DOMParser().parseFromString(
          `<div class="signature-content">${signature}</div>`,
          "text/html"
        );
        elements.item(0).replaceWith(signatureContent.body.firstChild);
      } else {
        const signatureContent = new DOMParser().parseFromString(
          `<div class="signature-content">${signature}</div>`,
          "text/html"
        );
        doc.body.appendChild(document.createElement("br"));
        doc.body.appendChild(document.createElement("br"));
        doc.body.appendChild(signatureContent.body.firstChild);
      }
      this.myValue = doc.documentElement.innerHTML;
    }
    this.onChange(this.myValue);
  }
}
