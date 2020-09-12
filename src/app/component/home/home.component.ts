import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './modal/modal.component';
import {RequestService} from '../../service/request/request.service';
import {StatisticService} from '../../service/statistic/statistic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public STATISTIC: [];
  public sortedData;
  public page = 1;
  public pageSize = 10;
  public collectionSize;

  constructor(
    private modalService: NgbModal,
    private requestService: RequestService,
    public statisticService: StatisticService,
  ) { }

  ngOnInit() {
    this.requestService.getStatistic().subscribe(res => {
      Object.entries(res);
      this.sortedData = res;
      this.STATISTIC = this.sortedData;
      this.statisticService.statistic = this.STATISTIC;
      this.collectionSize = this.STATISTIC.length;
    });
    this.modalService.dismissAll();
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true
    });
    modalRef.componentInstance.title = 'Select game level';
  }

  get statistic() {
    return this.statisticService.statistic
      .map(stat => ({...stat}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
