import { Component, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppComponent),
      multi: true
    }
  ]
})
export class AppComponent implements ControlValueAccessor {
  title = "CodeSandbox";

  options: Object = {
    attribution: false, // Removes the Powered By Froala message
    charCounterCount: true,
    enter: 2, // 2 equals: FroalaEditor.ENTER_BR
    useClasses: false,
    fullPage: true,
    fontSizeDefaultSelection: "14",
    fontSizeSelection: true,
    fontSize: ["8", "10", "12", "14", "18", "30", "60", "96"],
    key:
      "SDB17hB8D6A5B3E3F3gKTRe2CG1PGe1DESAe1Kg1EBC1Pe2TKoF4I4B3A9A3A5F5B2C3D4==", // the Froala License key
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

  private _defaultValue = "Hello Froala, this is the <problem>";
  myValue: string = this._defaultValue;

  writeValue(obj: any): void {
    obj = this._defaultValue;

    this.myValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // do nothing
  }

  onChange = (_: any) => {};
}
