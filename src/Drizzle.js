class Drizzle {
  constructor(options, store) {
    // Variables
    this.contracts = {}
    this.options = options
    this.store = store
    this.web3 = {}
  }
  init() {
    // Begin Drizzle initialization.
    this.store.dispatch({
      type: 'DRIZZLE_INITIALIZING',
      drizzle: this,
      options: this.options,
    });
  }
}

export default Drizzle
