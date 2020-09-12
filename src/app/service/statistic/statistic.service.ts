import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  public statistic = [];

  constructor() { }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sorting(sort: Sort, statistic) {
    this.statistic = statistic.slice();
    const data = statistic.slice();
    if (!sort.active || sort.direction === '') {
      this.statistic = data;
      return;
    }

    this.statistic = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'number_of_cards': return this.compare(a.number_of_cards, b.number_of_cards, isAsc);
        case 'number_of_attempts': return this.compare(a.number_of_attempts, b.number_of_attempts, isAsc);
        case 'number_of_removed_cards': return this.compare(a.number_of_removed_cards, b.number_of_removed_cards, isAsc);
        case 'total_duration': return this.compare(a.total_duration, b.total_duration, isAsc);
        case 'successfull_game?': return this.compare(a["successfull_game?"], b["successfull_game?"], isAsc);
        case 'game_percentage': return this.compare(a.game_percentage, b.game_percentage, isAsc);
        default: return 0;
      }
    });
  }
}
