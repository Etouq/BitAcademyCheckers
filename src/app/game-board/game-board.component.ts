import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent implements OnInit {

  readonly boardSize = 10;

  readonly rows = Array(this.boardSize).fill(0).map((x, i) => 10 - i);
  readonly columns = Array(this.boardSize).fill(0).map((x, i) => String.fromCharCode(65 + i));

  constructor() { }

  ngOnInit(): void {
  }

  colNumToLetter(colNum: number): string {
    return String.fromCharCode(65 + colNum);
  }

}
