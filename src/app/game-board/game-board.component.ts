import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent implements OnInit {

  readonly numRows = 8;
  readonly numColumns = 8;

  readonly rowNums = Array(this.numRows).fill(0).map((x, i) => i);
  readonly colNums = Array(this.numColumns).fill(0).map((x, i) => i);

  readonly grid = Array(this.numRows).fill(null).map(() => Array(this.numColumns).fill(null));

  constructor() { }

  ngOnInit(): void {
  }

  colNumToLetter(colNum: number): string {
    return String.fromCharCode(65 + colNum);
  }

}
