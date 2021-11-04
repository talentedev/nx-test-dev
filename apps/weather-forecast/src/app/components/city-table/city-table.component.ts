import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Weather } from '../../models/weather';

@Component({
  selector: 'bp-city-table',
  templateUrl: './city-table.component.html',
  styleUrls: ['./city-table.component.scss']
})
export class CityTableComponent implements OnInit {

  @Input() city: String|null = null;
  @Input() mode = 'daily';
  @Input() weather: ReadonlyArray<Weather> | null = [];
  period: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initTable();
  }

  initTable() {
    let date = new Date();
    if(this.mode == 'daily') {
      this.period = [];
      for(let i = 0; i < 7; i++) {
        date.setDate(date.getDate() + 1);
        this.period.push(date.getDate());
      }
    } else {
      this.period = [];
      for(let i = 0; i < 8; i++) {
        date.setHours(date.getHours() + 3);
        this.period.push(`${date.getHours()} - ${date.getHours() + 3}`);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
      this.initTable();
  }

}
