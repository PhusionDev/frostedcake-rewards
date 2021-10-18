import { Component } from '@angular/core';

import { TokenData } from './fcdata.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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
    }
  }

  onChangeDailyVolume(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      this.fcData.dailyVolume = parsedValue;
      this.calculateRewards();
    }
  }

  onChangeTokensHeld(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      this.fcData.tokensHeld = parsedValue;
      this.calculateRewards();
    }
  }

  onChangeCakePrice(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      this.fcData.cakePrice = parsedValue;
      this.calculateRewards();
    }
  }
}
