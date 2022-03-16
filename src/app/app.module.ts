import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FroalaEditorModule } from "angular-froala-wysiwyg/editor/editor.module.js";
import { FroalaViewModule } from "angular-froala-wysiwyg/view/view.module.js";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
