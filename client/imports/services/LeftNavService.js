class LeftNavService {
  constructor() {
    this.open = new ReactiveVar(false);
  }

  getOpenState() {
    return this.open.get();
  }

  set(value) {
    this.open.set(value);
  }

  openMenu() {
    this.open.set(true);
  }

  closeMenu() {
    this.open.set(false);
  }
}

export default new LeftNavService();