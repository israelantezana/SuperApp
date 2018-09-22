import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { CategoryProvider } from '../../providers/category/category';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Product } from '../../entities/product';
import { Category } from '../../entities/category';

@IonicPage()
@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
  providers: [[Camera]]
})
export class CreateProductPage {
  options: any;
  Image: any;
  path: any;
  product = new Product;
  category: Category;
  constructor(public navCtrl: NavController, public navParams: NavParams, public productProvider: ProductProvider, public categoryProvider: CategoryProvider, public camera: Camera) {    
    categoryProvider.getCategoryById(navParams.data.data)
      .then(category => {
        this.category = category;
      }).catch(error => {
        console.log(error);
      })
  }

  async saveProductForm() {
    this.product.image = this.Image;
    this.product.state = true;
    this.product.category = this.category;
    await this.productProvider.saveProduct(this.product);
  }

  ionViewDidLoad() {    
    console.log('ionViewDidLoad CreateProductPage');
  }

  callFunctionCamera(){
    this.takePicture();
  }

  takePicture(){
    this.options = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.VIDEO
    }
    this.camera.getPicture(this.options)
      .then((imageData)=>{
        this.Image = "data:image/jpeg;base64,"+imageData;
      }).then((path) => {
        this.path = path;
      }).catch((error) => {
        console.log(error);
      })
  }
}
