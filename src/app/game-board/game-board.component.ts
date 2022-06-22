import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { GamePiece } from "../game-logic/game-piece";
import { GameSquare } from "../game-logic/game-square";
import { MoveGenerator } from "../game-logic/move-generator";
import { MoveSet } from "../game-logic/move-set";

@Component({
  selector: "app-game-board",
  templateUrl: "./game-board.component.html",
  styleUrls: ["./game-board.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent implements OnInit {

  readonly boardSize = 10;

  readonly rows = Array(this.boardSize).fill(0).map((x, i) => 10 - i);
  readonly columns = Array(this.boardSize).fill(0).map((x, i) => String.fromCharCode(65 + i));

  whitePieces!: GamePiece[];
  blackPieces!: GamePiece[];

  highlightedCells = new Map<string, MoveSet>();

  private gameSquares: GameSquare[] = [];

  private activeMoves = new Map<GamePiece, MoveSet[]>();

  private activePiece: GamePiece | undefined;

  constructor() { }

  ngOnInit(): void {
    this.setupSquares();
    this.resetPieces();

    this.generateMoves(true);
  }


  makeMove(endPositionId: string): void {
    const moveSet = this.highlightedCells.get(endPositionId);

    if (!this.activePiece || !moveSet || !this.activeMoves.get(this.activePiece)?.includes(moveSet)) {
      return;
    }

    moveSet.jumpedPieces.forEach(piece => piece.removeFromBoard());

    if (this.activePiece.white)
      this.blackPieces = this.blackPieces.filter((piece) => !moveSet.jumpedPieces.has(piece));
    else
      this.whitePieces = this.whitePieces.filter((piece) => !moveSet.jumpedPieces.has(piece));

    this.activePiece.moveTo(moveSet.endPosition);

    this.generateMoves(!this.activePiece.white);
    this.clearHighlightedCells();
  }

  clearHighlightedCells(): void {
    this.highlightedCells = new Map<string, MoveSet>();
    this.activePiece = undefined;
  }

  generateMoves(white: boolean): void {
    this.activeMoves.clear();
    let maxJumps = 0;
    if (white) {


      for (const piece of this.whitePieces) {
        const moves = MoveGenerator.generateMoves(piece);

        maxJumps = Math.max(maxJumps, ...moves.map(m => m.jumpedPieces.size));
        this.activeMoves.set(piece, moves);
      }

    }
    else {

      for (const piece of this.blackPieces) {
        const moves = MoveGenerator.generateMoves(piece);

        maxJumps = Math.max(maxJumps, ...moves.map(m => m.jumpedPieces.size));
        this.activeMoves.set(piece, moves);
      }

    }

    for (const piece of this.activeMoves.keys()) {
      this.activeMoves.set(piece, this.activeMoves.get(piece)!.filter(m => m.jumpedPieces.size == maxJumps));
    }
  }

  highlightMoves(piece: GamePiece): void {
    this.activePiece = piece;


    this.highlightedCells.clear();

    for (const moveSet of this.activeMoves.get(piece)!) {
      this.highlightedCells.set(moveSet.endPosition.identifier, moveSet);
    }
  }

  private resetPieces(): void {
    this.whitePieces = [];
    this.blackPieces = [];
    this.gameSquares.forEach(square => {
      square.piece = undefined;
    });

    const numPieces = 20;
    for (let i = 0; i < numPieces; i++) {
      this.blackPieces.push(new GamePiece(false, this.gameSquares[i]));
    }

    for (let i = this.gameSquares.length - numPieces; i < this.gameSquares.length; i++) {
      this.whitePieces.push(new GamePiece(true, this.gameSquares[i]));
    }

  }

  private setupSquares(): void {
    const squaresMap = new Map<string, GameSquare>();
    // create squares
    for (let rIdx = 0; rIdx < this.boardSize; rIdx++) {
      for (let cIdx = 0; cIdx < this.boardSize; cIdx++) {
        if ((rIdx + cIdx) % 2 == 1) {
          const square = new GameSquare(`square-${ this.rows[rIdx] }-${ this.columns[cIdx] }`);
          this.gameSquares.push(square);
          squaresMap.set(square.identifier, square);
        }
      }
    }

    // link squares
    for (let rIdx = 0; rIdx < this.boardSize; rIdx++) {
      for (let cIdx = 0; cIdx < this.boardSize; cIdx++) {
        if ((rIdx + cIdx) % 2 == 1) {
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
