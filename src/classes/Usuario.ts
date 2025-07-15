export class Usuario {
  private id: any;
  nombre: string;
  mail: string;
  historial: any[];
  favs: number[];

  constructor(nombre: string, mail: string, historial: any[], favs: number[]) {
    this.nombre = nombre;
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
      mail: this.mail,
      historial: this.historial,
      favs: this.favs,
    };
  }
}
