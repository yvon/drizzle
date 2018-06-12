class Drizzle {
  constructor(options, store) {
    // Variables
    this.contracts = {}
    this.contractList = []
    this.options = options
    this.store = store
    this.web3 = {}

    this.loadingContract = {}
  }

  init() {
    // Begin Drizzle initialization.
    this.store.dispatch({
      type: 'DRIZZLE_INITIALIZING',
      drizzle: this,
      options: this.options,
    })
  }

  addContract (contractConfig, events = []) {
    this.store.dispatch({type: 'ADD_CONTRACT', drizzle: this, contractConfig, events, web3: this.web3})
  }

  _addContract (drizzleContract) {
    if (this.contracts[drizzleContract.contractName]) { throw `Contract already exists: ${drizzleContract.contractName}` }
    this.contracts[drizzleContract.contractName] = drizzleContract
    this.contractList.push(drizzleContract)
  }

  findContractByAddress (address) {
    return this.contractList.find((contract) => {
      return contract.address.toLowerCase() === address.toLowerCase()
    })
  }
}

export default Drizzle
