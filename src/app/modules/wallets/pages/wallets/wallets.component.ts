import {
  Component,
  OnInit,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';
import { WalletService } from 'src/app/Services/wallet.service';
import { Router } from '@angular/router';
import { WalletCommunicationService } from 'src/app/Services/walletcommunication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { data } from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/Services/profile.service';
import { UserService } from '../../../../Services/user.service';
import Web3 from 'web3';
// import { BigNumberish } from 'ethers';
import {
  USDT_ABI,
  USDC_ADD_BNB,
  USDC_ADD_ETH,
  USDT_ADD_ETH,
  USDT_ADD_BNB,
  USDC_CLIENT_ADD,
} from 'src/app/contract/contract';

declare let window: any;
interface CoinsOne {
  name: string;
  code: string;
}
interface CoinsTwo {
  name: string;
  code: string;
}

interface ChainList {
  name: string;
  code: string;
}

interface ConvertList {
  name: string;
  code: string;
}
interface Transfer {
  name: string;
  code: string;
}

interface ChainList {
  name: string;
  code: string;
}

interface Coin {
  source: string; // Define the structure of the Coin interface
  // Add other properties as needed
}

interface Coindep {
  type: string; // Define the structure of the Coin interface
  // Add other properties as needed
}

interface Coinwallet {
  coin: string;
  source: string; // adjust the type as needed
}

interface Coinbalance {
  coin: string; // Define the structure of the Coin interface
  // Add other properties as needed
}

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WalletsComponent implements OnInit {
  selectedSection: number = 0;
  visible: boolean = false;
  listOptions: any[] = [];
  netWorkOptions: any[] = [];
  Funding: boolean = false;
  Contract: boolean = false;
  Balance: boolean = false;
  Deposit: boolean = false;
  Withdraw: boolean = false;
  depofirst: boolean = false;
  deposecond: boolean = false;
  depo2: boolean = false;
  wallet: boolean = false;
  wallet1: boolean = false;
  Transfer: boolean = false;
  Transfer1: boolean = false;
  activeGenAdd: boolean = false;
  activeAddress: boolean = true;
  datas: any;
  coinData!: string | null;
  reType!: string | null;
  public searchTerm: string = '';
  userRole: string | null = null;
  metaMaskAddress: string | null = null;
  deposit: any = [];
  withdraw: any = [];
  firstcoin: any;
  ingredient!: string;
  responseData: any;
  detailsData: any;
  Userbalance: any;
  amountToSend: number = 0;
  i: number = 0;
  k: number = 0;
  assetData: any;
  transCoin: any;
  transFrom: any;
  transTo: any;
  web3: any;
  metamaskBalance: any;
  Userbalancemerged: any;

  activeButton: string = 'btn1';
  withdrawForm: FormGroup;
  transferForm: FormGroup;
  metaMForm: FormGroup;
  selectedNetwork: string = '';
  apiError: string | null = null;

  filteredCoins: any; // Filtered coins based on search query
  searchQuery: string = '';
  searchQuerydep: string = '';
  searchQueryBalance: string = '';
  filteredCoinsdep: any;
  filteredCoinswallet: any;
  filteredCoinsdepbalance: any;
  chainList: ChainList[] | any;
  transferList: Transfer[] | any;
  coinsListOne: CoinsTwo[] | any;
  selectedCoinOne: CoinsTwo | undefined;
  coinsListTwo: CoinsTwo[] | any;
  concvertList: ConvertList[] | any;
  selectedCoinTwo: CoinsTwo | undefined;
  selectedItem!: string;

  constructor(
    private walletService: WalletService,
    private fb: FormBuilder,
    private el: ElementRef,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private walletCommunicationService: WalletCommunicationService,
    private profile: ProfileService,
    private userService: UserService,
    private router: Router
  ) {
    this.withdrawForm = this.fb.group({
      label: [''],
      network: ['', Validators.required],
      address: ['', Validators.required],
      // OTP: ['', Validators.required],
      amount: [
        '',
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
    });
    this.transferForm = this.fb.group({
      option: ['', Validators.required],
      amount: [
        '',
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
    });
    this.metaMForm = this.fb.group({
      amount: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  metaForm = {
    selectedCoinOne: '',
    selectedCoinTwo: '',
    amount: '',
    chainID: '',
  };

  transForm = {
    amount: '',
  };

  onCopySuccess() {
    const inputElement =
      this.el.nativeElement.parentElement.querySelector('#copy-clipboard-id');
    if (inputElement) {
      inputElement.select();
      document.execCommand('copy');
    }
    // this.toastr.success('Text copied successfully!', 'Success');
  }

  onCoinSelectionChange(selectedCoin: any) {
    this.transCoin = selectedCoin.target.value;
  }

  transSubmit() {
    if (
      this.transCoin !== null &&
      this.transFrom !== undefined &&
      this.transTo !== undefined &&
      this.transForm.amount !== null
    ) {
      let transData = {
        amount: this.transForm.amount,
        coin: this.transCoin,
        account_type: localStorage.getItem('accLabel'),
        from: this.transFrom,
        to: this.transTo,
      };
      this.walletService.transsubmit(transData).subscribe(
        (data) => this.handlesuccess(data),
        (error) => this.handleError(error)
      );
    }
  }

  walletRedirect(coin: any) {
    alert(coin);
    this.Transfer = true;
    this.Balance = false;
  }

  onSubmit() {
    if (this.withdrawForm.valid) {
      const formData = new FormData();

      Object.keys(this.withdrawForm.value).forEach((key) => {
        formData.append(key, this.withdrawForm.value[key]);
      });

      //for basic user Eth address withdraw through his metamask address
      if (!this.activeAddress && this.metaMaskAddress !== null) {
        formData.append('address', this.metaMaskAddress);
      }

      formData.append('coin', this.detailsData.result.asset);
      this.walletService.withdrawsubmit(formData).subscribe(
        (data) => this.handlesuccess(data),
        (error) => this.handleError(error)
      );
    } else {
      Object.values(this.withdrawForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }

  setActiveButton(buttonId: string) {
    this.activeButton = buttonId;
  }

  copied: boolean = false;

  copyAddr(address: string) {
    const textToCopy = address?.trim();
    navigator.clipboard.writeText(textToCopy);
    this.copied = true;

    setTimeout(() => {
      this.copied = false;
    }, 10000);
  }

  Balancetable = [
    {
      name: '',
    },
  ];

  depositforst = [
    {
      name: 'BTC',
      imageUrl1: '../../assets/bitcoin.png',
    },
    {
      name: 'BTC',
      imageUrl1: '../../assets/bitcoin.png',
    },
  ];

  depositsecond = [
    {
      name: 'BNB Smart Chain (BEP20)',
    },
    {
      name: 'Bitcoin',
    },
    {
      name: 'BNB Beacon Chain (BEP2)',
    },
    {
      name: 'BTC (SegWit)',
    },
    {
      name: 'Ethereum (ERC20)',
    },
    {
      name: 'Lightning Network',
    },
  ];

  async ngOnInit() {
    // this.getWalletData();
     setInterval(async () => {
       await this.Walletbalance();

     }, 30000);
    this.setActiveButton('btn1');
    this.Walletbalance();
    // this.contract();
    // this.funding();
    this.Balance = true;
    this.DepositHistory();
    this.WithdrawHistory();

    this.walletCommunicationService.coinData$.subscribe((data) => {
      this.coinData = data.coin;
      this.reType = data.type;
      if (this.coinData !== null && this.coinData !== undefined) {
        this.fromPanel(this.coinData, this.reType);
      }
    });

    await this.setUserRole();

    this.coinsListOne = [
      { name: 'USDT', code: 'USDT' },
      { name: 'USDC', code: 'USDC' },
    ];
    this.coinsListTwo = [
      { name: 'USDTms', code: 'USDTMS' },
      { name: 'USDCms', code: 'USDCMS' },
    ];
    this.chainList = [
      { name: 'ETH', code: '0x1' },
      { name: 'BNB', code: '0x38' },
      { name: 'MATIC', code: '0x89' },
    ];
    this.transferList = [
      { name: 'Unified Trading', code: '0x1' },
      { name: 'Funding', code: '0x38' },
    ];

    this.concvertList = [
      { name: 'Unified Trading', code: 'UNIFIED' },
      { name: 'Funding', code: 'FUND' },
      { name: 'Contract', code: 'CONTRACT' },
    ];

    this.metaForm.selectedCoinOne = this.coinsListOne[0].code;
    this.metaForm.selectedCoinTwo = this.coinsListTwo[0].code;
    // this.metaForm.chainID = this.chainList[0].code;

    // if (typeof window.ethereum !== 'undefined') {
    //        window.ethereum.request({ method: 'eth_chainId' })
    //     .then((chainId:any) => {
    //         this.metaBalance(this.coinsListOne[0].code ,chainId);
    //         console.log('Current network ID:', chainId);
    //      })
    //     .catch((error:any) => {
    //         console.error('Error fetching network ID:', error);
    //     });
    // } else {
    //  console.error('MetaMask is not installed.');
    // }
  }

  DepositHistory() {
    this.walletService
      .depositHistory(localStorage.getItem('accLabel'))
      .subscribe(
        (data: any) => {
          if (Array.isArray(data.result)) {
            this.deposit = data.result;
          } else {
            console.error(
              'The API response does not indicate success or result is not an array'
            );
          }
        },
        (error) => {
          this.handleError(error);
        }
      );
  }
  WithdrawHistory() {
    this.walletService
      .withdrawHistory(localStorage.getItem('accLabel'))
      .subscribe(
        (data: any) => {
          if (Array.isArray(data.result)) {
            this.withdraw = data.result;
          } else {
            console.error(
              'The API response does not indicate success or result is not an array'
            );
          }
        },
        (error) => {
          this.handleError(error);
        }
      );
  }

  async setUserRole() {
    try {
      this.userService.getUserRole().subscribe((role) => {
        this.userRole = role;
      });
      //this.metaMaskAddress = userData.result.acc;
    } catch (error) {
      this.handleError(error);
    }
  }

  fromPanel(coinData: string | null, reType: string | null) {
    if (reType == 'withdraw') {
      this.Balance = false;
      this.Deposit = false;
      this.Withdraw = true;
      this.Transfer = false;
      this.wallet = true;
      this.assetdetails(coinData);
      this.setActiveButton('btn3');
    } else if (reType == 'deposit') {
      this.Balance = false;
      this.Deposit = true;
      this.Withdraw = false;
      this.Transfer = false;
      this.depofirst = true;
      this.assetdetails(coinData);
      this.setActiveButton('btn2');
    } else if (reType == 'all') {
      this.Balance = true;
      this.Deposit = false;
      this.Withdraw = false;
      this.Transfer = false;
      this.depofirst = false;
      this.Walletbalance();
      this.contract();
      this.funding();
      this.setActiveButton('btn1');
    } else if (reType == 'transfer') {
      this.Balance = false;
      this.Deposit = false;
      this.Withdraw = false;
      this.Transfer = true;
      this.depofirst = false;
      this.Transfer1 = true;
      this.setTransfer(coinData);
      this.setActiveButton('btn4');
    }

    this.coinData = null;
    this.reType = null;
  }

  filterItems(): void {
    if (this.searchQuery.trim() === '') {
      // If search query is empty, show all coins
      this.filteredCoins = this.responseData.coins;
    } else {
      // Otherwise, filter coins based on search query
      this.filteredCoins = this.responseData.coins.filter((coin: Coin) =>
        coin.source.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  filterItemsdep(): void {
    if (this.searchQuerydep.trim() === '') {
      // If search query is empty, show all coins
      this.filteredCoinsdep = this.detailsData.network;
    } else {
      // Otherwise, filter coins based on search query
      this.filteredCoinsdep = this.detailsData.network.filter(
        (coindep: Coindep) =>
          coindep.type.toLowerCase().includes(this.searchQuerydep.toLowerCase())
      );
    }
  }

  filterItemsbalance(): void {
    if (this.searchQueryBalance.trim() === '') {
      // If search query is empty, show all coins
      this.filteredCoinsdepbalance = this.Userbalancemerged;
    } else {
      // Otherwise, filter coins based on search query
      this.filteredCoinsdepbalance = this.Userbalancemerged.filter(
        (coinbalance: Coinbalance) =>
          coinbalance.coin
            .toLowerCase()
            .includes(this.searchQueryBalance.toLowerCase())
      );
    }
    console.log('Filtered coins:', this.filteredCoinsdepbalance);
  }

  setNetworkOptions(networkList: any[]) {
    this.netWorkOptions = networkList;
  }

  onClickSection(num: number) {
    this.selectedSection = num;
  }

  getWalletData(type: string) {
    var coin = this.filteredCoins[0].source;

    this.assetdetails(coin);
    if (type == 'deposit') {
      this.depofirst = true;
      this.depo2 = false;
    } else {
      this.wallet = true;
    }
  }

  onAccountTypeChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'unified') {
      this.Walletbalance();
    }
    else if(selectedValue === 'contract')
    {
      this.contract();
    }
    else if(selectedValue === 'funding')
    {
      this.fundings();
      
    }
  }

  Walletbalance() {
    //get local data with commissons coins
    this.walletService
      .Walletdetails(localStorage.getItem('accLabel'))
      .subscribe(
        (data) => {
          this.responseData = data;
          console.log(data);
          this.filteredCoins = this.responseData.coins;
          this.filteredCoinswallet = this.responseData.result;
          this.mergeData();
        },
        (error) => this.handleError(error)
      );
  }

  fundings() {
    // Your logic for the "Funding" option
    console.log('Funding selected');
    const accLabel = localStorage.getItem('accLabel');
    this.walletService.fundingWalletdetails(accLabel, 'FUND').subscribe(
      (data) => {
        this.responseData = data;
        console.log(data);
        this.filteredCoins = this.responseData.coins;
        this.filteredCoinswallet = this.responseData.result;
        this.mergeData();
      },
      (error) => this.handleError(error)
    );
  }

  funding() {
    const accLabel = localStorage.getItem('accLabel');
    this.walletService.fundingWalletdetails(accLabel, 'FUND').subscribe(
      (data) => {
        this.responseData = data;
        console.log(data);
        this.filteredCoins = this.responseData.coins;
        this.filteredCoinswallet = this.responseData.result;
        this.mergeData();
      },
      (error) => this.handleError(error)
    );
  }

  // mergeDatas() {
  //   if (Array.isArray(this.filteredCoinswallet?.balance)) {
  //     this.filteredCoinsdepbalance = this.filteredCoinswallet.balance.filter((item: { walletBalance: number; }) => item.walletBalance !== 0);
  //     this.filteredCoinsdepbalance.sort((a: { coin: string; }, b: { coin: any; }) => a.coin.localeCompare(b.coin));
  //   } else {
  //     console.error('filteredCoinswallet.balance is not an array');
  //     this.filteredCoinsdepbalance = [];
  //   }
  // }

  contract() {
    const accLabel = localStorage.getItem('accLabel');
    this.walletService.contractWalletdetails(accLabel, 'CONTRACT').subscribe(
      (data) => {
        this.responseData = data;
        console.log(data);
        this.filteredCoins = this.responseData.coins;
        this.filteredCoinswallet = this.responseData.result;
        this.mergeData();
      },
      (error) => this.handleError(error)
    );
  }

  //this is not use for we get data records from db
  balancebybit() {
    //get balance from api
    this.walletService
      .userWallet(localStorage.getItem('accLabel'))
      .subscribe((data: any) => {
        if (data.success) {
          // console.log('res',data.result.result.list[0].coin);
          console.log('res', data.result);

          this.Userbalance = data.result;
        } else {
          this.Userbalance = data;
        }
        this.mergeData();
      });
  }

  // onSelect(item: string) {
  //   this.depofirst = true;
  //   this.depo2 = false;
  //   this.selectedItem = item;
  //   this.assetdetails(item);
  // }

  mergeData() {
    if (
      this.Userbalance &&
      this.Userbalance.length > 0 &&
      this.filteredCoinswallet &&
      this.filteredCoinswallet.length > 0
    ) {
      const mergedData = this.Userbalance.concat(
        this.filteredCoinswallet.filter((filteredCoin: Coinwallet) => {
          return !this.Userbalance.some(
            (userCoin: Coinwallet) => userCoin.coin === filteredCoin.coin
          );
        })
      );

      this.Userbalancemerged = mergedData;
      this.filteredCoinsdepbalance = mergedData;
    } else {
      if (this.Userbalance && this.Userbalance.length > 0) {
        this.Userbalancemerged = this.Userbalance;
        this.filteredCoinsdepbalance = this.Userbalance;
        this.filteredCoinsdepbalance.sort(
          (a: { walletBalance: number }, b: { walletBalance: number }) =>
            b.walletBalance - a.walletBalance
        );
      } else {
        this.Userbalancemerged = this.filteredCoinswallet;
        this.filteredCoinsdepbalance = this.filteredCoinswallet;
        this.filteredCoinsdepbalance.sort(
          (a: { walletBalance: number }, b: { walletBalance: number }) =>
            b.walletBalance - a.walletBalance
        );
      }
    }
  }

  addGen() {
    this.assetData['account_type'] = localStorage.getItem('accLabel');
    this.walletService
      .addressGenerate(this.assetData)
      .subscribe((data: any) => {
        if (data.success) {
          this.activeGenAdd = false;
          this.detailsData.network[this.k].address = data.result;
          this.detailsData.network[this.k].qrcode =
            'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=' +
            data.result +
            '&choe=UTF-8';
          this.depo2 = true;
          this.filteredCoinsdep = this.detailsData.network;
        } else {
          this.toastr.error('Something Went Wrong. Try again Later');
        }
      });
  }

  handleError(error: any) {
    console.log(error);
  }

  handlesuccess(data: any) {
    if (data.success) {
      this.toastr.success(data.message);
    } else {
      this.toastr.error(data.message);
      this.apiError = data.message;
    }
  }

  parseAndAdd(balance: string, escrow: string): number {
    const parsedBalance = parseFloat(balance) || 0;
    const parsedEscrow = parseFloat(escrow) || 0;
    return parsedBalance + parsedEscrow;
  }

  assetdetails(data: any) {
    this.walletService
      .assetdetails(data, localStorage.getItem('accLabel'))
      .subscribe(
        (data) => {
          this.activeAddress = true;
          this.activeGenAdd = false;
          this.depo2 = false;
          this.detailsData = data;
          console.log(data);
          this.filteredCoinsdep = this.detailsData.network;
        },
        (error) => this.handleError(error)
      );
  }

  addBalance(data: any) {
    this.walletService.addBalance(data).subscribe(
      (data) => {
        console.log('balance added');
      },
      (error) => this.handleError(error)
    );
  }

  updateIndex(index: number) {
    this.k = index;
    this.assetData = this.detailsData.network[index];
  }

  checkaddress(address: string) {
    if (address !== null && address !== undefined) {
      console.log('Depo2 activated');
      this.activeGenAdd = false;
      this.depo2 = true;
    } else {
      console.log('ActiveGenAdd activated');
      this.activeGenAdd = true;
      this.depo2 = false;
    }
  }

  Sendotp() {
    this.walletService.SendOtp().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => this.handleError(error)
    );
  }

  selectNetwork(network: string) {
    if (network != '') {
      // if (this.userRole == 'basic' && network == 'ETH') {
      //   this.activeAddress = false;
      // } else {
      //   this.activeAddress = true;
      // }
      this.withdrawForm.get('network')?.setValue(network);
    }
  }

  setTransfer(data: any) {
    this.transCoin = data;
  }

  focusAmount() {
    document.getElementsByName('amountOne')[0].focus();
  }

  updateCoinOptions(selectedValue: string) {
    const chain = this.metaForm.chainID;
    if (selectedValue !== 'USDTMS' && selectedValue !== 'USDCMS') {
      if (chain != '') {
        this.metaBalance(selectedValue, chain);
      } else {
        this.metamaskBalance = null;
      }
    }

    if (selectedValue === 'USDT') {
      this.metaForm.selectedCoinTwo = 'USDTMS';
    } else if (selectedValue === 'USDC') {
      this.metaForm.selectedCoinTwo = 'USDCMS';
    } else if (selectedValue === 'USDCMS') {
      this.metaForm.selectedCoinOne = 'USDC';
    } else if (selectedValue === 'USDTMS') {
      this.metaForm.selectedCoinOne = 'USDT';
    }
  }

  async changeNetwork(chainid: string) {
    try {
      if (typeof window.ethereum === 'undefined') {
        this.toastr.error('MetaMask is not installed.');
        return;
      }

      if (!window.ethereum.isMetaMask) {
        this.toastr.error('Please use MetaMask browser extension.');
        return;
      }
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainid }],
      });

      this.metaBalance(this.metaForm.selectedCoinOne, chainid);
    } catch (error) {
      const errorCode = (error as { code: number }).code;
      if (errorCode === 4001) {
        this.metaForm.chainID = this.chainList[0].code;
        console.log('Transaction rejected by the user.');
      } else {
        console.error('thisERROR:', error);
      }
    }
  }

  async metaBalance(Coin: string, ChainID: string) {
    try {
      if (
        typeof window.ethereum !== 'undefined' &&
        window.ethereum.isMetaMask
      ) {
        this.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await this.web3.eth.getAccounts();
        const address = accounts[0];
        let Contract;
        if (address != null && address != undefined) {
          if (Coin == 'USDT' && ChainID == '0x1') {
            Contract = new this.web3.eth.Contract(USDT_ABI, USDT_ADD_ETH);
          } else if (Coin == 'USDT' && ChainID == '0x38') {
            Contract = new this.web3.eth.Contract(USDT_ABI, USDT_ADD_BNB);
          } else if (Coin == 'USDC' && ChainID == '0x1') {
            Contract = new this.web3.eth.Contract(USDT_ABI, USDC_ADD_ETH);
          } else if (Coin == 'USDC' && ChainID == '0x38') {
            Contract = new this.web3.eth.Contract(USDT_ABI, USDC_ADD_BNB);
          }
          const balanceBigInt = await Contract.methods
            .balanceOf(address)
            .call();
          const balance = balanceBigInt.toString();
          console.log('bal', balance);
          this.metamaskBalance = balance;
        } else {
          console.error('MetaMask address not available.');
          this.metamaskBalance = 0;
        }
      }
    } catch (error) {
      console.error('Error fetching MetaMask balance:', error);
    }
  }

  async metaMFormSubmit(Coin: string) {
    console.log('metaFm', this.metaForm);
    try {
      if (
        typeof window.ethereum !== 'undefined' &&
        window.ethereum.isMetaMask
      ) {
        this.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await this.web3.eth.getAccounts();
        const fromAddress = accounts[0];
        console.log('fromaddress', fromAddress);
        let Contract;
        //USDT and USDC address are same from bybit end;
        const recieverAdd = USDC_CLIENT_ADD;

        this.amountToSend = parseFloat(this.metaForm.amount);
        const ChainID = this.metaForm.chainID;

        if (this.amountToSend > 0) {
          if (Coin == 'USDT' && ChainID == '0x1') {
            Contract = new this.web3.eth.Contract(USDT_ABI, USDT_ADD_ETH);
            const recieverAdd = USDC_CLIENT_ADD;
          } else if (Coin == 'USDT' && ChainID == '0x38') {
            Contract = new this.web3.eth.Contract(USDT_ABI, USDT_ADD_BNB);
          } else if (Coin == 'USDC' && ChainID == '0x1') {
            Contract = new this.web3.eth.Contract(USDT_ABI, USDC_ADD_ETH);
          } else if (Coin == 'USDC' && ChainID == '0x38') {
            Contract = new this.web3.eth.Contract(USDT_ABI, USDC_ADD_BNB);
          }

          const tokenDecimal = await Contract.methods.decimals().call();
          const amount =
            BigInt(this.amountToSend) * BigInt(10 ** Number(tokenDecimal));
          const res = await Contract.methods
            .transfer(recieverAdd, amount.toString())
            .send({ from: fromAddress });

          if (res.transactionHash && res.transactionReceipt) {
            const data = {
              coin: Coin,
              chain: ChainID,
              account_type: localStorage.getItem('accLabel'),
              amount: this.metaForm.amount,
              trans: res.transactionHash,
            };
            this.addBalance(data);
            console.log('Transaction hash:', res.transactionHash);
          }
        }
      } else {
        this.toastr.error('MetaMask is not installed');
      }
    } catch (error) {
      console.error('Error transferring USDT:', error);
    }
  }

  filterCoins() {}
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

  selectAccount(data: any, type: any) {
    if (type === 'From') {
      this.concvertList.filter((item: { code: any }) => item.code !== data);
    } else if (type === 'To') {
      this.concvertList.filter((item: { code: any }) => item.code !== data);
    }
  }
}
