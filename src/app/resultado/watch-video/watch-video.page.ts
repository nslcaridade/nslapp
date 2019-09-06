import { NgModule, Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, FormBuilder, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.page.html',
  styleUrls: ['./watch-video.page.scss'],
})
export class WatchVideoPage  implements OnInit{

  url: string;

  private sub: any;
  image: string;
  trustedVideoUrl: any;
  watchVideoForm: FormGroup;

  constructor(public loadingController: LoadingController,
              private dom: DomSanitizer,
              public alertController: AlertController,
              public router: Router,
              public route: ActivatedRoute,
              private formBuilder: FormBuilder ) {

    this.watchVideoForm = this.formBuilder.group({
      opt_watchVideo : ['', Validators.compose([Validators.required]) ]
                });

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.url = params['url']});
      console.log("URL      :"+this.url);
      this.sanitize();
    
  }

  backMenu(){
    this.router.navigate(['videos']);
  }

  sanitize(): void {
    console.log(this.url);
    this.trustedVideoUrl = this.dom.bypassSecurityTrustResourceUrl(this.url);
    //this.trustedVideoUrl = this.dom.bypassSecurityTrustUrl(this.url);
  }

}
