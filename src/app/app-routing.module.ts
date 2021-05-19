import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserComponent } from './browser/browser.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { UploadPageComponent } from './upload-page/upload-page.component';

const routes: Routes = [
  { path: 'upload', component: UploadPageComponent },
  { path: 'browse', component: BrowserComponent },
  { path: 'history', component: HistoryPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  UploadPageComponent,
  BrowserComponent,
  HistoryPageComponent,
];
