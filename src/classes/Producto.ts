export class Producto {
  private id: any;
  nombre: string;
  precio: number;
  stock: number;
  descripcion: string;
  especificaciones: any[];
  categoria: string;
  subCategoria: string;
  oferta: number;
  ofertaProgramada: any;
  flagOferta: boolean;
  cantVendidos: number;
  stockLimite: number = 10;
  foto: string;

  constructor(
    nombre: string,
    precio: number,
    stock: number,
    descripcion: string,
    especificaciones: any[],
    categoria: string,
    subCategoria: string,
    oferta: number,
    ofertaProgramada: string[],
    flagOferta: boolean,
    cantVendidos: number,
    foto: string
  ) {
    this.nombre = nombre;
    this.foto = foto;
    this.precio = precio;
    this.stock = stock;
    this.descripcion = descripcion;
    this.especificaciones = especificaciones;
    this.categoria = categoria;
    this.subCategoria = subCategoria;
    this.oferta = oferta;
    this.ofertaProgramada = ofertaProgramada;
    this.flagOferta = flagOferta;
    this.cantVendidos = cantVendidos;

    this.detectarStockBajo();
  }

  public get Id(): number {
    return this.id;
  }

  public set Id(v: number) {
    this.id = v;
  }

  public aumentarVendido() {
    this.cantVendidos++;
  }

  public detectarStockBajo() {
    if (this.stock <= this.stockLimite) {
      return true;
    }
    return false;
  }

  public aplicarOferta(oferta: number) {
    this.oferta = oferta;
  }

  public toJson() {
    return {
      nombre: this.nombre,
      foto: this.foto,
      precio: this.precio,
      stock: this.stock,
      descripcion: this.descripcion,
      especificaciones: this.especificaciones,
      categoria: this.categoria,
      subCategoria: this.subCategoria,
      oferta: this.oferta,
      ofertaProgramada: this.ofertaProgramada,
      flagOferta: this.flagOferta,
      cantVendidos: this.cantVendidos,
    };
  }
}
