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
    this.centerX = clientRect.left - boardContainerRect.left + clientRect.width / 2;
    this.centerY = clientRect.top - boardContainerRect.top + clientRect.height / 2;
  }

  centerX = 0;
  centerY = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
