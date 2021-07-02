import {Component, Input, OnInit} from '@angular/core';
import {ActionItem} from '../models/ActionItem';

@Component({
  selector: 'ls-action-progress',
  templateUrl: './action-progress.component.html',
  styleUrls: ['./action-progress.component.scss']
})
export class ActionProgressComponent implements OnInit {

  @Input() actionItem: ActionItem | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
