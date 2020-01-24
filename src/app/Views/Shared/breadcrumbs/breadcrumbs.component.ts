import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../Services/menu.service';
import { Router } from '@angular/router';
import { Menu } from 'src/app/Entities/Menu.model';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  _Title: SafeHtml
  _Link: SafeHtml

  constructor(private _MenuService: MenuService, private _Router: Router, private _Html: DomSanitizer) {
  }

  ngOnInit() {

    try {
      this.PrintBreadCrumbs();
    } catch (error) {
     console.log(error.message); 
    }
  }

  PrintBreadCrumbs() {

    //si el menu guardado en el localstorage es null se hace la peticion al api Sop una sola vez
    if (this._MenuService.GetCurrentMenuArray() == null) {

      this._MenuService.GetMenuArray().subscribe(result => {

        //Carga del Titulo
        this._Title = this._Html.bypassSecurityTrustHtml(this.AddTitle(result.filter(x => x.Url == this._Router.url)[0]));

        //Carga del Link
        //this._Link = this._Html.bypassSecurityTrustHtml(this.PringLink(result));

      });

    } else {
      //Carga del titulo
      this._Title = this._Html.bypassSecurityTrustHtml(this.AddTitle(this._MenuService.GetCurrentMenuArray().filter(x => x.Url == this._Router.url)[0]));

      //Carga del Link
      //this._Link = this._Html.bypassSecurityTrustHtml(this.PringLink(this._MenuService.GetCurrentMenuArray()));
    }

  }


  private AddTitle(menu: Menu): string {
    return '<h1><i class="' + menu.Icon + '"></i>&nbsp;' + menu.MenuName + '</h1>';
  }

  private AddLink(menu: Menu, active: boolean = false): string {
    return (active) ? '<li class="active">' + menu.MenuName + '</li>' : '<li><a href="' + menu.Url + '">&nbsp;' + menu.MenuName + '</a></li>';
  }

  private PringLink(ListMenu: Array<Menu>): string {

    debugger;

    //LinkStringHtml
    var LinkStringHtml = '';

    //Retorna un array 
    var rutaSplit = this._Router.url.split('/');

    if (rutaSplit[1] != 'Home') {

      //Iniciamos agregando el Home
      var Home = ListMenu.filter(x => x.Url == '/Home/Default')[0];

      if (Home != null) {
        LinkStringHtml += this.AddLink(Home);
      }

      //agregamos el menú Hijo
      if (rutaSplit.length > 1) {
        LinkStringHtml += this.AddLink(ListMenu.filter(x => x.MenuName == rutaSplit[1])[0]);
        LinkStringHtml += this.AddLink(ListMenu.filter(x => x.MenuName == rutaSplit[2])[0], true);
      } else {
        LinkStringHtml += this.AddLink(ListMenu.filter(x => x.MenuName == rutaSplit[1])[0], true);
      }

    }

    return LinkStringHtml;

  }

}
