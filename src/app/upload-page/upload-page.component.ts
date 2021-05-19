import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css'],
})
export class UploadPageComponent implements OnInit {
  constructor(private data: DataService) {
    data.currentMessage.subscribe((val) => {
      this.inputValue = val;
    });
  }
  isButtonClicked = false;
  progressbarValue = 0;
  progressbarFilled = false;
  curSec: number = 1;
  inputValue: string | undefined;
  items: string[] = [];

  onUploadClick = (seconds: number, newItem: string) => {
    this.isButtonClicked = true;

    const timer$ = interval(100);

    const sub = timer$.subscribe((sec) => {
      if (this.progressbarValue < 100) {
        this.progressbarValue = 0 + (sec * 10) / seconds;
        this.curSec = sec;
      } else {
        this.progressbarValue = 100;
        this.progressbarFilled = true;
        this.items.push(newItem);
        sub.unsubscribe();
      }
    });
  };

  ngOnInit(): void {}
}
