import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { TranslateModule } from "@ngx-translate/core";
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
import "froala-editor/js/languages/nl.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/word_paste.min.js";
import { HtmlEditorInputComponent } from "./html-editor-input.component";
import { NewHtmlEditorInputComponent } from "./n-html-editor-input.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CKEditorModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    TranslateModule.forChild({ isolate: false })
  ],
  declarations: [HtmlEditorInputComponent, NewHtmlEditorInputComponent],
  exports: [HtmlEditorInputComponent, NewHtmlEditorInputComponent]
})
export class HtmlEditorModule {}
