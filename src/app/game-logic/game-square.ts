import { GamePiece } from "./game-piece";
import { MoveDirection } from "./move-direction";

export class GameSquare {

  readonly identifier: string;

  piece?: GamePiece;

  // square above and left if viewed from white's perspective (undefined if we're at the edge) (similarly for the rest)
  squareTopLeft?: GameSquare;
  squareTopRight?: GameSquare;
  squareBottomLeft?: GameSquare;
  squareBottomRight?: GameSquare;

  constructor(identifier: string) {
    this.identifier = identifier;
  }

  getSquareInDirection(direction: MoveDirection): GameSquare | undefined {
    switch (direction) {
      case MoveDirection.LEFT_UP:
        return this.squareTopLeft;
      case MoveDirection.LEFT_DOWN:
        return this.squareBottomLeft;
      case MoveDirection.RIGHT_UP:
        return this.squareTopRight;
      case MoveDirection.RIGHT_DOWN:
        return this.squareBottomRight;
    }
  }

}
