import { Engine } from "./js/engine.js";
import { Control } from "./js/control.js";
import { Socket } from "./js/socket.js";
import { Obj, Sprite, active, passive, solid } from "./js/object.js";

const game = new Engine({ width: 1024, height: 576 });
const controller = new Control();

const socket = new Socket("ws://192.168.0.6:8080");

function createPlatform({ game, pos = { x: 0, y: 0 }, size = { w: 0, h: 0 } }) {
  game.createObj({
    group: "platform",
    pos,
    size,
    collisionType: passive,
    body: solid,
  });
}

createPlatform({ game, pos: { x: 200, y: 500 }, size: { w: 300, h: 20 } });
createPlatform({
  game,
  pos: { x: 50, y: game.canvas.height - 50 },
  size: {
    w: game.canvas.width - 100,
    h: 50,
  },
  collisionType: passive,
  body: solid,
});
const player = new Obj({
  group: "player",
  pos: {
    x: 200,
    y: 100,
  },
  size: {
    w: 24,
    h: 32,
  },
  collisionType: active,
  body: solid,
  color: "blue",
});
const doux = new Sprite({
  src: "./assets/DinoSprites - doux.png",
  size: {
    w: 24,
    h: 24,
  },
  scale: { x: 3, y: 3 },
  nFrame: 4,
  offset: { x: 0, y: 0 },
  dOffset: { x: -22, y: -30 },
  pos: player.pos,
  fps: 8,
});
const mort = new Sprite({
  src: "./assets/DinoSprites - mort.png",
  size: {
    w: 24,
    h: 24,
  },
  scale: { x: 3, y: 3 },
  nFrame: 4,
  offset: { x: 0, y: 0 },
  dOffset: { x: -22, y: -30 },
  pos: player.pos,
  fps: 8,
});
const tard = new Sprite({
  src: "./assets/DinoSprites - tard.png",
  size: {
    w: 24,
    h: 24,
  },
  scale: { x: 3, y: 3 },
  nFrame: 4,
  offset: { x: 0, y: 0 },
  dOffset: { x: -22, y: -30 },
  pos: player.pos,
  fps: 8,
});
const vita = new Sprite({
  src: "./assets/DinoSprites - vita.png",
  size: {
    w: 24,
    h: 24,
  },
  scale: { x: 3, y: 3 },
  nFrame: 4,
  offset: { x: 0, y: 0 },
  dOffset: { x: -22, y: -30 },
  pos: player.pos,
  fps: 8,
});

// const karakter = ["doux", "mort", "tard", "vita"];
// var rKar = 0;

player.addSprite({ name: "doux", spr: doux });
player.addSprite({ name: "mort", spr: mort });
player.addSprite({ name: "tard", spr: tard });
player.addSprite({ name: "vita", spr: vita });
player.switchSprite("doux");

game.addObj(player);

game.useGravity(2);

let ticker = 0;
player.update = () => {
  player.vel.x = 0;

  if (controller.key.d.pressed && !controller.key.a.pressed) {
    player.vel.x = 5;
    player.flipH = false;
    player.cSpr.offset.x = 4 * 24;
  } else if (controller.key.a.pressed && !controller.key.d.pressed) {
    player.vel.x = -5;
    player.flipH = true;
    player.cSpr.offset.x = 4 * 24;
  } else {
    player.cSpr.offset.x = 0;
  }
  if (controller.key.w.pressed && ticker <= 5) {
    player.vel.y = -10;
    ticker++;
  }
  if (!controller.key.w.pressed && player.vel.y != 0) {
    ticker = 10;
  }
  if (player.touch.down) {
    ticker = 0;
  }
};
game.loop = () => {
  game.ctx.fillStyle = "white";
  game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
  player.update();

  if (
    controller.key.a.pressed ||
    controller.key.d.pressed ||
    controller.key.w.pressed
  ) {
    socket.socket.send(JSON.stringify({pos:player.pos}));
  }

  //   if (controller.key.n1.pressed) {
  //     player.switchSprite(karakter[0]);
  //   }
  //   if (controller.key.n2.pressed) {
  //     player.switchSprite(karakter[1]);
  //   }
  //   if (controller.key.n3.pressed) {
  //     player.switchSprite(karakter[2]);
  //   }
  //   if (controller.key.n4.pressed) {
  //     player.switchSprite(karakter[3]);
  //   }
};

socket.onopen = () => {
  console.log("pass");
};
controller.listen();

function run() {
  window.requestAnimationFrame(run);
  game.start();
}

run();

socket.listen();
