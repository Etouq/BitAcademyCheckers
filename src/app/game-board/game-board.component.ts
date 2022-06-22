import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { GameRunner } from "../game-logic/game-runner";
import { MoveSet } from "../game-logic/move-set";
import { GamePieceComponent } from "../game-piece/game-piece.component";

@Component({
  selector: "app-game-board",
  templateUrl: "./game-board.component.html",
  styleUrls: ["./game-board.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent implements OnInit {


  highlightedCells = new Map<string, MoveSet>();

  // currently selected piece
  private activePieceComponent: GamePieceComponent | undefined;


  gameRunner = new GameRunner();

  constructor() { }

  ngOnInit(): void {
  }


  makeMove(endPositionId: string): void {
    const moveSet = this.highlightedCells.get(endPositionId);

    if (!this.activePieceComponent || !moveSet ||
        !this.gameRunner.activeMoves.get(this.activePieceComponent.piece)?.includes(moveSet)) {
      return;
    }

    this.activePieceComponent!.isActivePiece = false;
    this.activePieceComponent!.executeMoveSet(moveSet);

    this.clearHighlightedCells();
  }

  onMoveAnimationEnd(moveSet: MoveSet): void {
    // update game state
    this.gameRunner.executeMove(moveSet);

    this.activePieceComponent = undefined;
  }

  resetGame(): void {
    this.clearHighlightedCells();
    this.gameRunner.resetGame();
  }

  clearHighlightedCells(): void {
    this.highlightedCells = new Map<string, MoveSet>();
    if (this.activePieceComponent) {
      this.activePieceComponent.isActivePiece = false;
    }
    this.activePieceComponent = undefined;
  }

  highlightComponentMoves(pieceComponent: GamePieceComponent): void {

    if (this.gameRunner.currentPlayerWhite !== pieceComponent.piece.white) {
      pieceComponent.cannotMovePiece = true;
      return;
    }

    if ((this.gameRunner.activeMoves.get(pieceComponent.piece) ?? []).length === 0) {
      pieceComponent.cannotMovePiece = true;
      return;
    }

    if (this.activePieceComponent) {
      this.activePieceComponent.isActivePiece = false;
    }

    this.activePieceComponent = pieceComponent;
    this.activePieceComponent.isActivePiece = true;

    this.highlightedCells.clear();

    for (const moveSet of this.gameRunner.activeMoves.get(pieceComponent.piece) ?? []) {
      this.highlightedCells.set(moveSet.endPosition.identifier, moveSet);
    }
  }

}
