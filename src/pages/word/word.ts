import { UserProvider } from './../../providers/user/user';
import { User } from './../../entities/user';
import { SelectLevelPage } from './../select-level/select-level';
import { LevelCompletePage } from './../level-complete/level-complete';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { SortWordGame } from '../../shared/models/SortWordGame.model';
import { ColorProvider } from '../../shared/providers/ColorProvider';
import { ProductProvider } from '../../shared/providers/ProductProvider';
import { WordDragDropProvider } from '../../shared/providers/WordDragDropProvider';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { Product } from '../../shared/models/Product.model';
import { Login } from '../../providers/login/Login';
@Component({
    selector: 'page-word',
    templateUrl: 'word.html'
})
export class WordPage implements OnInit, AfterViewInit, OnDestroy {

    public game            : SortWordGame;
    public backgroundColor : string;
    public selectorName    : string;
    public imageSound      : string;
    public coins           : number;

    constructor(
        public navController       : NavController,
        private modalController    : ModalController,
        private productsProdiver   : ProductProvider,
        private colorService       : ColorProvider,
        private dragDropProvider   : WordDragDropProvider,
        private audioProvider      : AudioProvider,
        private navParams          : NavParams,
        private login              : Login
        
    ) {
        this.prepareGame();
        this.changeSoundIcon();
      
    }

    ionViewDidEnter() { 
        this.changeSoundIcon(); 
    }
    coinsOfUser()
    {
       this.login.userProvider.getAmountOfCoins().then((value)=>this.coins = value)
    }
    private generateLettersWithColor() {
        let response: any = [];
        for (let letter of this.game.ResponseWord) {
            if (this.game.Level >= 31) {
                response[letter] = '#000000';
            } else {
                response[letter] = this.colorService.getRandomColor();
            }
        }
        return response;
    }

    private prepareGame(): void {
        this.prepareLevel();
        this.coinsOfUser();
        this.selectorName = this.generateSelectorCode();
        this.backgroundColor = this.colorService.getRandomBackgroundColor();
        this.game.buildLetters(this.generateLettersWithColor());
    }
   
    
       
 
    private generateSelectorCode() {
        return 'LETTER-' + Math.random();
    }

    private prepareLevel() {
        let level: number = this.navParams.get('level');
        let product: Product = this.productsProdiver.getProductOfActualLevel(level);
        this.game = new SortWordGame(product, level);
    }

    public async showEndView() {
        this.game.addCount();
        if(this.game.isGameOver()) {
            await this.login.saveProgress(this.game.Level);
            setTimeout(() => {
                this.playLevelCompleteSoundAndPronunciationOfTheProductName();
            }, 250);
            this.showModalWin();
        }
    }

    public showModalWin(): void {
        const levelCompleteModal = this.modalController.create(LevelCompletePage, {level: this.game.Level + 1, lastNav:this.navController});
        levelCompleteModal.present();
    }

    ngOnInit(): void {
        this.dragDropProvider.initialize(this.selectorName);
    }

    ngAfterViewInit(): void {
        this.dragDropProvider.startEvents(this.selectorName, this);
    }

    ngOnDestroy(): void {
        this.dragDropProvider.finalize(this.selectorName);
    }

    public changeLevel(){
        const changeLevel = this.modalController.create(
            SelectLevelPage, 
            {
                level    : this.game.Level, 
                lastNav  : this.navController, 
                maxLevel : this.productsProdiver.getQuantityOfProducts(),
                gamePage : this,
                typeOfGame: "words"                
            }
        );
        changeLevel.onDidDismiss(
            ()=>{
                this.changeSoundIcon();
            }
        );
        changeLevel.present();
    }

    public stopSound(){
        this.audioProvider.changeState();
        this.changeSoundIcon();
    }

    public changeSoundIcon(){
        if(this.audioProvider.isMuted()){
          this.imageSound = 'assets/imgs/soundOffDark.png';
        }
        else{
          this.imageSound = 'assets/imgs/soundOnDark.png';
        }
    }

    public playLevelCompleteSoundAndPronunciationOfTheProductName() {
        setTimeout(() => {
            this.audioProvider.playPronunciationOfTheProductName(this.game.ResponseWord);
        }, 4000);
        this.audioProvider.playLevelCompleteSound();
    }

    public playPronunciationOfTheProductName() {
        this.audioProvider.playPronunciationOfTheProductName(this.game.ResponseWord);
    }
   
    public playPronunciationOfTheLetter(letter: string): void {
        this.audioProvider.playPronunciationOfTheProductName(letter);
    }
    public async downgradeCoins(){
        await this.login.updateCoins();
    }
    public reduceCoins(){
        if(this.coins >= 10)
          this.downgradeCoins();
          this.coins=this.coins-10;
    }
}
