export class Player {
  private id: string;
  private name!: string;
  private score: number;

  constructor(id: string, name?: string) {
    this.id = id;
    if (name !== undefined) this.name = name;
    this.score = 0;
  }
  setName(name: string) {
    this.name = name;
  }
  getName(id: string) {
    return this.name;
  }
  getId() {
    return this.id;
  }

  

}
