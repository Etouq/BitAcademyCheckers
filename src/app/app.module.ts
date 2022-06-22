import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GamePieceComponent } from './game-piece/game-piece.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GamePieceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
