import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../service/game/game.service';
import {ResultComponent} from './result/result.component';
import {RequestService} from '../../service/request/request.service';
import {ComponentCanDeactivate} from '../../guard/exit/exit-confirm.guard';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit, ComponentCanDeactivate {
  private level: number;
  private isOver: boolean;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    public gameService: GameService,
    private requestService: RequestService
  ) {
    this.gameService.isOver.subscribe(isOver => {
      this.isOver = isOver;
      if (isOver === true) {
        this.modalService.open(ResultComponent, {
          backdrop: 'static',
          centered: true,
          windowClass: 'my-modal-class',
          keyboard: false
        });
        this.requestService.gameOver(this.requestService.statisticId.id).subscribe();
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.level = params.level);
    this.gameService.startGame(this.level);
    this.modalService.dismissAll();
    this.requestService.startGame({number_of_cards: this.level})
      .subscribe(res => this.requestService.statisticId = res);
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (!this.isOver) {
      const cnf = confirm('Are you sure? Game will be unsuccessful!');
      if (cnf) {
        this.requestService.gameOver(this.requestService.statisticId.id).subscribe();
      }
      return cnf;
    } else {
      return true;
    }
  }
}
