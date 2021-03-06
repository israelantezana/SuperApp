import { SupermarketDifficulty } from './../entities/supermarketDifficulty';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SmartAudio } from '../providers/smart-audio/smart-audio';
import { createConnection } from 'typeorm';
import { HomePage } from '../pages/home/home';
import { SplashPage } from '../pages/splash/splash';
import { Product } from '../entities/product';
import { Category } from '../entities/category';
import { Level } from '../entities/level';
import { ProductLevel } from '../entities/productLevel';
import { User } from '../entities/user';
import { UserProgress } from '../entities/userProgress';
import { Difficulty } from '../entities/difficulty';
import { List } from '../entities/list';
import { ProductList } from '../entities/productList';
import { Presentation } from '../entities/presentation';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SplashPage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, smartAudio: SmartAudio) {
    platform.ready().then(async () => {
      statusBar.styleDefault();
      statusBar.hide();
      this.hideSplashScreen(splashScreen);
      smartAudio.preload('mainSong', 'assets/audio/music.mp3');

      if (platform.is('cordova')) {
        await createConnection({
          type: 'cordova',
          database: 'test',
          location: 'default',
          //logging: ['error', 'query', 'schema'],
          synchronize: true,
          entities: [
            Category,
            Product,
            Level,
            ProductLevel,
            User,
            UserProgress,
            Difficulty, 
            UserProgress,
            SupermarketDifficulty,
            Difficulty,
            List,
            ProductList,
            Presentation
          ]
        });
      } else {
        await createConnection({
          type: 'sqljs',
          autoSave: true,
          location: 'browser',
          //logging: ['error', 'query', 'schema'],
          synchronize: true,
          dropSchema: true,
          entities: [
            Category,
            Product,
            Level,
            ProductLevel,
            User,
            UserProgress,
            SupermarketDifficulty,
            Difficulty, 
            UserProgress,
            SupermarketDifficulty,
            Difficulty,
            List,
            ProductList,
            Presentation
          ]
        });
      }
    });
  }

  hideSplashScreen(splashScreen) {
    if (splashScreen) {
      setTimeout(() => {
        splashScreen.hide();
      }, 100);
    }
  }
}
