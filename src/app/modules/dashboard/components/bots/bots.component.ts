import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.scss'],
})
export class BotsComponent {
  Array(arg0: number) {
    throw new Error('Method not implemented.');
  }
  value: any[] = [];
  commonOptions: any[] = [];
  orderside: any[] = [];
  limits: any[] = [];
  limits2: any[] = [];
  autoCancellation: any[] = [];
  allTabCommon: any[] = [];
  closeTabOptions: any[] = [];

  showForm: boolean = false;
  showPopup: boolean = false;
  showvirtual: boolean = false;
  showlimit: boolean = false;
  showmarket: boolean = false;
  showtrigger: boolean = false;

  isFormActive = false;



  wordCounttext: string = '';
  wordCounttext2: string = '';
  Factortext: string = '';
  openAmoountType1: string = '';
  openAmoountType2: string = '';
  openAmoountType3: string = '';
  openAmoountType4: string = '';
  openLimit2Text:string='';

  dcaswitch1:boolean=false;
  dcaswitch2:boolean=false;
  
  dcawordCounttext: string = '';
  dcawordCounttext2: string = '';
  dcaFactortext: string = '';
  dcaAmoountType1: string = '';
  dcaAmoountType2: string = '';
  dcaAmoountType3: string = '';
  dcaAmoountType4: string = '';
  dcaLimit2Text:string='';

  selectedOptionopenamount1: string | null = null;
  selectedOptionopenamount2: string | null = null;
  selectedOptionopenamount3: string | null = null;
  selectedOptionopenamount4: string | null = null;
  selectedOptionopenamount5: string | null = null;
  selectedOptionopenamount6: string | null = null;
  selectedOptionopenPositioinSide: string | null = null;
  selectedOptionopenLimit2: string | null = null;

  selectedOptiondcaamount1: string | null = null;
  selectedOptiondcaamount2: string | null = null;
  selectedOptiondcaamount3: string | null = null;
  selectedOptiondcaamount4: string | null = null;
  selectedOptiondcaamount5: string | null = null;
  selectedOptiondcaamount6: string | null = null;
  selectedOptiondcaPositioinSide: string | null = null;
  selectedOptiondcaLimit2: string | null = null;

  toggleForm() {
    // this.isFormActive = !this.isFormActive;
    this.isFormActive = true;
  }
  listItems: { text: string; switchValue: boolean }[] = [];

  onPlusClick() {
    const newItem = { text: 'Bot 998567', switchValue: true };
    this.listItems.push(newItem);
  }

  onDeleteClick(index: number) {
    this.listItems.splice(index, 1);
  }
  //Plus icon add btn end

  leverageText: string = '';
  leverageCheckbox: boolean = false;

  PlaceatBreakevenText: string = '';
  PlaceatBreakevenbox: boolean = false;

  BreakevenindentText: string = '';
  Breakevenindentbox: boolean = false;

  TrailingActivationText: string = '';
  TrailingActivationbox: boolean = false;

  CallbackrateText: string = '';
  Callbackratebox: boolean = false;

  MintrailingText: string = '';
  Mintrailingbox: boolean = false;

  TPtext: string = '';
  TPbox: boolean = false;

  dcamaxtext: string = '';
  dcamaxbox: boolean = false;

  closepricetext: string = '';
  closepricecheckbox: boolean = false;

  isSwitchOn: boolean = false;
  isSwitchOn3: boolean = false;
  isSwitchOn4: boolean = false;
  isSwitchOn5: boolean = false;
  isSwitchOn6: boolean = false;
  isSwitchOn7: boolean = false;
  isSwitchOn8: boolean = false;
  isSwitchOn9: boolean = false;
  isSwitchOn10: boolean = false;
  isSwitchOn11: boolean = false;
  isSwitchOn12: boolean = false;

  signalMessage: any[] = [];

  openObj: { [key: string]: boolean } = {};
  dcaObj: { [key: string]: boolean } = {};
  closeObj: { [key: string]: boolean } = {};
  slObj: { [key: string]: boolean } = {};
  slxObj: { [key: string]: boolean } = {};
  tpObj: { [key: string]: boolean } = {};
  dataJson: { [key: string]: any } = {};

  get dataArraykeyValueJSON() {
    return JSON.stringify(this.dataJson, null, 2);
  }

  get keyValueJSON() {
    return JSON.stringify(this.openObj, null, 2);
  }

