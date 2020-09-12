import {Component, OnInit} from '@angular/core';
import {GameService} from '../../../service/game/game.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RequestService} from 'src/app/service/request/request.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  constructor(
    public gameService: GameService,
    private router: Router,
    private modalService: NgbModal,
    private requestService: RequestService
  ) {
  }

  ngOnInit() {
  }

  btnClick(level) {
    this.gameService.startGame(level);
    this.modalService.dismissAll();
    this.requestService.startGame({number_of_cards: level})
      .subscribe(
        res => {
          this.requestService.statisticId = res;
        }
      );
  }

  goToHomePage() {
    this.router.navigate(['home']);
  }
}
