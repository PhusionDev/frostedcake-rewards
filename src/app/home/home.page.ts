import { Component } from '@angular/core';

import { FcData } from './fcdata.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  fcData: FcData = {
    totalSupply: 1000000000000000,
    burnedTokens: 514725329117038,
    circulatingSupply: 1000000000000,
    rewardPercent: 0.08,
    dailyVolume: 1000000,
    fcHeld: 5000000000,
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
    return this.fcData.fcHeld / this.fcData.circulatingSupply;
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

  onChangeEgcHeld(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      this.fcData.fcHeld = parsedValue;
      this.calculateRewards();
    }
  }
}
