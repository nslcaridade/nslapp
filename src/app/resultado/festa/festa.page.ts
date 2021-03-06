import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-festa',
  templateUrl: './festa.page.html',
  styleUrls: ['./festa.page.scss'],
})
export class FestaPage implements OnInit {

  id: number;
  descricao: string;
  data: string;

  private sub: any;

  constructor(
    public router: Router,
    public route: ActivatedRoute) { 

    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.descricao = params['descricao'];
      this.data = params['data'];
    });
  }

  backMenu(){
    this.router.navigate(['calendario']);
  }

}
