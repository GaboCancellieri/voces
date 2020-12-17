import { NgModule } from '@angular/core';
import { SafePipe } from './safeUrl.pipe';
import { SanitizeHtmlPipe } from './sanitizeHTML.pipe';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [
    SafePipe,
    SanitizeHtmlPipe,
  ],
  exports: [
    SafePipe,
    SanitizeHtmlPipe,
  ]
})
export class PipesModule {}
