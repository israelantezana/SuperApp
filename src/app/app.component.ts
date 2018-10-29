import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SmartAudio } from '../providers/smart-audio/smart-audio';
import { createConnection } from 'typeorm';

import { HomePage } from '../pages/home/home';

import { Product } from '../entities/product';
import { Category } from '../entities/category';
import { Level } from '../entities/level';
import { ProductLevel } from '../entities/productLevel';
import { User } from '../entities/user';
import { Difficulty } from '../entities/difficulty';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  

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
            Difficulty
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
            Difficulty, 
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
