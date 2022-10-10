import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

interface Auction {
  name: string;      
  isBidActive: boolean;
  auctionDescription: string;
  targetPrice: number;  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fit2095-lab-week11';

  socket:any;

  localAuction: Auction = {
    name: '',
    isBidActive: false,
    auctionDescription: '',
    targetPrice: 0
  }

  ngOnInit(): void {
    this.socket = io();
  };

  listenToEvents() {
    this.socket.on('onAuctionUpdate', (data: Auction) => {

    });
  }

}
