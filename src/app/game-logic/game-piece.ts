import { GameSquare } from "./game-square";
import { MoveDirection } from "./move-direction";

export class GamePiece {

  private readonly _white: boolean;
  get white(): boolean {
    return this._white;
  }
  get black(): boolean {
    return !this.white;
  }

  private _isKing = false;

  get isKing(): boolean {
    return this._isKing;
  }

  private _position: GameSquare;
  get position(): GameSquare {
    return this._position;
  }

  constructor(white: boolean, position: GameSquare) {
    this._white = white;
    this._position = position;
    position.piece = this;
  }

  reset(position: GameSquare): void {
    this._position.piece = undefined;
    this._position = position;
    this._isKing = false;
    position.piece = this;
  }

  moveTo(square: GameSquare): void {
    this._position.piece = undefined;
    this._position = square;
    square.piece = this;

    if (!this._isKing) {
      if ((this._white && !this._position.squareTopLeft && !this._position.squareTopRight) ||
          (!this._white && !this._position.squareBottomLeft && !this._position.squareBottomRight)) {
        // we're at the opposite edge of the board, so we promote to king
        this._isKing = true;
      }
    }
  }

  removeFromBoard(): void {
    this._position.piece = undefined;
  }

  canMoveDirection(direction: MoveDirection): boolean {
    switch (direction) {
      case MoveDirection.LEFT_UP:
        return this._white;
      case MoveDirection.LEFT_DOWN:
        return !this._white;
      case MoveDirection.RIGHT_UP:
        return this._white;
      case MoveDirection.RIGHT_DOWN:
        return !this._white;
    }
  }
}
