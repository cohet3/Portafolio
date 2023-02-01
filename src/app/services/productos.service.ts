import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

   cargando=true;
   productos: Producto[] = [];
   productosFiltrado: Producto [] = []

  constructor( private http: HttpClient ) {
    this.cargarProductos();
   }

  private cargarProductos() {
     return new Promise<void>( (resolve,reject)=> {
         
      this.http.get('https://angular-portafolio-e155e-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
       .subscribe( (resp: any ) => {
      this.productos = resp;
      this.cargando = false;
      resolve()
      });
  });

  }

  getProducto ( id: string){
    return this.http.get(`https://angular-portafolio-e155e-default-rtdb.europe-west1.firebasedatabase.app/productos/${ id }.json`)
    
  }

  buscarProducto( termino: string ) {
    if( this.productos.length === 0){
//cargar productos
         this.cargarProductos().then( ()=>{
//ejecutar después de tener los productos
//aplicar filtro
         this.filtrarProductos( termino );
         });
    }else {
//aplicar rl filtro
this.filtrarProductos( termino );
    }

  }
private filtrarProductos( termino: string) {
 // console.log(this.productos);
  this.productosFiltrado = [];

  this.productos.forEach( prod => {

   if ( prod.categoria.indexOf( termino ) >= 0  ){
    this.productosFiltrado.push(prod );
  }
  
  });

}

}
