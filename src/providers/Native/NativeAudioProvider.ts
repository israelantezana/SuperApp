import { NativeAudio } from '@ionic-native/native-audio';
import { AudioProvider } from '../../shared/providers/AudioProvider';
import { Platform } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { WordPage } from '../../pages/word/word';

export class NativeAudioProvider implements AudioProvider {
    
    private correctLetterSound : HTMLAudioElement;
    private levelComplete      : HTMLAudioElement;
    public static isMuted      : boolean = false;
    public constructor(private nativeAudio: NativeAudio, private platform: Platform, private tts: TextToSpeech) {
        if(this.isRealDevice()) {
            nativeAudio.preloadSimple('correctLetterSound', 'assets/sounds/correctLetterSound.mp3');
            nativeAudio.preloadSimple('levelComplete', 'assets/sounds/levelComplete.mp3');
        }
        else {
            this.correctLetterSound = new Audio('assets/sounds/correctLetterSound.mp3');
            this.levelComplete = new Audio('assets/sounds/levelComplete.mp3');
        }
    }

    public playCorrectLetterSound(): void {
        if(NativeAudioProvider.isMuted == false)
        {
            if(this.isRealDevice()) {
                this.nativeAudio.play('correctLetterSound');
            }
            else {
                (<HTMLAudioElement>this.correctLetterSound.cloneNode(true)).play();
            }   
        } 
    }
   
    public isMuted(){
        return NativeAudioProvider.isMuted;
    }

    changeState():void{
        if (NativeAudioProvider.isMuted==true) {
            NativeAudioProvider.isMuted=false
        }    
        else {   
            NativeAudioProvider.isMuted=true;
        }
    }

    public stopSound() {
        /*this.tts.stop()
            .then(() => console.log('Success'))
            .catch((reason: any) => console.log(reason));*/
        this.tts.speak({
            text: '',
            locale: 'es-MX',
            rate: 0.80
        }).then(() => console.log('Success'))
            .catch((reason: any) => console.log(reason));
    }

    public playLevelCompleteSound(): void {
        if(NativeAudioProvider.isMuted == false)
        {
            if(this.isRealDevice()) {
                //this.nativeAudio.play('levelComplete');
                this.nativeAudio.setVolumeForComplexAsset('levelComplete',0.5);
                const audio = new Audio('assets/sounds/levelComplete.mp3');
                audio.play();
            
            }
            else {
                (<HTMLAudioElement>this.levelComplete.cloneNode(true)).play();
            }
        }
    }

    public playPronunciationOfTheProductName(productName: string): void {
        if (NativeAudioProvider.isMuted == false) {
            productName=this.fixAudioOfProduct(productName);
            this.tts.speak({
                text: productName,
                locale: 'es-MX',
                rate: 0.80
            }).then(() => console.log('Success'))
              .catch((reason: any) => console.log(reason));
        }
    }

    public playLevelCompleteSoundsAndShowModal(productName: string, wordPage: WordPage): void {
        if (this.isRealDevice()) {
            if (NativeAudioProvider.isMuted == false) {
                productName=this.fixAudioOfProduct(productName);
                this.tts.speak({
                    text: productName,
                    locale: 'es-MX',
                    rate: 0.80
                }).then(() => {
                    wordPage.showModalWin();
                    this.playLevelCompleteSound();
                }).catch((reason: any) => console.log(reason));
            } else {
                wordPage.showModalWin();
            }
        } else {
            wordPage.showModalWin();
        }
    }

    public playPronunciationOfWord(word: string, page: any, index: number) {
        if (NativeAudioProvider.isMuted == false) {
            word = this.fixAudioOfProduct(word);
            this.tts.speak({
                text: word,
                locale: 'es-MX',
                rate: 0.80
            }).then(() => {
                page.offSound(index);
            }).catch((reason: any) => {
                console.log(reason);
                page.offSound(index);
            });
        }
        else {
            page.offSound(index);
        }
    }

    private fixAudioOfProduct(productName:string): any {
        if (productName=="CAFE")
        {
            return "CAFÉ";
        }
        return productName;
    }

    private isRealDevice(): boolean {
        return this.platform.is('cordova');
    }
    private soundIsNotMuted(): boolean{
        if (NativeAudioProvider.isMuted==false)
        return false;
        else
        return true;
    }
}
