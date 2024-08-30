import { AfterViewInit, Component, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.scss']
})
export class CollapsableComponent implements AfterViewInit {
  @Input() msg = '';
  @ViewChild('collapsableDiv') collapsableDiv: any;


  constructor(private render: Renderer2) {

  }


  ngAfterViewInit(): void {
    // console.log(this.collapsableDiv.nativeElement);

  }

  toggle() {
    // this.render.setStyle(this.collapsableDiv.nativeElement, 'padding', '0px');
  }


}
