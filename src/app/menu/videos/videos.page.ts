import { NgModule, Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { Util } from '../../commons/util';
import { VideosService } from '../../services/api/videos.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage {
  
  videos_: any;
  trustedVideoUrl: any;

  documentForm: FormGroup;
  public allBanks: any;
  customActionSheetOptions: any;
  customPickerOptions: any;

  docPattern = '([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})';

  videoForm = this.formBuilder.group({
    selecionado: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.pattern(this.docPattern)])]
  });

  constructor(public loadingController: LoadingController,
              public alertController: AlertController,
              public router: Router,
              public route: ActivatedRoute,
              public videoAPI: VideosService,
              private formBuilder: FormBuilder,
              private util: Util ) {
                //this.util.presentLoading();
  }

  ngOnInit() {
    this.videosList();
  }

  videosList(){
    this.videoAPI.getAllVideos()    
    .subscribe( (listvd: any) => {
      
      this.videos_ = JSON.parse(JSON.stringify(listvd.ltVideos));
      console.log(listvd.ltVideos);
      
    }, err => {
      
    });
  }

  showVideo(url_selecionada){
    console.log(url_selecionada);
    this.router.navigate(['watch-video', 
                         {url: url_selecionada}] );

  }
  backMenu(){
    this.router.navigate(['menu']);
  }
}
