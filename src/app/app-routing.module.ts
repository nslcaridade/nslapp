import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'user', loadChildren: './register/user/user.module#UserPageModule' },
  { path: 'start', loadChildren: './register/start/start.module#StartPageModule' },
  { path: 'cadastro', loadChildren: './register/cadastro/cadastro.module#CadastroPageModule' },
  { path: 'cadastro', loadChildren: './doacao/cadastro/cadastro.module#CadastroPageModule' },
  { path: 'menu', loadChildren: './menu/menu/menu.module#MenuPageModule' },
  { path: 'bazar', loadChildren: './menu/bazar/bazar.module#BazarPageModule' },
  { path: 'doacoes', loadChildren: './menu/doacoes/doacoes.module#DoacoesPageModule' },
  { path: 'institution', loadChildren: './menu/institution/institution.module#InstitutionPageModule' },
  { path: 'meus-dados', loadChildren: './menu/meus-dados/meus-dados.module#MeusDadosPageModule' },
  { path: 'relatorio-doacao', loadChildren: './menu/relatorio-doacao/relatorio-doacao.module#RelatorioDoacaoPageModule' },
  { path: 'detalhe-instituicao', loadChildren: './resultado/detalhe-instituicao/detalhe-instituicao.module#DetalheInstituicaoPageModule' },
  { path: 'diretrizes', loadChildren: './resultado/diretrizes/diretrizes.module#DiretrizesPageModule' },
  { path: 'relatorio', loadChildren: './resultado/relatorio/relatorio.module#RelatorioPageModule' },
  { path: 'pin', loadChildren: './commons/pin/pin.module#PinPageModule' },
  { path: 'guia', loadChildren: './tutorial/guia/guia.module#GuiaPageModule' },
  { path: 'tutorial', loadChildren: './tutorial/tutorial/tutorial.module#TutorialPageModule' },
  { path: 'videos', loadChildren: './menu/videos/videos.module#VideosPageModule' },
  { path: 'watch-video', loadChildren: './resultado/watch-video/watch-video.module#WatchVideoPageModule' },
  { path: 'login', loadChildren: './register/login/login.module#LoginPageModule' },
  { path: 'calendario', loadChildren: './menu/calendario/calendario.module#CalendarioPageModule' },
  { path: 'detalhe-bazar', loadChildren: './resultado/detalhe-bazar/detalhe-bazar.module#DetalheBazarPageModule' },
  { path: 'bingo', loadChildren: './resultado/bingo/bingo.module#BingoPageModule' },
  { path: 'passeio', loadChildren: './resultado/passeio/passeio.module#PasseioPageModule' },
  { path: 'festa', loadChildren: './resultado/festa/festa.module#FestaPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