  updateKeyValue(name: string, key: string, event: any) {
    if (name == 'open') {
      if (this.openObj.hasOwnProperty(key)) {
        delete this.openObj[key];
        const keysArray = Object.keys(this.openObj);
        const length = keysArray.length;
        if(length<=0){
          delete this.dataJson['open'];
        }else{
        this.dataJson['open'] = this.openObj;
        }
      } else {
        this.openObj[key] = event;
        this.dataJson['open'] = this.openObj;
      }
    } else if (name == 'close') {
      if (this.closeObj.hasOwnProperty(key)) {
        delete this.closeObj[key];
        const keysArray = Object.keys(this.closeObj);
        const length = keysArray.length;
        if(length<=0){
          delete this.dataJson['close'];
        }else{
        this.dataJson['close'] = this.closeObj;
        }
      } else {
        this.closeObj[key] = event;
        this.dataJson['close'] = this.closeObj;
      }
    } else if (name == 'dca') {
      if (this.dcaObj.hasOwnProperty(key)) {
        delete this.dcaObj[key];
        const keysArray = Object.keys(this.dcaObj);
        const length = keysArray.length;
        if(length<=0){
          delete this.dataJson['dca'];
        }else{
        this.dataJson['dca'] = this.dcaObj;
        }
      } else {
        this.dcaObj[key] = event;
        this.dataJson['dca'] = this.dcaObj;
      }
    } else if (name == 'sl') {
      if (this.slObj.hasOwnProperty(key)) {
        delete this.slObj[key];
        const keysArray = Object.keys(this.slObj);
        const length = keysArray.length;
        if(length<=0){
          delete this.dataJson['sl'];
        }else{
        this.dataJson['sl'] = this.slObj;
        }
      } else {
        this.slObj[key] = event;
        this.dataJson['sl'] = this.slObj;
      }
    } else if (name == 'slx') {
      if (this.slxObj.hasOwnProperty(key)) {
        delete this.slxObj[key];
        const keysArray = Object.keys(this.slxObj);
        const length = keysArray.length;
        if(length<=0){
          delete this.dataJson['slx'];
        }else{
        this.dataJson['slx'] = this.slxObj;
        }
      } else {
        this.slxObj[key] = event;
        this.dataJson['slx'] = this.slxObj;
      }
    } else if (name == 'tp') {
      if (this.tpObj.hasOwnProperty(key)) {
        delete this.tpObj[key];
        const keysArray = Object.keys(this.tpObj);
        const length = keysArray.length;
        if(length<=0){
          delete this.dataJson['tp'];
        }else{
        this.dataJson['tp'] = this.tpObj;
        }
      } else {
        this.tpObj[key] = event;
        this.dataJson['tp'] = this.tpObj;
      }
    }
  }
  updateValue(name: string, key: string, event: any) {
    if (name == 'open') {
      if (this.openObj.hasOwnProperty(key)) {
        this.openObj[key] = event;
        this.dataJson['open'] = this.openObj;
      }
    } else if (name == 'close') {
      if (this.closeObj.hasOwnProperty(key)) {
        this.closeObj[key] = event;
        this.dataJson['close'] = this.closeObj;
      }
    } else if (name == 'dca') {
      if (this.dcaObj.hasOwnProperty(key)) {
        this.dcaObj[key] = event;
        this.dataJson['dca'] = this.dcaObj;
      }
    } else if (name == 'sl') {
      if (this.slObj.hasOwnProperty(key)) {
        this.slObj[key] = event;
        this.dataJson['sl'] = this.slObj;
      }
    } else if (name == 'slx') {
      if (this.slxObj.hasOwnProperty(key)) {
        this.slxObj[key] = event;
        this.dataJson['slx'] = this.slxObj;
      }
    } else if (name == 'tp') {
      if (this.tpObj.hasOwnProperty(key)) {
        this.tpObj[key] = event;
        this.dataJson['tp'] = this.tpObj;
      }
    }
  }

  selectedOption: string | null = null;
  selectedOptionclose: string | null = null;
  selectedOptionSL: string | null = null;
  selectedOptionSLprice: string | null = null;
  selectedOptionSLtrigger: string | null = null;
  selectedOptionSLtriggerSLX: string | null = null;
  selectedOptiondca: string | null = null;
  selectedOptiondca2: string | null = null;

  isSwitchOn2: boolean = false;

  // Bots functionaliy end
  options: SelectItem[] = [
    { label: '1m candle', value: 'Option 1' },
    { label: '2m candle', value: 'Option 2' },
    { label: '3m candle', value: 'Option 3' },
    { label: '4m candle', value: 'Option 4' },
  ];

  options2: SelectItem[] = [
    { value: 'Open amount + Position amount' },
    { value: 'both' },
  ];

  initialOffset: SelectItem[] = [{ value: '10' }, { value: '20' }];
  price: SelectItem[] = [{ value: '2134' }, { value: '5676' }];
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  ngOnInit() {
    this.commonOptions = [
      { value: 'TradingView indicator' },
      { value: 'TradingView strategy' },
      { value: 'My server' },
      { value: 'Master hook' },
    ];
    this.orderside = [
      { name: 'Buy', code: 'NY' },
      { name: 'Sell', code: 'RM' },
    ];

    this.limits = [
      { name: 'Both', code: 'Both' },
      { name: 'Long Only', code: 'Long Only' },
      { name: 'Short Only', code: 'Short Only' },
    ];

    this.limits2 = [
      { name: 'Timeout after any closed position, min' },
      {
        name: 'Timeout after any closed position on same pair, min'
      },
      {
        name: 'Timeout after any closed position with loss, min'
      },
      {
        name: 'Timeout after any closed position with loss on same pair, min'
      },
      {
        name: 'Timeout after any closed position with profit, min'
      },
      {
        name: 'Timeout after any closed position with profit on same pair, min'
      },
    ];

    this.autoCancellation = [
      { name: 'Auto Cancellation: disabled', code: 'disabled' },
      { name: 'Auto Cancellation: seconds', code: 'seconds' },
      { name: 'Auto Cancellation: minutes', code: 'minutes' },
      { name: 'Auto Cancellation: hours', code: 'hours' },
      { name: 'Auto Cancellation: days', code: 'days' },
    ];

    this.allTabCommon = [
      { name: 'Volume' },
      { name: 'Volume, USD' },
      { name: 'Full Balance, %' },
      { name: 'Full Balance& x Leverage' },
      { name: 'Free Balance, %' },
      { name: 'Free Balance % x Leverage' },
      { name: 'Strategy Amount' },
      { name: 'Position Volume, %' },
      { name: 'Position amount. %' },
    ];
  }

  // copy content
  clickborad(input: any) {
    input.select();
    document.execCommand('copy');
    input.setselectRange(0, 0);
  }
}
