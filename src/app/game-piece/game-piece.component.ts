import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { GamePiece } from "../game-logic/game-piece";
import { MoveSet } from "../game-logic/move-set";

@Component({
  selector: 'app-game-piece',
  templateUrl: './game-piece.component.html',
  styleUrls: ['./game-piece.component.scss']
})
export class GamePieceComponent implements OnInit {

  @Output() pieceClicked: EventEmitter<GamePieceComponent> = new EventEmitter();
  @Output() moveCompleted: EventEmitter<MoveSet> = new EventEmitter();

  isActivePiece = false;

  private _piece!: GamePiece;
  get piece(): GamePiece {
    return this._piece;
  }
  @Input() set piece(piece: GamePiece) {
    [this.centerX, this.centerY] = piece.position.getCenterCoordinates();
    this._piece = piece;
  };

  animationPath = "path('M0,0')";
  animating = false;
  animationDuration = 500;

  centerX!: number;
  centerY!: number;

  private newCenterX = 0;
  private newCenterY = 0;

  private moveSet?: MoveSet;

  constructor() { }

  ngOnInit(): void {
  }

  executeMoveSet(moveSet: MoveSet) {
    this.moveSet = moveSet;

    [this.newCenterX, this.newCenterY] = moveSet.endPosition.getCenterCoordinates();

    this.animationDuration = (moveSet.moves.length - 1) * 500;

    this.animationPath = `path('M0,0`;

    // skip starting position
    for (let idx = 1; idx < moveSet.moves.length; idx++) {
      const [x, y] = moveSet.moves[idx].getCenterCoordinates();
      this.animationPath += ` L${x - this.centerX},${y - this.centerY}`;
    }

    this.animationPath += `')`;

    this.animating = true;
  }

  onPieceClicked() {
    this.pieceClicked.emit(this);
  }

  animationDone() {
    this.animating = false;
    this.centerX = this.newCenterX;
    this.centerY = this.newCenterY;

    this.piece.moveTo(this.moveSet!.endPosition);
    this.moveCompleted.emit(this.moveSet!);
    this.moveSet = undefined;
  }

}
