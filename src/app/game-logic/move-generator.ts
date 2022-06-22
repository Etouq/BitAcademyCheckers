import { GamePiece } from "./game-piece";
import { GameSquare } from "./game-square";
import { MoveDirection, moveDirections } from "./move-direction";
import { MoveSet } from "./move-set";


export class MoveGenerator {

  /**
   * Generate all the moves that can be made by the given piece
   * @param {GamePiece} piece - GamePiece - The piece that we want to generate moves for.
   * @returns An array of valid MoveSets.
   */
  static generateMoves(piece: GamePiece): MoveSet[] {
    if (piece.isKing) {
      return MoveGenerator.generateKingMovesFromSet(new MoveSet([piece.position]), piece);
    }

    return MoveGenerator.generateMovesFromSet(new MoveSet([piece.position]), piece);
  }

  /**
   * Generate all the moves that can be made from the given move set
   * @param {MoveSet} moveSet - The starting moveset to check from (for intermediate positions in moves)
   * @param {GamePiece} piece - The piece we're generating moves for
   * @returns An array of valid MoveSets.
   */
  private static generateMovesFromSet(moveSet: MoveSet, piece: GamePiece): MoveSet[] {
    const validMoves: MoveSet[] = [];

    // check all the directions we can move in
    for (const direction of moveDirections) {
      // check if we're allowed to move in this direction (all directions are allowed after the first jump)
      if (moveSet.jumpedPieces.size === 0 && !piece.canMoveDirection(direction)) {
        continue;
      }

      const move = MoveGenerator.checkMoveInDirection(direction, moveSet.endPosition, moveSet.jumpedPieces, piece);


      // check move is valid
      if (!move || (!move.jumpedPiece && moveSet.jumpedPieces.size > 0)) {
        continue;
      }

      // if we did not jump a piece the move ends
      if (!move.jumpedPiece) {
        validMoves.push(MoveSet.newMoveSetFrom(moveSet, move.endPoint));
        continue;
      }

      // if we jumped a piece, continue checking moves from this point
      validMoves.push(...MoveGenerator.generateMovesFromSet(MoveSet.newMoveSetFrom(moveSet, move.endPoint, move.jumpedPiece), piece));
    }

    if (validMoves.length === 0) {
      // no moves were possible
      if (moveSet.endPosition === piece.position) {
        return [];
      }
      // we could not create any further moves so the starting moveset is the maximum
      return [moveSet];
    }

    // keep only the moves with the most jumps
    const maxJumps = Math.max(...validMoves.map(m => m.jumpedPieces.size));
    return validMoves.filter(m => m.jumpedPieces.size === maxJumps);
  }

  /**
   * Generate all the moves that can be made by a king piece from the given move set
   * @param {MoveSet} moveSet - The starting moveset to check from (for intermediate positions in moves)
   * @param {GamePiece} piece - The piece we're generating moves for
   * @returns An array of valid MoveSets.
   */
  private static generateKingMovesFromSet(moveSet: MoveSet, piece: GamePiece): MoveSet[] {
    const validMoves: MoveSet[] = [];

    // check all the directions we can move in
    for (const direction of moveDirections) {

      const move = MoveGenerator.checkKingMoveInDirection(direction, moveSet.endPosition, moveSet.jumpedPieces, piece);

      // check move is valid
      if (!move) {
        continue;
      }

      // if we did not jump a piece the move ends
      if (!move.jumpedPiece) {
        validMoves.push(...move.validMoves.map(moveEndpoint => MoveSet.newMoveSetFrom(moveSet, moveEndpoint)));
        continue;
      }

      // if we jumped a piece, continue checking moves from this point
      for (const endPoint of move.validMoves) {
        validMoves.push(...MoveGenerator.generateKingMovesFromSet(MoveSet.newMoveSetFrom(moveSet, endPoint, move.jumpedPiece), piece));
      }
    }

    if (validMoves.length === 0) {
      // we could not create any further moves so the starting moveset is the maximum
      return [moveSet];
    }

    // keep only the moves with the most jumps
    const maxJumps = Math.max(...validMoves.map(m => m.jumpedPieces.size));
    return validMoves.filter(m => m.jumpedPieces.size === maxJumps);
  }

