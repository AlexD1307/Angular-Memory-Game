import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GameComponent} from './game.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ResultComponent} from './result/result.component';
import {ExitConfirmGuard} from '../../guard/exit/exit-confirm.guard';

const routes: Routes = [
  {path: 'game/:level', component: GameComponent, canDeactivate: [ExitConfirmGuard]}
];

@NgModule({
  declarations: [ResultComponent],
  exports: [
    ResultComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
  entryComponents: [ResultComponent],
  providers: [ExitConfirmGuard]
})
export class GameModule {
}
