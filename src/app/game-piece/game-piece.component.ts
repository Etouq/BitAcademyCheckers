import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-game-piece',
  templateUrl: './game-piece.component.html',
  styleUrls: ['./game-piece.component.scss']
})
export class GamePieceComponent implements OnInit {

  @Input() white!: boolean;

  @Input() set cellId(id: string) {

    const clientRect = document.getElementById(id)!.getBoundingClientRect();
    const boardContainerRect = document.getElementById('board-container')!.getBoundingClientRect();

    this.newCenterX = clientRect.left - boardContainerRect.left + clientRect.width / 2;
    this.newCenterY = clientRect.top - boardContainerRect.top + clientRect.height / 2;

    if (!this.centerX) {
      this.centerX = this.newCenterX;
      this.centerY = this.newCenterY;
      return;
    }

    this.animationPath = `path('M0,0 L${this.newCenterX - this.centerX},${this.newCenterY - this.centerY}')`;

    this.animating = true;

  }

  animationPath = "path('M0,0')";
  animating = false;

  centerX!: number;
  centerY!: number;

  private newCenterX = 0;
  private newCenterY = 0;

  constructor() { }

  ngOnInit(): void {
  }

  animationDone() {
    this.animating = false;
    this.centerX = this.newCenterX;
    this.centerY = this.newCenterY;
  }

}
