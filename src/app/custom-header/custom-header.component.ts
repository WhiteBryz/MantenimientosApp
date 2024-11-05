import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
})
export class CustomHeaderComponent implements OnInit {
  @Input() pageTitle: string = 'default';

  constructor() { }

  ngOnInit() {
    return;
  }

}
