import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WordPage } from '../word/word';

@Component({
    selector: 'page-select-difficulty',
    templateUrl: 'select-difficulty.html',
})
export class SelectDifficultyPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {}

    openEasyMode() {
        this.navCtrl.push(WordPage);
    }
    stopSound(){
        this.audioProvider.changeState();
    this.changeSoundIcon();
  }

  changeSoundIcon(){
    if(this.audioProvider.isMuted()){
      this.imageSound="assets/imgs/soundoff.png";
    }
    else{
      this.imageSound="assets/imgs/soundon.png";
    }
  }

  changeState()
  {
    this.smartAudio.changeState();
  }
    openMediumMode() {
        this.navCtrl.push(WordPage, {'level':16});
    }

    openHardMode() {
        this.navCtrl.push(WordPage, {'level':31});
    }

    openExpertMode() {
        this.navCtrl.push(WordPage, {'level':125});
    }
}