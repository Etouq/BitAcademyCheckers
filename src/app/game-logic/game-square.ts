import { GamePiece } from "./game-piece";
import { MoveDirection } from "./move-direction";

export class GameSquare {

  // identifier of the html element that represents this square
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

  getCenterCoordinates(): [number, number] {
    const squareElementRect = (document.getElementById(this.identifier) as HTMLElement).getBoundingClientRect();
    const boardContainerRect = (document.getElementById('board-container') as HTMLElement).getBoundingClientRect();

    return [
      squareElementRect.left - boardContainerRect.left + squareElementRect.width / 2,
      squareElementRect.top - boardContainerRect.top + squareElementRect.height / 2
    ];
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
