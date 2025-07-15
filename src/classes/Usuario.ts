export class Usuario {
  private id: any;
  nombre: string;
  apellido: string;
  mail: string;
  historial: any[];
  favs: number[];

  constructor(
    nombre: string,
    apellido: string,
    mail: string,
    historial: any[],
    favs: number[]
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.mail = mail;
    this.historial = historial;
    this.favs = favs;
  }

  public get Id(): number {
    return this.id;
  }

  public set Id(v: number) {
    this.id = v;
  }

  toJson() {
    return {
      nombre: this.nombre,
      apellido: this.apellido,
      mail: this.mail,
      historial: this.historial,
      favs: this.favs,
    };
  }
}
