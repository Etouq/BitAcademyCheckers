import { GamePiece } from "./game-piece";
import { GameSquare } from "./game-square";
import { MoveGenerator } from "./move-generator";
import { MoveSet } from "./move-set";

export class GameRunner {

  // number of squares on each edge of the board
  readonly boardSize = 10;

  // row and column identifiers
  readonly rows = Array(this.boardSize).fill(0).map((x, i) => 10 - i);
  readonly columns = Array(this.boardSize).fill(0).map((x, i) => String.fromCharCode(65 + i));

  // list of all black squares (since white isn't used in play)
  private gameSquares: GameSquare[] = [];

  // list of all allowed moves for the current player, indexed by the piece that makes them
  activeMoves = new Map<GamePiece, MoveSet[]>();

  currentPlayerWhite: boolean = true;

  // when true, the current player is the winner
  gameOver: boolean = false;

  // list of all pieces still in game for each side
  whitePieces!: GamePiece[];
  blackPieces!: GamePiece[];

  constructor() {
    this.setupSquares();
    this.resetPieces();

    this.generateMoves(this.currentPlayerWhite);
  }

  resetGame(): void {
    this.resetPieces();
    this.gameOver = false;
    this.currentPlayerWhite = true;
    this.generateMoves(this.currentPlayerWhite);
  }

  executeMove(move: MoveSet): void {
    // remove the jumped pieces
    for (const jumpedPiece of move.jumpedPieces) {
      jumpedPiece.removeFromBoard();
    }

    // remove the jumped pieces from the list of pieces
    if (this.currentPlayerWhite) {
      this.blackPieces = this.blackPieces.filter(p => !move.jumpedPieces.has(p));
      if (this.blackPieces.length == 0) { // if the other player has no pieces left, the current player wins
        this.gameOver = true;
      }
    }
    else {
      this.whitePieces = this.whitePieces.filter(p => !move.jumpedPieces.has(p));
      if (this.whitePieces.length == 0) {
        this.gameOver = true;
      }
    }

    if (!this.gameOver) {
      // generate moves for the next player
      this.generateMoves(!this.currentPlayerWhite);
    }

    // if no moves are possible it's game over
    if (this.activeMoves.size == 0) {
      this.gameOver = true;
    }

    // if not game over, switch to the next player
    if (!this.gameOver) {
      this.currentPlayerWhite = !this.currentPlayerWhite;
    }

  }

  /**
   * Generates all possible moves for the current player, and then filters out any moves that don't have the maximum
   * number of jumps
   * @param {boolean} white - whether the moves being generated are for white pieces
   */
  generateMoves(white: boolean): void {
    // clear the current list of allowed moves
    this.activeMoves.clear();

    // maximum number of jumps among all found movesets
    let maxJumps = 0;

    for (const piece of (white ? this.whitePieces : this.blackPieces)) {
      const moves = MoveGenerator.generateMoves(piece);

      maxJumps = Math.max(maxJumps, ...moves.map(m => m.jumpedPieces.size));
      this.activeMoves.set(piece, moves);
    }

    // filter out movesets that don't have the maximum number of jumps
    for (const piece of this.activeMoves.keys()) {
      this.activeMoves.set(piece, this.activeMoves.get(piece)!.filter(m => m.jumpedPieces.size == maxJumps));
    }
  }

  /**
   * Resets the game by emptying the lists of pieces, clearing all squares of pieces, creating new pieces and
   * placing them on the board
   */
  private resetPieces(): void {
    // empty the lists of pieces
    this.whitePieces = [];
    this.blackPieces = [];

    // clear all squares of pieces
    for (const square of this.gameSquares) {
      square.piece = undefined;
    }

    const numPieces = 20;

    for (let i = 0; i < numPieces; i++) {
      // lower indices are top squares so first numPieces squares contain a black piece
      this.blackPieces.push(new GamePiece(false, this.gameSquares[i]));

      // higher indices are bottom squares so last numPieces squares contain a white piece
      this.whitePieces.push(new GamePiece(true, this.gameSquares[this.gameSquares.length - 1 - i]));
    }

  }

  /**
   * Creates and then links the board squares
   */
  private setupSquares(): void {
    const squaresMap = new Map<string, GameSquare>(); // for easy lookup of squares by identifier when linking
    // create squares
    for (let rIdx = 0; rIdx < this.boardSize; rIdx++) {
      for (let cIdx = 0; cIdx < this.boardSize; cIdx++) {
        if ((rIdx + cIdx) & 1) { // starting counting from top left, black squares have odd sum of row and column
          const square = new GameSquare(`square-${ this.rows[rIdx] }-${ this.columns[cIdx] }`);
          this.gameSquares.push(square);
          squaresMap.set(square.identifier, square);
        }
      }
    }

    // link squares
    for (let rIdx = 0; rIdx < this.boardSize; rIdx++) {
      for (let cIdx = 0; cIdx < this.boardSize; cIdx++) {
        if ((rIdx + cIdx) & 1) {
          const square = squaresMap.get(`square-${ this.rows[rIdx] }-${ this.columns[cIdx] }`)!;
          if (rIdx > 0) {
            if (cIdx > 0) {
              square.squareTopLeft = squaresMap.get(`square-${ this.rows[rIdx - 1] }-${ this.columns[cIdx - 1] }`);
            }
            if (cIdx < this.boardSize - 1) {
              square.squareTopRight = squaresMap.get(`square-${ this.rows[rIdx - 1] }-${ this.columns[cIdx + 1] }`);
            }
          }
          if (rIdx < this.boardSize - 1) {
            if (cIdx > 0) {
              square.squareBottomLeft = squaresMap.get(`square-${ this.rows[rIdx + 1] }-${ this.columns[cIdx - 1] }`);
            }
            if (cIdx < this.boardSize - 1) {
              square.squareBottomRight = squaresMap.get(`square-${ this.rows[rIdx + 1] }-${ this.columns[cIdx + 1] }`);
            }
          }
        }
      }
    }
  }

}
