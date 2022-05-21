import { Obj, none, active, solid } from "./object.js";

class Engine {
  constructor({ width = 640, height = 480, antialiasing = false }) {
    this.canvas = document.querySelector("canvas");
    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = antialiasing;

    this.prop = {
      objs: [],
    };
    this.gravity = () => {};
  }
  createObj({
    group = "none",
    pos = { x: 0, y: 0 },
    size = { w: 1, h: 1 },
    vel = { x: 0, y: 0 },
    collisionType = none,
    body = none,
    color = "red",
  }) {
    this.prop.objs.push(
      new Obj({ group, pos, size, vel, collisionType, body, color })
    );
  }
  addObj(obj = Obj) {
    this.prop.objs.push(obj);
  }
  useGravity(gForce) {
    this.gForce = gForce;
    this.gravity = () => {
      for (let i = 0; i < this.prop.objs.length; i++) {
        this.prop.objs[i].touch = {
          up: false,
          down: false,
          left: false,
          right: false,
        };
        if (this.prop.objs[i].collisionType == active) {
          this.prop.objs[i].vel.y += this.gForce;
        }
        if (
          this.prop.objs[i].collisionType == active &&
          this.prop.objs[i].body == solid
        ) {
          for (let j = 0; j < this.prop.objs.length; j++) {
            if (i == j) {
              break;
            }
            if (
              this.prop.objs[i].inX(this.prop.objs[j]) &&
              this.prop.objs[i].pos.y + this.prop.objs[i].size.h <=
                this.prop.objs[j].pos.y &&
              this.prop.objs[j].body == solid
            ) {
              if (
                this.prop.objs[i].pos.y + this.prop.objs[i].size.h ==
                this.prop.objs[j].pos.y
              ) {
                this.prop.objs[i].touch.down = true;
              }
              if (
                this.prop.objs[i].vel.y >
                this.prop.objs[j].pos.y -
                  (this.prop.objs[i].pos.y + this.prop.objs[i].size.h)
              ) {
                this.prop.objs[i].vel.y =
                  this.prop.objs[j].pos.y -
                  (this.prop.objs[i].pos.y + this.prop.objs[i].size.h);
              }
            }
          }
        }
      }
    };
  }
  loop() {}
  render() {
    // this.prop.objs.sort();
    this.prop.objs.forEach((obj) => {
      obj.render(this.ctx);
      obj.loop();
    });
  }
  start() {
    this.gravity();
    this.loop();
    this.render();
  }
}

export { Engine };
