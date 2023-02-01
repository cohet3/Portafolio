import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-serch',
  templateUrl: './serch.component.html',
  styleUrls: ['./serch.component.css']
})
export class SerchComponent implements OnInit {

  constructor( private route: ActivatedRoute,
               public productoService: ProductosService) { }

  ngOnInit() {

    this.route.params
    .subscribe( params => {
      console.log(params['termino']);
      this.productoService.buscarProducto(params['termino']);
    })
  }

}
