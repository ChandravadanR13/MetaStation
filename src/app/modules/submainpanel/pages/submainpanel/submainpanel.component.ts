import {
  Component,
  ViewEncapsulation,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from 'src/app/Services/profile.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WebsocketService } from 'src/app/Services/websocket.service';
import { OrderbookService } from 'src/app/Services/bybitorderbook.service';
import { BybitWebSocketService } from 'src/app/Services/bybit-web-socket.service';
import { BinanceOrderBookService } from 'src/app/Services/binanceorderbook.service';
import { ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LoadingService } from '../../../../Services/loading.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import Web3 from 'web3';
import { WalletCommunicationService } from '../../../../Services/walletcommunication.service';
import { WalletService } from 'src/app/Services/wallet.service';
import { TradeService } from 'src/app/Services/trade.service';
import { UserService } from '../../../../Services/user.service';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { trigger } from '@angular/animations';
declare const TradingView: any;
declare let window: any;
declare const Datafeeds: any;

declare global {
  interface Window {
    TradingView: any;
    Datafeeds: any;
  }
}
interface orderBook {
  s: string;
  b: [number, number][];
  a: [number, number][];
  u: number;
  seq: number;
}
@Component({
  selector: 'app-submainpanel',
  templateUrl: './submainpanel.component.html',
  styleUrls: ['./submainpanel.component.scss'],
  providers: [WebsocketService, BybitWebSocketService],
  // encapsulation: ViewEncapsulation.None,
})

//https://api.binance.com/api/v3/ticker/24hr
export class SubmainpanelComponent implements AfterViewInit {
  @ViewChild('elementRef') elementRef!: ElementRef;
  clForm: FormGroup; // Reactive form group for the main form
  clubform: FormGroup;

  private subscription!: Subscription;
  private widget: any;
  tpNoo: number = 1;
  tradeorders: any[] = [];

  divArray: any[] = [];
  activeTp: boolean = false;
  activeSl: boolean = false;
  activeSlx: boolean = false;
  activeTradeSymbol: string | null = null;

  // priceArray: number[] = [];
  showOnlyFavorites: boolean = false;

  priceArray: { p: number; c: number }[] = [];
  amountArray: { a: number; pc: number }[] = [];
  price: number = 12341;
  percent1: number = 0.5;
  amount: number = 213123;
  percent2: number = 14.5;
  orderBook: any[] | undefined;
  ask: [number, number][] = [];
  bid: [number, number][] = [];
  activePanel!: string;
  activeTab: 'ticker' | 'long' = 'ticker';
  hideElements = true;
  Userbalance: any;
  isLongSelected: boolean = true;

  slxEnabled: boolean = false;
  slEnabled: boolean = false;
  tpEnabled: boolean = false;

  selectedItem1: string | undefined;
  selectedItem2: string | undefined;
  //tickertitles: any[] = [];
  tickerdatas: { [key: string]: any } = {};
  datas: { [key: string]: any } = {};
  openorders: any;
  closedtrades: any;
  alltrades: any;
  childTrades: any;
  positionTrades: any;
  positionSingleList: any;
  positionCloseTrades: any;
  positionAllTrades: any;
  coinone!: string;
  cointwo!: string;
  symbol!: string;
  symbolId!: string;
  selectedTradeType!: string;
  siteUrl = environment.siteUrl;
  private intervalId: any;
  public lastPrice: string | undefined;
  isMinMax: boolean = false;
  isMoveExpand: boolean = false;
  isMoveShrinkTrade: boolean = false;
  activeChildtab: boolean = false;
  silderValue2: any;
  selectedAccountId: any;
  accLabel: any;
  userRole: any;
  showBots: boolean = false;
  isProMode: boolean = false;
  isFutureMode: boolean = false;
  modeText: string = 'Basic';
  tradeModeText: string = 'Spot';
  favoriteItems: any;

  public toggleMinMax() {
    this.isMinMax = !this.isMinMax;
  }
  public toggleMoveExpand() {
    this.isMoveExpand = !this.isMoveExpand;
  }
  public toggleMoveShrinkTrade() {
    this.isMoveShrinkTrade = !this.isMoveShrinkTrade;
  }

  toggleTradeMode() {
    this.tradeModeText = this.isFutureMode ? 'Future' : 'Spot';
    const tradeType = this.isFutureMode ? 'linear' : 'spot';
    localStorage.setItem('type', tradeType);
    if (tradeType === 'spot') {
      this.clickAlltrade();
    } else if (tradeType === 'linear') {
      this.positionList();
    }
    this.showtradeBot();
    this.openTrade();
    this.CloseTrade();
    this.selectedTradeType = tradeType;
    this.walletCommunicationService.setSelectedTradeType(tradeType);
  }

  toggleMode() {
    if (this.userRole == 'basic' && this.isProMode) {
      return;
    }
    if (this.isProMode) {
      this.showBots = false;
      this.modeText = 'Basic';
      this.isProMode = false;
    } else {
      this.showBots = true;
      this.modeText = 'Pro';
      this.isProMode = true;
    }
  }
  ordercoinone: string | undefined;
  ordercointwo: string | undefined;
  orderamount: number = 0;
  orderprice: number = 0;
  ordervolume: number = 0;
  coinonebalance: number = 0;
  cointwobalance: number = 0;
  coinonedecimal: number = 0;
  cointwodecimal: number = 0;
  highlightText: string = 'Short';
  type: string = 'Buy';
  limitform: FormGroup;

  marketForm: FormGroup;
  stoplimitForm: FormGroup;
  floatForm: FormGroup;
  metaMForm: FormGroup;
  pairid: number = 0;
  public loading;
  isDisabled: boolean = false;
  public error = null;
  web3: any;
  symbols: string[] = [];
  filteredCoins: any;
  filteredCoinsdep: any;
  filteredCoinswallet: any;
  filteredCoinsdepbalance: any;
  accountlist: any;

  isNaN(value: any): boolean {
    return isNaN(value);
  }

  parseFloat(value: any) {
    return parseFloat(value);
  }

  dropdownOptions1: any[] = [
    { label: 'SETTINGS TEMPLATE', value: 'diabled' },
    { label: '0. Autosave every 5 sec', value: 'option1' },
    { label: 'Add New Template', value: 'option1' },
  ];

  dropdownOptions2: any[] = [
    { label: 'Off', value: 'diabled' },
    { label: 'Seconds', value: 'option1' },
  ];

  activation: any[] = [];

  tpcontent: boolean = false;
  SLXcontent: boolean = false;
  triggercontent: boolean = true;
  calccontent: boolean = false;
  slxcontent2: boolean = false;

  slradio: boolean = false;
  isToggledg = false;

  selectedItem: string | undefined;

  showOrder: boolean = true;

  dropdownOptions: any[] = [
    { label: 'disabled', value: 'diabled' },
    { label: '1m candle', value: 'option1' },
    { label: '5m candle', value: 'option1' },
    { label: '1h candle', value: 'option1' },
    { label: '4h candle', value: 'option1' },
  ];

  frlSwich1: boolean = true;
  frlSwich2: boolean = true;
  frlSwich3: boolean = true;
  frlSwich4: boolean = true;
  frlSwich5: boolean = true;
  frlSwich6: boolean = true;

  // FRL swich end

  isToggledf = false;
  activeButton6: string = 'btn16';

  setActiveButton6(buttonId: string) {
    this.activeButton6 = buttonId;
  }
  activeButton7: string = 'btn18';
  setActiveButton7(buttonId: string) {
    this.activeButton7 = buttonId;
  }

  activeButton4: string = 'btn11';
  setActiveButton4(buttonId: string) {
    this.activeButton4 = buttonId;
  }
  activeButton5: string = 'btn13';
  setActiveButton5(buttonId: string) {
    this.activeButton5 = buttonId;
  }

  value: number = 50;
  isToggled = false;
  ingredient!: string;
  activeButton3: string = 'btn8';
  setActiveButton3(buttonId: string) {
    this.activeButton3 = buttonId;
  }
  activeButton: string = 'btn1';

  setActiveButton(buttonId: string) {
    this.activeButton = buttonId;
  }
  activeButton2: string = 'btn4';
  setActiveButton2(buttonId: string) {
    this.activeButton2 = buttonId;
  }

  showContent = false;
  showContent2 = false;

  toggleContent() {
    this.showContent = !this.showContent;
  }
  toggleContent2() {
    this.showContent2 = !this.showContent2;
  }

  toggleClickChild(symbol: any, side: any) {
    const length = symbol.length;
    const lastThreeCharacters = symbol.slice(-4);
    const underscoreIndex = length - 4;
    const baseSymbol = symbol.slice(0, underscoreIndex);
    const newSymbol = `${baseSymbol}_${lastThreeCharacters}`;

    this.navigateTo(newSymbol);
    this.tpClick(this.positionSingleList);
    this.slClick(this.positionSingleList);
    this.updateTpList(symbol, side);
    // this.activeChildtab = !this.activeChildtab;
    if (this.activeTradeSymbol === symbol) {
      this.activeChildtab = !this.activeChildtab;
      if (!this.activeChildtab) {
        this.activeTradeSymbol = null;
        this.childTrades = [];
      }
    } else {
      this.activeTradeSymbol = symbol;
      this.activeChildtab = true;
    }
  }

  onRearrangeChangesl(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.checked) {
      this.slForm.rearrange = 1;
    } else {
      this.slForm.rearrange = 0;
    }
  }

  onRearrangeChangetp(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.checked) {
      this.tPForm.rearrange = 1;
    } else {
      this.tPForm.rearrange = 0;
    }
  }

  async setUserRole() {
    try {
      this.userService.getUserRole().subscribe((role) => {
        this.userRole = role;
        return role;
      });
      //this.metaMaskAddress = userData.result.acc;
    } catch (error) {
      this.handleError(error);
    }
  }

  slForm = {
    enabled: true,
    orderID: '',
    type: '',
    offset: 2,
    price: '',
    calType: '',
    risk: null,
    ordertigger: '',
    slOrderType: '',
    symbol: '',
    category: '',
    account_type: '',
    coinone: '',
    cointwo: '',
    side: '',
    rearrange: 0,
    slType: '',
  };

  slXForm = {
    slxtype: '',
    profitpercentage: null,
    offset: null,
    trailingpercentage: null,
    trailoffset: null,
    trailStep: null,
    minvalue: null,
    orderTrigger: '',
    slXOrderType: '',
    activation: '',
  };

  tPForm = {
    orderType: '',
    orderTigger: '',
    price: 0.0,
    qty: 0.0,
    symbol: '',
    orderID: '',
    account_type: '',
    category: '',
    side: '',
    coinone: '',
    cointwo: '',
    rearrange: 0,
  };

  tPForms: Array<{
    price: number;
    qty: number;
  }> = [];

  hoveredRowIndex: number | null = null;

  // icon todo list start
  tname: any;
  pkey: any;

  newItem: any = {}; // Object to hold the form data
  items2: any[] = []; // Array to store the data
  submitToDo() {
    const obj = {
      templatename: this.tname,
      templatekey: this.pkey,
    };
    if (
      this.tname != null &&
      this.tname != undefined &&
      this.pkey != null &&
      this.pkey != undefined
    ) {
      this.items2.push(obj);
      this.tname = '';
      this.pkey = '';
    }
  }

  DeleteArray(indexxx: any) {
    this.items2.splice(indexxx, 1);
  }

  updateArray(var1: any, var2: any, ind: any) {
    const obj = {
      templatename: var1,
      templatekey: var2,
    };
    this.items2[ind] = obj;
  }

  // icon todo list end
  itemsDrop1: string[] = ['USD', 'INR', 'EUR'];
  itemsDrop2: string[] = ['ALT', 'INR', 'EUR'];
  constructor(
    private walletService: WalletService,
    private profile: ProfileService,
    private trade: TradeService,
    private router: Router,
    private route: ActivatedRoute,
    private websocket: WebsocketService,
    private bybitwebsocket: BybitWebSocketService,
    private renderer: Renderer2,
    private el: ElementRef,
    private fb: FormBuilder,
    private isloading: LoadingService,
    private toastr: ToastrService,
    private walletCommunicationService: WalletCommunicationService,
    private ngZone: NgZone,
    private userService: UserService
  ) {
    this.favoriteItems = new Set(
      JSON.parse(localStorage.getItem('favorites') || '[]')
    );
    this.favoriteItems = this.getFavoritePairsFromLocalStorage();
    this.profile.accountlist().subscribe(
      (data: any) => {
        this.accountlist = data.result;
        if (
          localStorage.getItem('accLabel') != null &&
          localStorage.getItem('accLabel') !== 'undefined'
        ) {
          this.accLabel = localStorage.getItem('accLabel');
        } else {
          this.selectedAccountId = this.accountlist[0].subuid;
          this.accLabel = this.accountlist[0].label;
          localStorage.setItem('selectedAccountId', this.selectedAccountId);
          localStorage.setItem('accLabel', this.accLabel);
        }
        const tradeType = localStorage.getItem('type') || 'spot';

        localStorage.setItem('type', tradeType);
        this.openorders = null;
        this.closedtrades = null;
        this.alltrades = null;

        if (tradeType === 'spot') {
          this.clickAlltrade();
        } else if (tradeType === 'linear') {
          this.positionList();
        }
        this.openTrade();
        this.CloseTrade();
        this.selectedTradeType = tradeType;
      },
      (error: any) => {
        this.toastr.error(error);
      }
    );

    this.loading = isloading;

    this.limitform = this.fb.group({
      price: ['', Validators.required],
      amount: ['', Validators.required],
      Volume: ['', Validators.required],
    });
    this.clubform = this.fb.group({
      price: ['', Validators.required],
      amount: ['', Validators.required],
      volume: ['', Validators.required],
      sliderValue2: [1], // Default value for slider
    });
    this.clForm = this.fb.group({
      price: ['', Validators.required],
      amount: ['', Validators.required],
      Volume: ['', Validators.required],
      side: ['', Validators.required],
      category: ['', Validators.required],
      orderType: ['', Validators.required],
      timeInForce: ['', Validators.required],
      symbol: ['BTCUSDT'],
      coinone: ['BTC'],
      cointwo: ['USDT'],
    });

    this.marketForm = this.fb.group({
      marketamount: ['', Validators.required],
      marketvolume: ['', Validators.required],
    });

    this.stoplimitForm = this.fb.group({
      price: ['', Validators.required],
      stopprice: ['', Validators.required],
      stopamount: ['', Validators.required],
      stopvolume: ['', Validators.required],
    });

    this.floatForm = this.fb.group({
      amount: ['', Validators.required],
      volume: ['', Validators.required],
    });

    this.metaMForm = this.fb.group({
      amount: ['', Validators.required],
      address: ['', Validators.required],
      send: ['', Validators.required],
      rec: ['', Validators.required],
    });
  }

  toggleFullscreen() {
    const elem = this.elementRef.nativeElement as HTMLElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {});
    } else {
      document.exitFullscreen();
    }
  }

  handletoggle(event: any, value: string) {
    if (event.target.checked) {
      localStorage.setItem(value + 'enable', value);
      if (value == 'tp') {
        this.tpClick(this.positionSingleList);
      } else if (value == 'sl') {
        this.slClick(this.positionSingleList);
      } else if (value == 'slx') {
        this.updateTpList(
          this.positionSingleList.side,
          this.positionSingleList.symbol
        );
      }
    } else {
      localStorage.removeItem(value + 'enable');
    }
  }

  navigateTo(value: any) {
    if (value) {
      this.router.navigateByUrl(`/app/panel/${value}`);
      // window.location.href = this.siteUrl + '/app/panel' + '/' + value;
      //get symbol from params
      this.symbol = value;

      const sym = this.symbol.replace(/_/g, '');
      this.bybitwebsocket.disconnectWebSocket();

      this.bybitwebsocket.connectWebSocket(sym);
      this.allticker(this.symbol);
      this.positionList();
      this.getLeverage();
    }
    return false;
  }

  id: number | any;
  onCLickedButton(id: number) {
    this.id = id;
  }
  products = [
    {
      name: 'aahshs',
      code: 1233,
      category: 'folwer',
    },
  ];

  // chart end
  //dropdown 2
  cities2: any;
  selectedCity2: any | undefined;
  //dropdown 1
  cities: any;
  selectedCity: any | undefined;

  orderTig: any;
  offset: any;
  selectedTigger: any | undefined;

  sliderValue: number = 0;

  updateValue() {
    // Handle input changes if needed
  }
  getFavoritePairsFromLocalStorage(): Set<string> {
    const favorites = localStorage.getItem('favorites');
    console.log(favorites);

    return favorites ? new Set(JSON.parse(favorites)) : new Set<string>();
  }

  getFavoritePairs(): any[] {
    return Object.values(this.tickerdatas)
      .flat()
      .filter((pair) => this.isFavorite(pair.symbol));
  }

  getfavlist() {
    this.profile.getFavorites().subscribe(
      (response: any) => {
        console.log('Response from server:', response);
      },
      (error: any) => {
        console.error('Error while updating favorites:', error);
      }
    );
  }

  moveSliderBy10Percent() {
    this.sliderValue = 10;
    // if (this.sliderValue > 100) {
    //   this.sliderValue = 100;
    // }
  }
  moveSliderBy25Percent() {
    this.sliderValue = 25;
  }
  moveSliderBy30Percent() {
    this.sliderValue = 30;
  }
  moveSliderBy50Percent() {
    this.sliderValue = 50;
  }
  moveSliderBy75Percent() {
    this.sliderValue = 75;
  }
  moveSliderBy100Percent() {
    this.sliderValue = 100;
  }
  async ngOnInit() {
    setInterval(async () => {
      await this.positionList();
    }, 30000);
    this.getfavlist();
    this.activePanel = 'coin';
    this.longbye = true;
    this.shortsell = false;
    this.showOrder = true;
    const role = await this.setUserRole();

    this.loadFavorites();

    favoriteItems: Set<string>;

    this.cities2 = [
      { name: 'ALT', code: 'NY' },
      { name: 'INR', code: 'RM' },
      { name: 'EUR', code: 'LDN' },
    ];
    this.cities = [
      { name: 'USD', code: 'NY' },
      { name: 'INR', code: 'RM' },
      { name: 'EUR', code: 'LDN' },
    ];

    this.orderTig = [
      { name: 'MarkPrice', code: 'MarkPrice' },
      { name: 'IndexPrice', code: 'IndexPrice' },
      { name: 'LastPrice', code: 'LastPrice' },
    ];

    this.offset = [
      { name: '% from position', code: 'formposition' },
      { name: '% from average', code: 'formaverage' },
    ];

    this.route.url.subscribe((segments: string | any[]) => {
      const lastSegment = segments[segments.length - 1];
      this.symbol = lastSegment.toString();
    });

    const tradeType = localStorage.getItem('type') || 'spot';
    this.isProMode = false;
    this.isFutureMode = tradeType === 'linear' ? true : false;
    this.tradeModeText = this.isFutureMode ? 'Future' : 'Spot';
    this.modeText = 'Basic';
    this.showtradeBot();
    this.allticker(this.symbol);
    this.generateDivs();
    this.getWebsocket();
  }

  showtradeBot() {
    if (this.isProMode && this.isFutureMode && this.userRole === 'pro') {
      this.showBots = true;
    } else {
      this.showBots = false;
    }
  }

  loadTradingViewScripts(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = '/assets/charting_library/charting_library.standalone.js';
      script.onload = () => {
        const datafeedScript = document.createElement('script');
        datafeedScript.src = '/assets/datafeeds/udf/dist/bundle.js';
        datafeedScript.onload = () => {
          if (window.Datafeeds && window.Datafeeds.UDFCompatibleDatafeed) {
            resolve();
          } else {
            reject(new Error('Datafeeds or UDFCompatibleDatafeed not found.'));
          }
        };
        datafeedScript.onerror = () => {
          reject(new Error('Failed to load datafeed script'));
        };
        document.body.appendChild(datafeedScript);
      };
      script.onerror = () => {
        reject(new Error('Failed to load TradingView script'));
      };
      document.body.appendChild(script);
    });
  }

  Walletbalance() {
    this.walletService
      .userWallet(localStorage.getItem('accLabel'))
      .subscribe((data: any) => {
        if (data.success) {
          this.Userbalance = data.result;
          // console.log(this.Userbalance);
          this.Userbalance = this.Userbalance.filter(
            (balance: { walletBalance: string }) =>
              parseFloat(balance.walletBalance) > 0
          ).sort(
            (a: { walletBalance: string }, b: { walletBalance: string }) =>
              parseFloat(b.walletBalance) - parseFloat(a.walletBalance)
          );
        }
      });
  }

  allticker(pair: any) {
    this.profile.allticker(pair).subscribe(
      (data: any) => this.handlesuccess(data),
      (error: any) => this.handleError(error)
    );
  }

  ngAfterViewInit() {
    this.route.paramMap.subscribe((params: { get: (arg0: string) => any }) => {
      let symbol = params.get('symbol');

      if (symbol) {
        symbol = symbol.replace(/_/g, '');
        this.symbolId = symbol;

        // this.loadTradingViewScripts().then(() => {
        //   this.initTradingViewChart();
        // });

        this.initializeTradingView(symbol);
        this.bybitwebsocket.disconnectWebSocket();
        // this.bybitwebsocket.connectWebSocketOrder();
        this.bybitwebsocket.connectWebSocket(symbol);
        this.ask = [];
        this.bid = [];

        this.bybitwebsocket.orderBook$.subscribe((data) => {
          const orderBookData = data as {
            a?: [number, number][];
            b?: [number, number][];
          };

          const filteredAsk =
            orderBookData.a?.filter((item) => item[1] > 0) ?? [];
          const filteredBid =
            orderBookData.b?.filter((item) => item[1] > 0) ?? [];
          // Concatenate filtered elements with existing arrays
          this.ask = [...this.ask, ...filteredAsk];
          this.bid = [...this.bid, ...filteredBid];
        });
      }
    });

    // this.positionList();
    // this.openTrade();
    // this.CloseTrade();
    // this.clickAlltrade();
    // this.getLeverage();

    this.slxEnabled = localStorage.getItem('slxenable') ? true : false;
    this.tpEnabled = localStorage.getItem('tpenable') ? true : false;
    this.slEnabled = localStorage.getItem('slenable') ? true : false;
  }

  openTrade() {
    var type = localStorage.getItem('type');

    this.profile.openorders(type, localStorage.getItem('accLabel')).subscribe(
      (data) => this.handleopenordersuccess(data),
      (error) => this.handleError(error)
    );
  }

  CloseTrade() {
    var type = localStorage.getItem('type');
    this.profile.closedtrades(type, localStorage.getItem('accLabel')).subscribe(
      (data) => {
      console.log('Closed trades data:', data);  // Console log the response data
      this.handleclosedtradessuccess(data);
    },
      (error) => this.handleError(error)
    );
  }

  clickAlltrade() {
    var type = localStorage.getItem('type');
    this.profile.alltrades(type, localStorage.getItem('accLabel')).subscribe(
      (data) => {
        console.log('Data received:', data); // Log the data to the console
        this.handlealltradessuccess(data);
      },
      (error) => this.handleError(error)
    );
  }
  loadFavorites(): void {
    const favorites = localStorage.getItem('favorites');
    this.favoriteItems = favorites
      ? new Set(JSON.parse(favorites))
      : new Set<string>();

    // this.profile.getFavorites().subscribe(
    //   (response: any) => {
    //     if (response.success) {
    //       this.profile = response.pairs;
    //       console.log(this.profile)
    //     }
    //   },
    //   (error) => {
    //     console.error('Error fetching favorites:', error);
    //   }
    // );
  }
  getLeverage() {
    let Str = this.symbol.split('_').join('');
    this.profile.getLeverage(Str).subscribe(
      (data: any) => (this.sliderValue2 = data.result),
      (error: any) => console.log('gtlev', error)
    );
  }

  positionList() {
    let Str = this.symbol.split('_').join('');
    this.profile.positionList(localStorage.getItem('accLabel'), Str).subscribe(
      (data) => {
        console.log('Data future received:', data);
        this.handlepositionlistsuccess(data);
      },
      (error) => this.handleError(error)
    );
    console.log(this.profile);
  }

  closePosition(orderType: string, item: any) {
    const params: any = {
      symbol: item.symbol,
      side: item.side,
      qty: item.size,
      reduce_only: true,
      order_type: orderType,
    };

    if (orderType === 'Limit') {
      params.price = item.avgPrice;
    }

    this.profile.closepositionorder(params).subscribe(
      (response) => {
        console.log('Order response:', response);
        this.toastr.success('Order closed successfully');
      },
      (error) => {
        this.toastr.error('Failed to Order closed');

        console.error('Order error:', error);
      }
    );
  }

  updateTpList(side: any, symbol: any) {
    var subuid = localStorage.getItem('accLabel');
    this.profile.getTplist(side, symbol, subuid).subscribe(
      (data: any) => {
        if (data.success) {
          this.activation = [];

          for (let i = 0; i < data.result.length; i++) {
            let label = i + 1 + ' TP';
            let value = data.result[i].orderid;
            this.activation.push({ label: label, value: value });
          }
        }
      },
      (error) => this.handleError(error)
    );
  }

  initTradingViewChart(): void {
    if (!window.Datafeeds || !window.Datafeeds.UDFCompatibleDatafeed) {
      alert('Datafeeds or UDFCompatibleDatafeed not initialized.');
      return;
    }
    const containerElement = document.getElementById('tradingview_bac65');
    alert(containerElement);
    const widget = new TradingView.widget({
      symbol: 'BYBIT:' + 'BTCUSDT',
      interval: 'D',
      //container_id: 'tradingview_bac65',
      container_id: containerElement,
      datafeed: new Datafeeds.UDFCompatibleDatafeed(
        'https://demo_feed.tradingview.com'
      ),
      //datafeed: new window.Datafeeds.UDFCompatibleDatafeed(environment.baseUrl),
      library_path: '/assets/charting_library/',
      locale: 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
    });

    widget.onChartReady(() => {
      console.log('Alert');
      //this.addAnnotations(widget);
    });

    // alert('okay');
    // // Create and initialize the TradingView widget
    // const tvWidget = new window.TradingView.widget(widgetOptions);
    // alert('okayokay');
    // tvWidget.onChartReady(() => {
    //   alert('Chart has been initialized.');
    // });
  }

  addCustomMarkers(): void {
    const widget = TradingView.getWidget(this.widget.id);
    const chart = widget.activeChart();

    const tpPrice = 150;
    const slPrice = 120;

    chart.createPriceLine({
      price: tpPrice,
      color: '#00FF00',
      lineWidth: 2,
      lineStyle: 0,
      title: 'Take Profit',
    });

    chart.createPriceLine({
      price: slPrice,
      color: '#FF0000',
      lineWidth: 2,
      lineStyle: 0,
      title: 'Stop Loss',
    });
  }

  initializeTradingView(symbol: string): void {
    const isFullscreen = !!document.fullscreenElement;
    const height = isFullscreen ? '100%' : 500;

    const widget = new TradingView.widget({
      autosize: true,
      symbol: 'BYBIT:' + symbol,
      interval: 'D',
      // height: document.fullscreenElement ? '100%' : 500,
      height: height,
      width: '100%',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'in',
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: 'tradingview_bac65',
      withdateranges: true,
      hide_side_toolbar: false,
      fullscreen: true,
      customFormatters: {
        price: function (price: number) {
          const priceEvent = new CustomEvent('priceChange', { detail: price });
          window.dispatchEvent(priceEvent);
          // Return the formatted price
          return parseFloat(price.toFixed(2));
        },
      },
    });

    // Listen for the custom 'priceChange' event
    window.addEventListener('priceChange', (event: CustomEvent) => {
      const price = event.detail;
    });
  }

  activeIndex: number = 0;

  //tabview 1
  data1: any[] = [
    {
      id: '100-50023',
      type: 'SHORT',
      pair1: 'XLM.',
      pair2: 'USTD',
      amount: '1.0',
      sl: '-3.13%',
      avgprice: '0.6702',
      tp: '2.82%',
      sum: '0.6684',
      created1: '18:55:34',
      created2: '11.24',
    },
  ];

  //short sell

  frlSwich1ss: boolean = true;
  frlSwich2ss: boolean = true;
  frlSwich3ss: boolean = true;
  frlSwich4ss: boolean = true;
  frlSwich5ss: boolean = true;
  frlSwich6ss: boolean = true;

  // FRL swich end
  activeButton21: string = 'btn21';
  setActiveButton21(buttonId: string) {
    this.activeButton21 = buttonId;
  }

  activeButton22: string = 'btn24';
  setActiveButton22(buttonId: string) {
    this.activeButton22 = buttonId;
  }

  activeButton23: string = 'btn28';
  setActiveButton23(buttonId: string) {
    this.activeButton23 = buttonId;
  }

  activeButton24: string = 'btn31';
  setActiveButton24(buttonId: string) {
    this.activeButton24 = buttonId;
  }

  activeButton25: string = 'btn33';
  setActiveButton25(buttonId: string) {
    this.activeButton25 = buttonId;
  }

  activeButton26: string = 'btn36';
  setActiveButton26(buttonId: string) {
    this.activeButton26 = buttonId;
  }

  activeButton27: string = 'btn38';
  setActiveButton27(buttonId: string) {
    this.activeButton27 = buttonId;
  }

  activeButton28: string = 'btn28';
  setActiveButton28(buttonId: string) {
    this.activeButton28 = buttonId;
  }

  isToggledss = false;
  isToggledss2 = false;
  isToggledss3 = false;

  sliderValue1: number = 0;
  sliderValue2: number = 0;

  updateValue1() {
    //this.calculatepercentage(this.sliderValue1);
  }

  updateValue2(event: any): void {
    this.sliderValue2 = event.target.value;
    let symbol = this.symbol.split('_').join('');
    var subuid = localStorage.getItem('accLabel');

    // this.profile.setLeverage(symbol, event.target.value, subuid).subscribe(
    //   (data: any) => {},
    //   (error: any) => {
    //     this.handleError(error);
    //     // this.toastr.error(error);
    //   }
    // );
  }

  calculateperValue(event: any, type: any): void {
    const updatedValue = event.target.value;
    this.sliderValue1 = updatedValue;
    this.calculatepercentage(updatedValue, type);
  }
  selectOrder(price: number, amount: number) {
    const parsedAmount =
      typeof amount === 'number' ? amount : parseFloat(amount);

    const total = parseFloat(parsedAmount.toFixed(this.coinonedecimal));
    const res_volume = parseFloat(
      (price * amount).toFixed(this.coinonedecimal)
    );
    this.limitform.patchValue({
      price: price,
      amount: amount,
      Volume: res_volume,
    });
    this.marketForm.patchValue({
      marketamount: total,
      marketvolume: res_volume,
    });
    this.floatForm.patchValue({
      amount: total,
      volume: res_volume,
    });
    this.stoplimitForm.patchValue({
      stopprice: price,
      stopamount: amount,
      stopvolume: res_volume,
    });
  }

  saveLeverage(): void {
    // Prepare your API payload
    var subuid = localStorage.getItem('accLabel');
    let symbol = this.symbol.split('_').join('');
    const payload = {
      leverage: this.sliderValue2,
      subuid: subuid,
    };

    // Example API call
    this.profile.setLeverage(symbol, this.sliderValue2, subuid).subscribe(
      (data: any) => {},
      (error: any) => {
        this.handleError(error);
        // this.toastr.error(error);
      }
    );
  }

  moveSliderBy10Percent1() {
    this.sliderValue1 = 10;
  }
  moveSliderBy25Percent1() {
    this.sliderValue1 = 25;
  }
  moveSliderBy30Percent1() {
    this.sliderValue1 = 30;
  }
  moveSliderBy50Percent1() {
    this.sliderValue1 = 50;
  }
  moveSliderBy75Percent1() {
    this.sliderValue1 = 75;
  }
  moveSliderBy100Percent1() {
    this.sliderValue1 = 100;
  }
  //short sell end

  longbye: any;
  shortsell: any;

  changeStatusLonBuy() {
    this.type = 'Buy';
    // this.longbye = true;
    // this.shortsell = false;
  }
  changeStatusShortSell() {
    this.type = 'Sell';
    // this.shortsell = true;
    // this.longbye = false;
  }

  // long buy active and short
  shotlongbtn: string = 'long1';

  changeActiveBtn(buttonId: string) {
    this.shotlongbtn = buttonId;
  }

  productsSignalLog: any[] = [];
  itemsDrop3: string[] = ['All', 'Init', 'Processing', 'Skip'];
  searchicon: boolean = false;
  serach123() {
    this.searchicon = !this.searchicon;
  }

  handleError(error: any) {
    console.log(error);
  }

  handlesuccess(data: any) {
    const res = data.result;
    this.tickerdatas = res;
    this.datas = data;
    this.coinone = data.coinone;
    this.cointwo = data.cointwo;
    this.coinonedecimal = data.coinonedecimal;
    this.cointwodecimal = data.cointwodecimal;
    this.symbol = data.symbol;
    this.coinonebalance = data.coinonebalance;
    this.cointwobalance = data.cointwobalance;
    this.pairid = data.pairid;

    let symbolToFind = this.route.snapshot.paramMap.get('symbol');

    for (const key in data.result) {
      if (Object.prototype.hasOwnProperty.call(data.result, key)) {
        const symbolArray = data.result[key];
        symbolArray.forEach((item: { symbol: string }) => {
          this.symbols.push(item.symbol);
        });
      }
    }

    if (symbolToFind) {
      symbolToFind = symbolToFind.replace(/_/g, '');
      for (const coin of Object.values(this.tickerdatas)) {
        const foundItem = coin.find(
          (item: any) => item.symbol === symbolToFind
        );
        if (foundItem) {
          this.lastPrice = foundItem.lastprice;
          this.ordercoinone = foundItem.coinone;
          this.ordercointwo = foundItem.cointwo;
          this.limitform.patchValue({ price: this.lastPrice });
          this.stoplimitForm.patchValue({ stopprice: this.lastPrice });
          // console.log('lastprice' + this.lastPrice);
          break; // Exit loop once found
        }
      }
    }
  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  toggleShowFavorites(): void {
    this.showOnlyFavorites = !this.showOnlyFavorites;
  }
  // getFilteredPairs(pairs: any[]): any[] {
  //   if (this.showOnlyFavorites) {
  //     return pairs.filter((item) => this.isFavorite(item.symbol));
  //   }
  //   return pairs;
  // }
  getFilteredPairs(pairs: any[]): any[] {
    if (this.showOnlyFavorites) {
      return pairs.filter((item) => this.isFavorite(item.symbol));
    } else {
      return pairs.sort((a, b) => {
        const aFavorite = this.isFavorite(a.symbol) ? 1 : 0;
        const bFavorite = this.isFavorite(b.symbol) ? 1 : 0;
        // Sort descending: favorites first
        return bFavorite - aFavorite;
      });
    }
  }
  isFavorite(symbol: string): boolean {
    return this.favoriteItems.has(symbol);
  }

  getObjectValues(obj: { [key: string]: any }): any[] {
    return Object.values(obj).reduce((acc, val) => acc.concat(val), []);
  }

  getWebsocket() {
    this.websocket.GetSingleInstanceStatus().subscribe(
      (data) => this.handletickerResponse(data),
      (error) => this.handleError(error)
    );
  }

  handletickerResponse(data: any) {
    data.forEach((item: any) => {
      const headerElement = this.el.nativeElement.querySelector(
        '.livehead_price_' + item.s
      );
      const headerElementVol = this.el.nativeElement.querySelector(
        '.livehead_vol_' + item.s
      );

      const headerElementHigh = this.el.nativeElement.querySelector(
        '.livehead_high_' + item.s
      );

      const headerElementLow = this.el.nativeElement.querySelector(
        '.livehead_low_' + item.s
      );

      const headerElementChange = this.el.nativeElement.querySelector(
        '.livehead_change_' + item.s
      );

      if (headerElement) {
        this.renderer.setProperty(
          headerElement,
          'innerHTML',
          parseFloat(item.c)
        );
        this.renderer.setProperty(
          headerElementVol,
          'innerHTML',
          parseFloat(item.v).toFixed(2)
        );
        this.renderer.setProperty(
          headerElementHigh,
          'innerHTML',
          parseFloat(item.h).toFixed(2)
        );
        this.renderer.setProperty(
          headerElementLow,
          'innerHTML',
          parseFloat(item.l).toFixed(2)
        );
        this.renderer.setProperty(
          headerElementChange,
          'innerHTML',
          parseFloat(item.P).toFixed(2)
        );
      }
      const element = this.el.nativeElement.querySelector(
        '.last_price_' + item.s
      );
      const element1 = this.el.nativeElement.querySelector(
        '.price_change_' + item.s
      );
      //sltppnl cal
      const lp = this.el.nativeElement.querySelectorAll('.liveprice' + item.s);

      //Update last price in position
      if (lp) {
        lp.forEach((lpElement: any) => {
          this.renderer.setProperty(lpElement, 'innerHTML', parseFloat(item.c));
        });
      }

      if (element) {
        this.renderer.setProperty(
          element,
          'innerHTML',
          item.c.toString().replace(/(\.\d*?[1-9])0*$/, '$1')
        );
        this.renderer.setProperty(
          element1,
          'innerHTML',
          parseFloat(item.P).toFixed(2)
        );
        if (item.P < 0) {
          this.renderer.setStyle(element1, 'background-color', 'red');
        } else {
          this.renderer.setStyle(element1, 'background-color', 'green');
        }
      } else {
        //console.log('Element not found for class: .last_price_' + item.s);
      }
    });
  }

  handletickerupdate(data: any) {
    let datas = data.data;
    datas.forEach((item: any) => {
      const element = this.el.nativeElement.querySelector(
        '.last_price_' + item.symbol
      );
      const element1 = this.el.nativeElement.querySelector(
        '.price_change_' + item.symbol
      );
      if (element) {
        this.renderer.setProperty(
          element,
          'innerHTML',
          item.lastPrice.toString().replace(/(\.\d*?[1-9])0*$/, '$1')
        );
        this.renderer.setProperty(
          element1,
          'innerHTML',
          item.priceChangePercent
        );

        if (item.P < 0) {
          this.renderer.setStyle(element1, 'background-color', 'red');
        } else {
          this.renderer.setStyle(element1, 'background-color', 'green');
        }
      } else {
        //console.log('Element not found for class: .last_price_' + item.s);
      }
    });
  }

  calculatepercentage(percent: any, type: any) {
    if (type == 'limit') {
      let price = this.limitform.get('price')?.value;
      if (parseFloat(price) == null) {
        price = this.lastPrice;
      }
      var coinbal;
      var balance;
      var ordertotal;
      let percentage = percent / 100;
      if (this.type === 'Buy') {
        coinbal = this.cointwobalance as number;
        balance = coinbal * percentage;
        ordertotal = balance / parseFloat(price);
        let ordervolume = parseFloat(balance.toFixed(this.cointwodecimal));
        if (ordertotal > 0) {
          this.limitform.patchValue({
            amount: ordertotal.toFixed(this.cointwodecimal),
            price: price,
            Volume: ordervolume,
          });
        } else {
          this.limitform.patchValue({
            amount: 0,
            price: price,
            Volume: ordervolume,
          });
        }
      } else {
        coinbal = this.coinonebalance as number;
        balance = coinbal * percentage;
        ordertotal = balance * parseFloat(price);
        let ordervolume = parseFloat(balance.toFixed(this.cointwodecimal));
        if (ordertotal > 0) {
          this.limitform.patchValue({
            amount: ordervolume,
            price: price,
            Volume: ordertotal.toFixed(this.cointwodecimal),
          });
        } else {
          this.limitform.patchValue({
            amount: 0,
            price: price,
            Volume: ordertotal.toFixed(this.cointwodecimal),
          });
        }
      }
    } else if (type == 'float') {
      let price = this.lastPrice ? String(this.lastPrice) : '0';

      if (isNaN(parseFloat(price))) {
        price = String(this.lastPrice);
      }

      var coinbal;
      var balance;
      var ordertotal;
      let percentage = percent / 100;
      if (this.type === 'Buy') {
        coinbal = this.cointwobalance as number;
        balance = coinbal * percentage;
        ordertotal = balance / parseFloat(price);
        let ordervolume = parseFloat(balance.toFixed(this.cointwodecimal));
        if (ordertotal > 0) {
          this.floatForm.patchValue({
            amount: ordertotal.toFixed(this.cointwodecimal),
            volume: ordervolume,
          });
        } else {
          this.floatForm.patchValue({ amount: 0, volume: ordervolume });
        }
      } else {
        coinbal = this.coinonebalance as number;
        balance = coinbal * percentage;
        ordertotal = balance * parseFloat(price);
        let ordervolume = parseFloat(balance.toFixed(this.cointwodecimal));
        if (ordertotal > 0) {
          this.floatForm.patchValue({
            amount: ordervolume,
            volume: ordertotal.toFixed(this.cointwodecimal),
          });
        } else {
          this.floatForm.patchValue({
            amount: 0,
            volume: ordertotal.toFixed(this.cointwodecimal),
          });
        }
      }
    } else if (type == 'stoplimit') {
      let price = this.stoplimitForm.get('stopprice')?.value;
      if (parseFloat(price) == null) {
        price = this.lastPrice;
      }
      var coinbal;
      var balance;
      var ordertotal;
      let percentage = percent / 100;
      if (this.type === 'Buy') {
        coinbal = this.cointwobalance as number;
        balance = coinbal * percentage;
        ordertotal = balance / price;
        ordervolume = ordertotal * price;
        ordervolume = parseFloat(ordervolume.toFixed(this.coinonedecimal));

        if (ordertotal > 0) {
          this.stoplimitForm.patchValue({
            stopamount: ordertotal.toFixed(this.coinonedecimal),
            stopvolume: ordervolume,
          });
        } else {
          this.stoplimitForm.patchValue({ stopamount: 0, stopvolume: 0 });
        }
      } else {
        coinbal = this.coinonebalance as number;
        balance = coinbal * percentage;
        ordertotal = balance * price;
        ordervolume = ordertotal / price;
        ordervolume = parseFloat(ordervolume.toFixed(this.coinonedecimal));

        if (ordertotal > 0) {
          this.stoplimitForm.patchValue({
            stopamount: ordertotal,
            stopvolume: ordervolume,
          });
        } else {
          this.stoplimitForm.patchValue({ stopamount: 0, stopvolume: 0 });
        }
      }
    } else if (type == 'market') {
      let price = this.lastPrice ? String(this.lastPrice) : '0';
      price = String(this.lastPrice);
      let percentage = percent / 100;
      var balance;
      var ordervolume;
      var ordertotal;
      var coinbal;

      if (this.type === 'Buy') {
        coinbal = this.cointwobalance as number;
        balance = coinbal * percentage;

        ordertotal = balance / parseFloat(price);
        ordervolume = ordertotal * parseFloat(price);
        ordervolume = parseFloat(ordervolume.toFixed(this.coinonedecimal));
        if (ordertotal > 0) {
          this.marketForm.patchValue({
            marketamount: ordertotal.toFixed(this.coinonedecimal),
            marketvolume: ordervolume,
          });
        } else {
          this.marketForm.patchValue({
            marketamount: 0,
            marketvolume: 0,
          });
        }
      } else {
        coinbal = this.coinonebalance as number;
        balance = coinbal * percentage;
        ordertotal = balance * parseFloat(price);
        ordervolume = ordertotal / parseFloat(price);
        ordervolume = parseFloat(ordervolume.toFixed(this.coinonedecimal));
        if (ordertotal > 0) {
          this.marketForm.patchValue({
            marketvolume: ordervolume,
            marketamount: ordertotal,
          });
        } else {
          this.marketForm.patchValue({
            marketamount: 0,
            marketvolume: 0,
          });
        }
      }
    }
  }

  clubformSubmit(): void {
    // console.log(this.clubform)
    if (this.clubform.valid) {
      console.log('Club form submitted:', this.clubform.value);
      
    } else {
      console.log('Club form is invalid');
    }
  }

  limit() {
    if (this.limitform.valid) {
      this.loading.show();
      this.showOrder = false;
      this.isDisabled = true;
      const formData = this.limitform.value;
      var type = localStorage.getItem('type');

      formData.side = this.type;
      formData.category = type;
      formData.symbol = this.symbol.replace(/_/g, '');
      formData.orderType = 'Limit';
      formData.timeInForce = 'GTC';
      formData.account_type = localStorage.getItem('accLabel');
      const updatedFormData = {
        ...formData,
        coinone: this.coinone,
        cointwo: this.cointwo,
        price: formData.price,
        qty: formData.amount,
      };
      console.log(updatedFormData);

      this.profile.trade(updatedFormData).subscribe(
        (data) => {
          this.limitform.patchValue({ Volume: '' });
          this.limitform.get('amount')?.reset();
          this.showOrder = true;
          this.handlebuysuccess(data);
        },
        (error) => {
          this.handleError(error);
          // this.toastr.error(error);
        }
      );
    } else {
      Object.values(this.limitform.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  onqtyChange(type: any): void {
    let lastprice = this.lastPrice;
    let price = lastprice ? parseFloat(lastprice) : 0;

    if (type == 'market') {
      let amount = this.marketForm.get('marketamount')?.value;
      let total = price * amount;
      if (total > 0) {
        this.marketForm.patchValue({
          marketvolume: total.toFixed(this.coinonedecimal),
          marketamount: amount,
        });
      } else {
        this.marketForm.patchValue({ marketvolume: 0, marketamount: '' });
      }
    } else if (type == 'float') {
      let amount = this.floatForm.get('amount')?.value;
      let total = price * amount;
      if (total > 0) {
        this.floatForm.patchValue({
          volume: total.toFixed(this.coinonedecimal),
          amount: amount,
        });
      } else {
        this.floatForm.patchValue({ volume: 0, amount: '' });
      }
    } else if (type == 'limit') {
      let amount = this.limitform.get('amount')?.value;
      let total = price * amount;
      if (total > 0) {
        this.limitform.patchValue({
          Volume: total.toFixed(this.coinonedecimal),
          amount: amount,
        });
      } else {
        this.limitform.patchValue({ Volume: 0, amount: '' });
      }
    } else if (type == 'stoplimit') {
      let stopprice = this.stoplimitForm.get('stopprice')?.value;
      if (stopprice > 0) {
        price = stopprice;
      }
      let amount = this.stoplimitForm.get('stopamount')?.value;
      let total = price * amount;
      if (total > 0) {
        this.stoplimitForm.patchValue({
          stopamount: amount,
          stopvolume: total,
        });
      } else {
        this.stoplimitForm.patchValue({ stopamount: '', stopvolume: 0 });
      }
    }
  }

  onVolumechange(type: any): void {
    let lastprice = this.lastPrice;
    let price = lastprice ? parseFloat(lastprice) : 0;

    if (type == 'market') {
      let volume = this.marketForm.get('marketvolume')?.value;
      let total = parseFloat(volume) / price;
      total = parseFloat(total.toFixed(this.coinonedecimal));
      if (total > 0) {
        this.marketForm.patchValue({
          marketamount: total,
          marketvolume: volume,
        });
      } else {
        this.marketForm.patchValue({ marketamount: 0, marketvolume: '' });
      }
    } else if (type == 'limit') {
      let volume = this.limitform.get('Volume')?.value;
      let total = parseFloat(volume) / price;
      total = parseFloat(total.toFixed(this.coinonedecimal));
      if (total > 0) {
        this.limitform.patchValue({ amount: total, Volume: volume });
      } else {
        this.limitform.patchValue({ amount: 0, Volume: '' });
      }
    } else if (type == 'float') {
      let volume = this.floatForm.get('volume')?.value;
      let total = parseFloat(volume) / price;
      total = parseFloat(total.toFixed(this.coinonedecimal));
      if (total > 0) {
        this.floatForm.patchValue({ amount: total, volume: volume });
      } else {
        this.floatForm.patchValue({ amount: 0, volume: '' });
      }
    } else if (type == 'stoplimit') {
      let volume = this.stoplimitForm.get('stopvolume')?.value;
      var stopprice = this.stoplimitForm.get('stopprice');
      if (stopprice && stopprice.value > 0) {
        let price = stopprice;
      }
      let total = parseFloat(volume) / price;
      total = parseFloat(total.toFixed(this.coinonedecimal));
      if (total > 0) {
        this.stoplimitForm.patchValue({
          stopamount: total,
          stopvolume: volume,
        });
      } else {
        this.stoplimitForm.patchValue({ stopamount: 0, stopvolume: '' });
      }
    }
  }

  onPriceChange(type: any): void {
    if (type == 'limit') {
      let price = this.limitform.get('price')?.value;
      let qty = this.limitform.get('amount')?.value;
      if (qty) {
        let total = qty * price;
        total = parseFloat(total.toFixed(this.coinonedecimal));
        if (total > 0) {
          this.limitform.patchValue({ amount: qty, Volume: total });
        } else {
          this.limitform.patchValue({ amount: qty, Volume: 0 });
        }
      }
    } else if (type == 'stoplimit') {
      let price = this.stoplimitForm.get('stopprice')?.value;
      let qty = this.stoplimitForm.get('stopamount')?.value;
      if (qty) {
        let total = qty * price;
        total = parseFloat(total.toFixed(this.coinonedecimal));
        if (total > 0) {
          this.stoplimitForm.patchValue({ stopamount: qty, stopvolume: total });
        } else {
          this.stoplimitForm.patchValue({ stopamount: qty, stopvolume: 0 });
        }
      }
    }
  }

  Sellmarket() {
    if (this.marketForm.valid) {
      this.loading.show();
      this.showOrder = false;
      this.isDisabled = true;
      const formData = this.marketForm.value;
      var type = localStorage.getItem('type');
      formData.side = this.type;
      formData.category = type;
      formData.symbol = this.symbol.replace(/_/g, '');
      formData.orderType = 'Market';
      formData.timeInForce = 'IOC';
      formData.reduce_only = false;
      formData.closeOnTrigger = false;
      formData.account_type = localStorage.getItem('accLabel');
      const updatedFormData = {
        ...formData,
        coinone: this.coinone,
        cointwo: this.cointwo,
        price: this.lastPrice,
        qty: formData.marketamount,
      };
      delete updatedFormData.marketamount;
      this.profile.trade(updatedFormData).subscribe(
        (data) => {
          this.showOrder = true;
          this.marketForm.reset();
          this.handlebuysuccess(data);
        },
        (error) => {
          this.handleError(error);
          // this.toastr.error(error);
        }
      );
    } else {
      Object.values(this.marketForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  stoplimit() {
    console.log('kk');
    if (this.stoplimitForm.valid) {
      this.loading.show();
      this.isDisabled = true;
      const formData = this.stoplimitForm.value;
      var type = localStorage.getItem('type');
      formData.side = this.type;
      formData.category = type;
      formData.symbol = this.symbol.replace(/_/g, '');
      formData.orderType = 'Limit';
      formData.timeInForce = 'GTC';
      formData.account_type = localStorage.getItem('accLabel');
      const updatedFormData = {
        ...formData,
        coinone: this.coinone,
        cointwo: this.cointwo,
        price: formData.stopprice,
        qty: formData.stopamount,
        triggerprice: formData.price,
      };

      console.log('ist', formData);

      delete updatedFormData.stopprice;
      delete updatedFormData.stopamount;
      this.profile.trade(updatedFormData).subscribe(
        (data) => {
          this.handlebuysuccess(data);
        },
        (error) => {
          this.handleError(error);
          // this.toastr.error(error);
        }
      );
    } else {
      Object.values(this.stoplimitForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  float() {
    if (this.floatForm.valid) {
      this.loading.show();
      this.showOrder = false;
      this.isDisabled = true;
      const formData = this.floatForm.value;
      formData.side = this.type;
      formData.category = 'linear';
      formData.symbol = this.symbol.replace(/_/g, '');
      formData.orderType = 'Limit';
      formData.timeInForce = 'GTC';
      formData.account_type = localStorage.getItem('accLabel');
      const updatedFormData = {
        ...formData,
        coinone: this.coinone,
        cointwo: this.cointwo,
        price: this.lastPrice,
        qty: formData.amount,
      };
      delete updatedFormData.buyprice;
      delete updatedFormData.amount;
      this.profile.trade(updatedFormData).subscribe(
        (data) => {
          this.showOrder = true;
          this.floatForm.reset();
          this.handlebuysuccess(data);
        },
        (error) => {
          this.handleError(error);
        }
      );
    } else {
      Object.values(this.floatForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  cancelOrder(id: any, type: string) {
    this.profile.cancelOrder(id, type).subscribe(
      (data: any) => {
        if (data.success) {
          this.childTrades = this.childTrades.filter(
            (trade: { orderid: any; type: string }) =>
              trade.orderid !== id || trade.type !== type
          );
        }
      },
      (error) => this.handleError(error)
    );
  }

  /* future trade complete */
  Canceltrade(id: number, linkid: number, symbol: string) {
    this.loading.show();
    this.isDisabled = true;
    var type = localStorage.getItem('type');
    // console.log(id, '-', symbol,'--',linkid);
    // return;
    this.profile
      .canceltrade(symbol, linkid, id, type, localStorage.getItem('accLabel'))
      .subscribe(
        (data) => this.handlecanceltradesuccess(data),
        (error) => this.handleError(error)
      );
  }

  handlebuysuccess(data: any) {
    this.loading.hide();
    this.isDisabled = false;

    if (data.success) {
      this.positionList();
      this.openTrade();
      this.CloseTrade();
      this.clickAlltrade();

      this.loading.hide();
      this.error = null;
      this.toastr.success(data.message);
    } else {
      this.toastr.error(data.message);
    }
  }

  handlepositionlistsuccess(data: any) {
    if (data.success) {
      this.positionTrades = data.result.result.list;
      let symbol = this.symbol.split('_').join('');

      for (let i = 0; i < this.positionTrades.length; i++) {
        if (this.positionTrades[i].symbol == symbol) {
          this.positionSingleList = this.positionTrades[i];

          var subuid = localStorage.getItem('accLabel');
          this.gettpsl(
            this.positionSingleList.side,
            this.positionSingleList.symbol,
            subuid
          );

          if (this.tpEnabled) {
            this.tpClick(this.positionSingleList);
          }
          if (this.slEnabled) {
            this.slClick(this.positionSingleList);
          }
          if (this.slxEnabled) {
            this.updateTpList(
              this.positionSingleList.side,
              this.positionSingleList.symbol
            );
          }
        }
      }
    } else {
      this.handleError(data.message);
    }
  }

  gettpsl(side: any, symbol: any, subuid: any) {
    this.profile.childtrade(side, symbol, subuid).subscribe(
      (data: any) => {
        this.childTrades = data.result;
        console.log('agg', this.childTrades);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleopenordersuccess(data: any) {
    let res = data.result;
    if (data.success) {
      this.openorders = res;
    } else {
      this.handleError(data.message);
    }
  }

  handleclosedtradessuccess(data: any) {
    let type = localStorage.getItem('type');
    // console.log(type)
    let res = data.result;
    console.log(res)
    const trades = [];
    // if (data.success) {
      if (type == 'spot') {
        this.closedtrades = res;
        // console.log(this.closedtrades);
      }
      if (type == 'linear') {
        for (let i = 0; i < res.length; i++) {
          if (res[i].orderStatus === 'Filled') {
            trades.push(res[i]);
          }
        }
        this.positionCloseTrades = trades;
      }
    // } else {
    //   this.handleError(data.message);
    // }
  }

  handlealltradessuccess(data: any) {
    let type = localStorage.getItem('type');
    let res = data.result;
    if (data.success) {
      if (type == 'spot') {
        this.alltrades = res;
      } else if (type == 'linear') {
      }
    } else {
      this.handleError(data.message);
    }
  }

  handlecanceltradesuccess(data: any) {
    this.loading.hide();
    this.isDisabled = false;

    if (data.success) {
      this.positionList();
      this.openTrade();
      this.CloseTrade();
      this.clickAlltrade();

      this.loading.hide();
      this.error = null;
      this.toastr.success(data.message);
    } else {
      this.toastr.error(data.message);
    }
  }

  // redirectToWallet(coin:string){
  //   this.router.navigate(['/app/wallets'], { queryParams: { key1:coin, key2: 'withdraw' } });
  // }

  changeLeveloff(selectedValue: any) {}

  sendCoinToWallet(coin: string, type: string) {
    this.router.navigate(['/app/wallets']);
    this.walletCommunicationService.sendCoinData(coin, type);
  }

  //Balance in Metamask Wallet
  async metaBalance(address: string) {
    this.web3 = new Web3(window.ethereum);
    const balanceWei = await this.web3.eth.getBalance(address);
    const balanceEther = this.web3.utils.fromWei(balanceWei, 'ether');
    console.log('Balance:', balanceEther, 'ETH');
  }

  metaMFormSubmit() {
    if (this.metaMForm.valid) {
    } else {
      Object.values(this.metaMForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  //Send Amount User Wallet to Client wallet Metamask
  async transfer(fromAddress: string, toAddress: string, amount: number) {
    this.web3 = new Web3(window.ethereum);
    const amountWei = this.web3.utils.toWei(amount.toString(), 'ether');
    try {
      const txHash = await this.web3.eth.sendTransaction({
        from: fromAddress,
        to: toAddress,
        value: amountWei,
      });
      console.log('Transaction hash:', txHash);
      return txHash;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }

  slClick(data: any) {
    this.activeSl = true;
    this.slForm.symbol = data.symbol;
    this.slForm.side = data.side;
    this.slForm.price = data.avgPrice;
    this.slForm.coinone = this.coinone;
    this.slForm.cointwo = this.cointwo;
  }

  toggleCheckbox(type: 'price' | 'fixedRisk' | 'fromPosition') {
    if (type === 'price') {
      this.slForm.slType = 'price';
    } else if (type === 'fixedRisk') {
      this.slForm.slType = 'fixedRisk';
    } else if (type === 'fromPosition') {
      this.slForm.slType = 'fromPosition';
    }
  }

  validationErrors = {
    slType: false,
    price: false,
    risk: false,
    offset: false,
  };

  validateForm() {
    this.validationErrors.slType = !this.slForm.slType;
    this.validationErrors.price =
      this.slForm.slType === 'price' && !this.slForm.price;
    this.validationErrors.risk =
      this.slForm.slType === 'fixedRisk' && !this.slForm.risk;
    this.validationErrors.offset =
      this.slForm.slType === 'fromPosition' && !this.slForm.offset;

    return (
      !this.validationErrors.slType &&
      !this.validationErrors.price &&
      !this.validationErrors.risk &&
      !this.validationErrors.offset
    );
  }

  slFormSubmit() {
    if (this.validateForm()) {
      this.loading.show();
      this.slForm.account_type = localStorage.getItem('accLabel') ?? '';
      this.slForm.category = 'linear';
      var sldata = {
        symbol:  this.symbol.replace(/_/g, ''),
        side: this.slForm.side === 'Buy' ? 'Sell' : 'Buy',
        orderType: 'Limit',
        slOrderType: 'Limit',
        price: this.slForm.price,
        qty: this.slForm.price,
        triggerPrice: this.slForm.price,
        reduce_only: true,
        timeInForce: 'GTC',
        category: 'linear',
        executeType: this.slForm.slType,
        account_type: this.slForm.account_type,
      };

      console.log(sldata);

      this.profile.stopLoss(sldata).subscribe(
        (data) => this.handlebuysuccess(data),
        (error) => {
          this.handleError(error);
        }
      );
    } else {
      console.log('Form has errors', this.validationErrors);
    }
  }

  slxFormSubmit() {
    if (this.slXForm.slxtype == 'TP') {
      this.profile.updateSlxTp(this.slXForm).subscribe(
        (data: any) => {
          if (data.success) {
            this.toastr.success(data.message);
          } else {
            this.toastr.error(data.message);
          }
        },
        (error) => {
          this.handleError(error);
        }
      );
    } else {
      if (this.isValidSlx()) {
        var account_type = localStorage.getItem('accLabel') ?? '';
        var entryprice = this.positionSingleList.avgPrice;
        var side = this.positionSingleList.side;
        var symbol = this.symbol.replace('_', '');
        var size = this.positionSingleList.size;

        var data = {
          profitpercentage: this.slXForm.profitpercentage,
          offset: this.slXForm.offset,
          trailingpercentage: this.slXForm.trailingpercentage,
          trailoffset: this.slXForm.trailoffset,
          trailstep: this.slXForm.trailStep,
          minimumpositonVolume: this.slXForm.minvalue,
          account_type: account_type,
          positionprice: entryprice,
          side: side,
          coinone: this.coinone,
          cointwo: this.cointwo,
          size: size,
          symbol: symbol,
        };

        this.profile.updateSLXPrice(data).subscribe(
          (data: any) => {
            if (data.success) {
              this.toastr.success(data.message);
            } else {
              this.toastr.error(data.message);
            }
          },
          (error: any) => {
            this.handleError(error);
          }
        );
      }
    }
  }

  isValidSlx(): boolean {
    return true;
  }

  generateDivs(): void {
    this.divArray = Array.from({ length: this.tpNoo });
    this.priceArray = [];
    this.amountArray = [];
    this.activation = [];

    var price = this.tPForm.price;
    var amount = this.tPForm.qty;
    if (price == 0) {
      for (let i = 0; i < this.tpNoo; i++) {
        this.priceArray.push({ p: 0, c: 100 });
        this.amountArray.push({ a: 0, pc: 100 });
      }
    } else {
      // const initialPrice = price / this.tpNoo;
      const priceper = (100 / this.tpNoo).toFixed(2);
      const Dividedamount = (amount / this.tpNoo).toFixed(2);
      for (let i = 0; i < this.tpNoo; i++) {
        this.priceArray.push({ p: price, c: 100 });
        this.amountArray.push({ a: parseFloat(Dividedamount), pc: 100 });
      }
    }
    for (let i = 0; i < this.tpNoo; i++) {
      this.activation.push({ label: `TP ${i + 1}`, value: i + 1 });
    }
  }

  toggleFavorite(symbol: string): void {
    if (this.favoriteItems.has(symbol)) {
      this.favoriteItems.delete(symbol);
    } else {
      this.favoriteItems.add(symbol);
    }
    console.log('Favorites:', this.favoriteItems);
  }
  setFav(symbol: string): void {
    console.log('Toggling favorite for:', symbol);

    if (this.favoriteItems.has(symbol)) {
      this.favoriteItems.delete(symbol);
    } else {
      this.favoriteItems.add(symbol);
    }

    const data = {
      pair: Array.from(this.favoriteItems),
    };
    console.log(data);

    this.profile.storefav(data).subscribe(
      (response: any) => {
        console.log('Response from server:', response);
        if (response.success) {
          this.toastr.success('Favorites updated successfully');
        } else {
          this.toastr.error('Failed to update favorites');
        }
      },
      (error) => {
        console.error('Error while updating favorites:', error);
        // this.toastr.error('Failed to update favorites');
      }
    );

    localStorage.setItem(
      'favorites',
      JSON.stringify(Array.from(this.favoriteItems))
    );
  }

  //Tp form price percentage cal
  calpriceTP(event: any, i: number) {
    let livePrice = this.tPForm.price ? this.tPForm.price : 0;
    const percentage = parseFloat(event.target.value);
    if (isNaN(percentage)) {
      this.priceArray[i].p = livePrice;
      return;
    }
    const priceDifference = livePrice * (percentage / 100);
    const newPrice = livePrice + priceDifference;
    this.priceArray[i].p = newPrice;
  }

  calpercentageTP(event: any, i: number) {
    let Liveprice = this.tPForm.price ? this.tPForm.price : 0;
    const price = event.target.value;
    const percentageDifference = ((price - Liveprice) / Liveprice) * 100;
    if (isNaN(percentageDifference)) {
      this.priceArray[i].c = 0.0;
    } else {
      this.priceArray[i].c = parseFloat(percentageDifference.toFixed(2));
    }
  }

  tpClick(data: any) {
    this.activeTp = true;
    this.tPForm.price = data.avgPrice;
    this.tPForm.symbol = data.symbol;
    this.tPForm.qty = 100;
    this.tPForm.side = data.side;
    this.tPForm.orderID = data.orderID;
    this.generateDivs();
  }

  isTpValid(): boolean {
    let len = this.tpNoo;
    let crt = true;

    for (let i = 0; i < len; i++) {
      if (this.priceArray[i].p !== null && this.amountArray[i].a === null) {
        this.toastr.error(
          `Required Quantity for ${this.priceArray[i].p.toFixed(2)} Price`
        );
        crt = false;
        break;
      }
      if (this.priceArray[i].p === null && this.amountArray[i].a !== null) {
        this.toastr.error(
          `Required Price For ${this.amountArray[i].a.toFixed(2)} Amount`
        );
        crt = false;
        break;
      }
      if (
        (this.priceArray[i].p === null || this.priceArray[i].p === 0) &&
        (this.amountArray[i].a === null || this.amountArray[i].a === 0)
      ) {
        crt = false;
        return crt;
      }
    }
    return crt;
  }

  tpFormSubmit() {
    if (this.isTpValid()) {
      this.tPForms = [];
      for (let i = 0; i < this.tpNoo; i++) {
        const tpprice = this.priceArray[i].p;
        const amount = this.amountArray[i].a;
        const positionval = this.positionSingleList.size;
        const qty = (amount / 100) * positionval;
        const newTPForm = {
          price: tpprice,
          qty: qty,
        };
        this.tPForms.push(newTPForm);
      }
      const transformedTPForm = {
        price: this.tPForms.map((form) => form.price),
        qty: this.tPForms.map((form) => form.qty),
        orderType: this.tPForm.orderType,
        orderTigger: this.tPForm.orderTigger,
        symbol: this.tPForm.symbol,
        account_type: localStorage.getItem('accLabel') ?? '',
        category: 'linear',
        side: this.tPForm.side,
        coinone: this.coinone,
        cointwo: this.cointwo,
        rearrange: this.tPForm.rearrange,
      };

      this.profile.takeProfit(transformedTPForm).subscribe(
        (data) => this.handlebuysuccess(data),
        (error) => {
          this.handleError(error);
        }
      );
    }
  }
}

function viewChild(
  arg0: string
): (target: SubmainpanelComponent, propertyKey: 'tab2') => void {
  throw new Error('Function not implemented.');
}
