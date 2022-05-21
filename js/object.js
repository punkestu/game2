const none = Symbol(0);
const active = Symbol(1);
const passive = Symbol(2);

const solid = Symbol(1);
const fluid = Symbol(2);

class Obj {
  constructor({
    group = "none",
    pos = { x: 0, y: 0 },
    size = { w: 1, h: 1 },
    vel = { x: 0, y: 0 },
    collisionType = none,
    body = none,
    color = "red",
  }) {
    this.group = group;
    this.pos = pos;
    this.size = size;
    this.vel = vel;
    this.collisionType = collisionType;
    this.body = body;
    this.touch = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.color = color;
    this.sprList = [];
    this.cSpr = null;
    this.flipH = false;
    this.flipV = false;
  }
  addSprite({ name = "", spr = Sprite }) {
    this.sprList.push({ name, spr });
  }
  removeSprite(name = "") {
    this.sprList = this.sprList.filter((s) => {
      return s.name !== name;
    });
  }
  switchSprite(name = "") {
    this.cSpr = this.sprList.filter((s) => {
      return s.name === name;
    })[0].spr;
  }
  collide(other) {
    return this.inX(other) && this.inY(other);
  }
  inX(other) {
    return (
      this.pos.x <= other.pos.x + other.size.w &&
      other.pos.x <= this.pos.x + this.size.w
    );
  }
  inY(other) {
    return (
      this.pos.y <= other.pos.y + other.size.h &&
      other.pos.y <= this.pos.y + this.size.h
    );
  }
  render(ctx) {
    if (this.cSpr != null) {
      this.cSpr.flipH = this.flipH;
      this.cSpr.flipV = this.flipV;
      this.cSpr.render(ctx);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
    }
  }
  loop() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  update() {}
}

class Sprite {
  constructor({
    src = "/",
    offset = { x: 0, y: 0 },
    dOffset = { x: 0, y: 0 },
    size = { w: 0, h: 0 },
    nFrame = 0,
    pos = { x: 0, y: 0 },
    scale = { x: 1, y: 1 },
    fps = 10,
  }) {
    this.dOffset = dOffset;
    this.img = new Image();
    this.img.src = src;
    this.offset = offset;
    this.size = size;
    this.nFrame = nFrame;
    this.cFrame = 0;
    this.pos = pos;
    this.scale = scale;
    setInterval(() => {
      this.cFrame++;
      if (this.cFrame >= this.nFrame) {
        this.cFrame = 0;
      }
    }, 1000 / fps);
    this.flipH = false;
    this.flipV = false;
  }
  render(ctx) {
    ctx.save();
    ctx.scale(this.flipH ? -1 : 1, this.flipV ? -1 : 1);
    ctx.drawImage(
      this.img,
      this.cFrame * this.size.w + this.offset.x,
      this.offset.y,
      this.size.w,
      this.size.h,
      (this.pos.x + this.dOffset.x) * (this.flipH ? -1 : 1) -
        (this.flipH ? this.size.w * this.scale.x : 0),
      (this.pos.y + this.dOffset.y) * (this.flipV ? -1 : 1) -
        (this.flipV ? this.size.h * this.scale.y : 0),
      this.size.w * this.scale.x,
      this.size.h * this.scale.y
    );
    ctx.restore();
  }
}

// export default Obj;
export { Obj, Sprite, none, active, passive, solid, fluid };
