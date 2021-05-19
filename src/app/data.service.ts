import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private valueSource = new BehaviorSubject('');
  currentMessage = this.valueSource.asObservable();

  constructor() {}

  changeMessage(newPath: string) {
    this.valueSource.next(newPath);
  }
}
