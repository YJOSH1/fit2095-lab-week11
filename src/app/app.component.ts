import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

interface auction {
  name: string;      
  isBidActive: boolean;
  auctionDescription: string;
  targetPrice: number;  
}

interface bid {
  name: string;
  value: number;
}

interface bestBid {
  highestVal: number;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fit2095-lab-week11';

  socket:any;

  userName: string = '';
  bidValue: number = 0;

  localAuction: auction = {
    name: '',
    isBidActive: false,
    auctionDescription: '',
    targetPrice: 0
  }

  bids: bid[] = [];

  bestBid: bestBid = {
    highestVal: 0,
    name: 'no one'
  }

  ngOnInit(): void {
    this.socket = io();
    this.listenToEvents();
  };

  listenToEvents() {
    this.socket.on('onBid', (bid: bid) => {
      this.bids.push(bid);
      if (bid.value > this.bestBid.highestVal) {
        this.bestBid.highestVal = bid.value;
        this.bestBid.name = bid.name;
      }
    });

    this.socket.on('onAuction', (auction: auction) => {
      this.localAuction = auction;
      if (!this.localAuction.isBidActive) {
        this.bids = [];
        this.bestBid.highestVal = 0;
        this.bestBid.name = 'no one'
      }
      console.log(this.localAuction);
    });
  }

  sendAuction() {
    this.localAuction.name = this.userName;
    console.log(this.localAuction);
    this.socket.emit('auction', this.localAuction);
  }

  sendBid() {
    let newBid: bid = {
      name: this.userName,
      value: this.bidValue
    }
    this.socket.emit('bid', newBid);
  }

}
