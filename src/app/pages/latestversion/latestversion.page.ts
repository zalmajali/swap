import { Component, OnInit } from '@angular/core';
import {AlertController,MenuController, Platform, NavController, IonSlides, ModalController, ToastController,IonInput} from '@ionic/angular';
import { Globalization } from '@awesome-cordova-plugins/globalization/ngx';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser,InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import {Storage} from "@ionic/storage";
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import {CategoriesService} from "../../services/categories.service";
@Component({
  selector: 'app-latestversion',
  templateUrl: './latestversion.page.html',
  styleUrls: ['./latestversion.page.scss'],
})
export class LatestversionPage implements OnInit {
  public update:any;
  public checkLanguage: any=0;
  public language: any;
  public image: any;
  public returnVersionData:any;
  public androidVersion:any;
  public iosVersion:any;
  public operationResult:any;
  public numberLogin:any;
  public type:any;
  public active:any;
  public userId:any;
  constructor(private appVersion: AppVersion,private storage: Storage,private alertController:AlertController,private inAppBrowser: InAppBrowser,private globalization: Globalization,private modalController: ModalController, private translate: TranslateService,private toastCtrl: ToastController,private menu:MenuController,private platform: Platform,private navCtrl: NavController,private categoriesService:CategoriesService) {
  this.menu.enable(false)
  }
  initialiseTranslation(){
    this.translate.get('update').subscribe((res: string) => {
      this.update = res;
    });
  }
  async checkLatestVersion() {
    this.categoriesService.getVersion().then(async data=>{
      this.returnVersionData = data;
      this.operationResult = this.returnVersionData.Error.ErrorCode;
      if(this.operationResult==1){
        this.androidVersion = this.returnVersionData.Data.android;
        this.iosVersion = this.returnVersionData.Data.ios;
        this.appVersion.getVersionNumber().then(async dataVer=>{
          if(this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone')){
            if(dataVer === this.iosVersion){
              this.type = await this.storage.get('type');
              this.active = await this.storage.get('active');
              this.numberLogin = await this.storage.get('numberLogin');
              if(this.userId == null || this.numberLogin == null){
                this.navCtrl.navigateRoot('homeout');
              }else
              if(this.active == 1)
                this.navCtrl.navigateRoot('home');
              else
                this.navCtrl.navigateRoot('homeout');
            }
          }else if(this.platform.is('android')){
            if(dataVer === this.androidVersion){
              this.type = await this.storage.get('type');
              this.active = await this.storage.get('active');
              this.numberLogin = await this.storage.get('numberLogin');
              if(this.userId == null || this.numberLogin == null){
                this.navCtrl.navigateRoot('homeout');
              }else
              if(this.active == 1)
                this.navCtrl.navigateRoot('home');
              else
                this.navCtrl.navigateRoot('homeout');
            }
          }
        })
      }
    });
    setTimeout(() => {
      this.checkLatestVersion();
    }, 1000);
  }
  async ngOnInit() {
    await this.checkLatestVersion();
    await this.getDeviceLanguage();
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
      this.language = this.checkLanguage;
      if(this.language == "en")
        this.image = "../../assets/imgs/icons-version-en.png";
      else
        this.image = "../../assets/imgs/icons-version-1.png";
    }else{
      if (window.Intl && typeof window.Intl === 'object') {
        let Val  = navigator.language.split("-");
        if (Val[0])
          this.language = Val[0];
        else
          this.language = 'en';
        if(this.language == "en")
          this.image = "../../assets/imgs/icons-version-en.png";
        else
          this.image = "../../assets/imgs/icons-version-1.png";
      }
      else{
        this.globalization.getPreferredLanguage().then(res => {
          let Val  = res.value.split("-");
          if (Val[0])
            this.language = Val[0];
          else
            this.language = 'en';
          if(this.language == "en")
            this.image = "../../assets/imgs/icons-version-en.png";
          else
            this.image = "../../assets/imgs/icons-version-1.png";
        }).catch(e => {console.log(e);});
      }
    }
  }
  async getDeviceLanguage() {
    await this.storage.get('checkLanguage').then(async checkLanguage=>{
      this.checkLanguage = checkLanguage
    });
    if(this.checkLanguage){
      this.translate.setDefaultLang(this.checkLanguage);
      this.language = this.checkLanguage;
      this.translate.use(this.language);
      this.initialiseTranslation();
    }else{
      if (window.Intl && typeof window.Intl === 'object') {
        let Val  = navigator.language.split("-");
        this.translate.setDefaultLang(Val[0]);
        if (Val[0])
          this.language = Val[0];
        else
          this.language = 'en';
        this.translate.use(this.language);
        this.initialiseTranslation();
      }
      else{
        this.globalization.getPreferredLanguage().then(res => {
          let Val  = res.value.split("-");
          this.translate.setDefaultLang(Val[0]);
          if (Val[0])
            this.language = Val[0];
          else
            this.language = 'en';
          this.translate.use(this.language);
          this.initialiseTranslation();
        }).catch(e => {console.log(e);});
      }
    }
  }
  functionGoStore() {
    let appStoreUrl = '';
    if (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'))
      appStoreUrl = 'itms://itunes.apple.com/app/{YOUR_APP_ID}'; // Replace {YOUR_APP_ID} with your app's ID
    else if (this.platform.is('android'))
      appStoreUrl = 'market://details?id=com.swap.eswapco'; // Replace with your app's package name
    this.inAppBrowser.create(appStoreUrl, '_system');
  }
}
