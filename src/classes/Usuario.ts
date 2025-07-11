export class Usuario {
  id: number;
  nombre: string;
  mail: string;
  password: string;
  historial: any[];
  favs: number[];

  constructor(
    id: number,
    nombre: string,
    mail: string,
    password: string,
    historial: any[],
    favs: number[]
  ) {
    this.id = id;
    this.nombre = nombre;
    this.mail = mail;
    this.password = password;
    this.historial = historial;
    this.favs = favs;
  }
}
