import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.page.html',
  styleUrls: ['./bingo.page.scss'],
})
export class BingoPage implements OnInit {

  id: number;
  valor: string;
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
      this.valor = params['valor'];
      this.descricao = params['descricao'];
      this.data = params['data'];
    });
  }

  backMenu(){
    this.router.navigate(['calendario']);
  }
}
