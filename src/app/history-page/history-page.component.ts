import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css'],
})
export class HistoryPageComponent implements OnInit {
  constructor(private data: DataService) {
    data.currentMessage.subscribe((val) => {
      this.inputValue = val;
      this.items.push(this.inputValue);
      localStorage.setItem('items', JSON.stringify(this.items));
    });
  }
  items: string[] = [];
  inputValue: string | undefined;
  localStorage: string | undefined;

  clearHistory = () => {
    this.items = [];
  };

  ngOnInit(): void {}
}
