class Control {
  constructor() {
    this.key = {
      a: {
        pressed: false,
      },
      d: {
        pressed: false,
      },
      s: {
        pressed: false,
      },
      w: {
        pressed: false,
      },
      n1: {
        pressed: false,
      },
      n2: {
        pressed: false,
      },
      n3: {
        pressed: false,
      },
      n4: {
        pressed: false,
      },
    };
  }
  listen(onKeyDown = () => {}, onKeyUp = () => {}) {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.key.a.pressed = true;
          break;
        case "d":
          this.key.d.pressed = true;
          break;
        case "s":
          this.key.s.pressed = true;
          break;
        case "w":
          this.key.w.pressed = true;
          break;
        case "1":
          this.key.n1.pressed = true;
          break;
        case "2":
          this.key.n2.pressed = true;
          break;
        case "3":
          this.key.n3.pressed = true;
          break;
        case "4":
          this.key.n4.pressed = true;
          break;
      }
      onKeyDown(e.key);
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "a":
          this.key.a.pressed = false;
          break;
        case "d":
          this.key.d.pressed = false;
          break;
        case "s":
          this.key.s.pressed = false;
          break;
        case "w":
          this.key.w.pressed = false;
          break;
        case "1":
          this.key.n1.pressed = false;
          break;
        case "2":
          this.key.n2.pressed = false;
          break;
        case "3":
          this.key.n3.pressed = false;
          break;
        case "4":
          this.key.n4.pressed = false;
          break;
      }
      onKeyUp(e.key);
    });
  }
}

export { Control };
