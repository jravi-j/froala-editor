import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { BlurEvent } from "@ckeditor/ckeditor5-angular";
import { StringNullOrEmpty } from "src/app/utils/string-null-or-empty.function";
import * as ClassicEditor from "../../../../assets/editor/ckeditor";

@Component({
  selector: "app-html-editor-input",
  templateUrl: "./html-editor-input.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HtmlEditorInputComponent),
      multi: true
    }
  ]
})
export class HtmlEditorInputComponent implements ControlValueAccessor {
  @Input() set emailSignature(input: string) {
    let signature = input;
    if (!signature) {
      signature = "<p></p>";
    }

    if (!this.editor) {
      return;
    }
    const regexTestForSignature = new RegExp(
      /<section class="signature"><div class="signature-content">(.|\n)*?<\/div><\/section>/
    );
    if (regexTestForSignature.test(this.myValue)) {
      this.myValue = this.myValue.replace(
        regexTestForSignature,
        `<section class="signature"><div class="signature-content">${signature}</div></section>`
      );
    } else {
      this.myValue =
        this.myValue +
        `<section class="signature"><div class="signature-content">${signature}</div></section>`;
    }
    this.editor.setData(this.myValue);
    this._onchange(this.myValue);
  }
  @Output() blur = new EventEmitter();

  htmlEditor = ClassicEditor;
  config = {};

  private _defaultValue = "<p><br></p>";
  myValue: string = this._defaultValue;
  disabled = false;
  private editor: any;

  editorReady(edtr) {
    if (this.myValue) {
      edtr.setData(this.myValue);
    }
    this.editor = edtr;
  }

  writeValue(obj: any): void {
    if (StringNullOrEmpty(obj)) {
      obj = this._defaultValue;
    }
    this.myValue = obj;
    if (this.editor && obj) {
      this.editor.setData(obj);
    }
  }

  registerOnChange(fn: any): void {
    this._onchange = fn;
  }

  registerOnTouched(fn: any): void {
    // do nothing
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // valueChange({ editor }: ChangeEvent) {
  //   const value = editor.getData();
  //   if (value === this.myValue) {
  //     return;
  //   }

  //   this.myValue = value;

  //   this._onchange(this.myValue);
  // }
  blurEvent({ event, editor }: BlurEvent) {
    const value = editor.getData();
    if (value === this.myValue) {
      return;
    }

    this.myValue = value;

    this._onchange(this.myValue);
    this.blur.emit(event);
  }

  private _onchange = (_: any) => {};
}