  /**
   * If the piece can make a normal (single step or one step jump) move in the given direction, return the square it
   * would move to, otherwise return false
   * @param {MoveDirection} direction - The direction we're checking for a move in
   * @param {GameSquare} startPosition - The square we're moving from (assumed to contain a piece)
   * @param {Set<GamePiece>} jumpedPieces - The set of all the pieces that have been jumped in the moveset we're
   * checking.
   * @param {GamePiece} piece - The piece that's making the move
   * @returns The position the move would end in and the possibly jumped piece if the move is valid, false otherwise
   */
  private static checkMoveInDirection(direction: MoveDirection, startPosition: GameSquare,
                                      jumpedPieces: Set<GamePiece>,
                                      piece: GamePiece): { endPoint: GameSquare, jumpedPiece?: GamePiece } | false {

    let nextPosition = startPosition.getSquareInDirection(direction);

    // if the move would move us off the board it is invalid
    if (!nextPosition) {
      return false;
    }

    // if the square is empty we can move there
    if (!nextPosition.piece) {
      return {endPoint: nextPosition, jumpedPiece: undefined};
    }

    // if the piece has already been jumped we cannot jump it again
    if (jumpedPieces.has(nextPosition.piece)) {
      return false;
    }

    // the square is occupied so check if we can jump it
    if (nextPosition.piece.white !== piece.white) {
      // store the jumped piece to return it
      const jumpedPiece = nextPosition.piece;
      // not the same color so check if the square behind it is empty and on the board
      nextPosition = nextPosition.getSquareInDirection(direction);
      if (nextPosition && !nextPosition.piece) {
        return {endPoint: nextPosition, jumpedPiece: jumpedPiece};
      }
    }

    return false;
  }

  /**
   * If we can move in the given direction, return the squares we can move to, otherwise return false.
   * @param {MoveDirection} direction - The direction we're checking for a move in
   * @param {GameSquare} startPosition - The position of the piece we're moving
   * @param {Set<GamePiece>} jumpedPieces - this is a set of all the pieces that have been jumped so far in the move.
   * @param {GamePiece} piece - The piece we're generating moves for
   * @returns an object with two properties: the valid end position and the jumped piece if it exists, false if no
   * valid move could be made.
   */
  private static checkKingMoveInDirection(direction: MoveDirection, startPosition: GameSquare,
                                          jumpedPieces: Set<GamePiece>,
                                          piece: GamePiece): { validMoves: GameSquare[], jumpedPiece?: GamePiece } | false {

    // if the next square is off the board, we can't move there
    if (!startPosition.getSquareInDirection(direction)) {
      return false;
    }


    let jumpedPiece: GamePiece | undefined;

    // check reverse from the last square we can move to

    // find last square we can move to
    let lastValidSquare = startPosition;
    while (true) {

      const moveStepEndPoint = MoveGenerator.checkMoveInDirection(direction, lastValidSquare, jumpedPieces, piece);

      // if we cannot move to the next square, we've reached the furthest position we can move to
      if (!moveStepEndPoint) {
        break;
      }

      if (moveStepEndPoint.jumpedPiece) {
        // the move made a jump
        if (jumpedPiece) {
          break;
        } // we cannot make the move if we've already jumped a piece

        jumpedPiece = moveStepEndPoint.jumpedPiece;
      }

      lastValidSquare = moveStepEndPoint.endPoint;

    }

    // we cannot move any number of squares in the given direction
    if (lastValidSquare === startPosition) {
      return false;
    }

    // if the move has not made a jump, but we've made a jump before we're not allowed to move in the given direction
    if (!jumpedPiece && jumpedPieces.size > 0) {
      return false;
    }

    // we must jump if we can, otherwise we can move anywhere until the last valid square
    const firstValidSquare = (jumpedPiece ? jumpedPiece.position : startPosition).getSquareInDirection(direction)!;

    const possibleMoves: GameSquare[] = [firstValidSquare];
    let currentSquare = firstValidSquare;
    while (currentSquare !== lastValidSquare) {
      currentSquare = currentSquare.getSquareInDirection(direction)!;
      possibleMoves.push(currentSquare);
    }

    return {validMoves: possibleMoves, jumpedPiece: jumpedPiece};
  }


}
