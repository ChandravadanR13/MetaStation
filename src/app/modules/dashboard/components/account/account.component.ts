import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  inputKey: string = '11111111';
  type: string = 'text';

  ngOnInit () {

  }

  changePassView() {
    if(this.type === 'text' ) {
      this.type = 'password';
    }
    if(this.type === 'password') {
      this.type = 'text';
    }
  }
}
