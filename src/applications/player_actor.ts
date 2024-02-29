
export class PlayerActorApplication {
  level: number;

  for: number;
  des: number;
  con: number;

  pot: number;
  efe: number;
  abs: number;
  reg: number;
  mov: number;

  vid: {
    current: number,
    max: number,
  };
  ene: {
    current: number,
    max: number,
  }

  updateValues() {
    this.vid.max = 15 + (this.level * 5) + (this.con * 5);
    this.ene.max = this.level + this.efe + 1;
    this.reg = this.level + Math.ceil(this.efe / 2);
    this.mov = Math.max(this.for, this.des);
  }
}
