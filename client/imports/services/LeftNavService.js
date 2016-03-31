class LeftNavService {
  constructor() {
    this.open = new ReactiveVar(false);
  }

  getOpenState() {
    return this.open.get();
  }

  open() {
    this.open.set(true);
  }

  close() {
    this.open.set(false);
  }
}

export default new LeftNavService();