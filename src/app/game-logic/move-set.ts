import { GamePiece } from "./game-piece";
import { GameSquare } from "./game-square";

export class MoveSet {


  get endPosition(): GameSquare {
    return this.moves[this.moves.length - 1];
  }

  jumpedPieces = new Set<GamePiece>();

  moves: GameSquare[] = [];

  constructor(moves: GameSquare[], jumpedPieces?: Iterable<GamePiece>) {
    this.jumpedPieces = new Set<GamePiece>(jumpedPieces || []);
    this.moves = moves;
  }

  static newMoveSetFrom(moveSet: MoveSet, endPosition: GameSquare, jumpedPiece?: GamePiece): MoveSet {
    if (jumpedPiece) {
      return new MoveSet(moveSet.moves.concat([endPosition]), [...moveSet.jumpedPieces.values(), jumpedPiece]);
    }
    return new MoveSet(moveSet.moves.concat([endPosition]), moveSet.jumpedPieces);
  }

}
