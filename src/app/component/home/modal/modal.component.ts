import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  @Input() title;

  constructor(public activeModal: NgbActiveModal, private router: Router) {
  }

  ngOnInit() {
  }

  goToGamePage(level) {
    this.router.navigate(['game', level], {skipLocationChange: true});
  }
}
