import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent {
  @Input('is-favorite') isSelected: boolean;
  @Output() change = new EventEmitter();

  onClick() {
    this.isSelected = !this.isSelected;

    this.change.emit({ newValue: this.isSelected });
  }
}

export interface FavoriteChnagedEventArgs {
  newValue: boolean
}

