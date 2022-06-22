import { GamePiece } from "./game-piece";
import { GameSquare } from "./game-square";

export class MoveSet {

  endPosition: GameSquare;

  jumpedPieces = new Set<GamePiece>();

  constructor(startPosition: GameSquare, jumpedPieces?: Iterable<GamePiece>) {
    this.endPosition = startPosition;
    this.jumpedPieces = new Set<GamePiece>(jumpedPieces || []);
  }

}
