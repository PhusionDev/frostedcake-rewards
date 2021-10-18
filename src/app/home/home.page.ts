import { Component, OnInit } from '@angular/core';

import { TokenData } from './fcdata.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  fcData: TokenData = {
    totalSupply: 100000000000,
    burnedTokens: 5521472485,
    circulatingSupply: 0,
    rewardPercent: 0.04,
    dailyVolume: 1000000,
    tokensHeld: 25000000,
    cakePrice: 19.756,
  };

  public rewards = 0;

  constructor() {
    this.updateCirculatingSupply();
    this.calculateRewards();
  }

  ngOnInit() {
    this.loadLocalStorage();
  }

  loadLocalStorage() {
    this.loadLocalTokensBurned();
    this.loadLocalDailyVolume();
    this.loadLocalCakePrice();
    this.loadLocalTokensHeld();
  }

  loadLocalTokensBurned() {
    const stringValue = localStorage.getItem('fc_tokensBurned');
    const value = parseFloat(stringValue);

    if (!isNaN(value)) {
      this.fcData.burnedTokens = value;
    }
  }

  loadLocalDailyVolume() {
    const stringValue = localStorage.getItem('fc_dailyVolume');
    const value = parseFloat(stringValue);

    if (!isNaN(value)) {
      this.fcData.dailyVolume = value;
    }
  }

  loadLocalCakePrice() {
    const stringValue = localStorage.getItem('fc_cakePrice');
    const value = parseFloat(stringValue);

    if (!isNaN(value)) {
      this.fcData.cakePrice = value;
    }
  }

  loadLocalTokensHeld() {
    const stringValue = localStorage.getItem('fc_tokensHeld');
    const value = parseFloat(stringValue);

    if (!isNaN(value)) {
      this.fcData.tokensHeld = value;
    }
  }

  updateCirculatingSupply() {
    this.fcData.circulatingSupply =
      this.fcData.totalSupply - this.fcData.burnedTokens;
  }

  calculateRewards() {
    const totalDistribution = this.totalDistribution();
    const effectivePercentage = this.effectivePercentage();
    this.rewards = effectivePercentage * totalDistribution;
  }

  totalDistribution() {
    return this.fcData.dailyVolume * this.fcData.rewardPercent;
  }

  effectivePercentage() {
    return this.fcData.tokensHeld / this.fcData.circulatingSupply;
  }

  // onChange Methods
  onChangeTokensBurned(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      this.fcData.burnedTokens = parsedValue;
      this.updateCirculatingSupply();
      this.calculateRewards();

      // save to local storage
      localStorage.setItem(
        'fc_tokensBurned',
        this.fcData.burnedTokens.toString()
      );
    }
  }

  onChangeDailyVolume(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      this.fcData.dailyVolume = parsedValue;
      this.calculateRewards();

      // save to local storage
      localStorage.setItem(
        'fc_dailyVolume',
        this.fcData.dailyVolume.toString()
      );
    }
  }

  onChangeTokensHeld(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      this.fcData.tokensHeld = parsedValue;
      this.calculateRewards();

      // save to local storage
      localStorage.setItem('fc_tokensHeld', this.fcData.tokensHeld.toString());
    }
  }

  onChangeCakePrice(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      this.fcData.cakePrice = parsedValue;
      this.calculateRewards();

      // save to local storage
      localStorage.setItem('fc_cakePrice', this.fcData.cakePrice.toString());
    }
  }
}
