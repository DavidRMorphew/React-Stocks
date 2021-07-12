import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
const url = 'http://localhost:3000/stocks'

class MainContainer extends Component {

  state = {
    stocks: [],
    filterTerm: '',
    Alphabetically: false,
    Price: false,
    ownedStocks: []
  }

  componentDidMount(){
    fetch(url)
    .then(resp => resp.json())
    .then(stocks => this.setState({stocks}, ()=>console.log(this.state)))
  }

  onFilterChange = (e) => {
    const filterTerm = e.target.value
    console.log(filterTerm)
    this.setState({filterTerm})
  }

  onOrderTermChange = (e) => {
    const orderTerm = e.target.value
    console.log(orderTerm)
    this.toggleOnClick(orderTerm)
    
  }

  toggleOnClick = (orderTerm) => {
    this.setState(prevState=> ({[orderTerm]: !prevState[orderTerm]}), ()=> console.log(this.state))
  }

  filterResults = (state) => {
    const filteredTypeResults = state.stocks.filter(stock => stock.type === state.filterTerm)
    const filteredResults = filteredTypeResults.length > 0 ? filteredTypeResults : state.stocks
    let mutateCopy = [...filteredResults]
    
    if (!!state.Alphabetically) {
        mutateCopy.sort((a,b) => {
          if (a.name[0] < b.name[0]) {
            return -1
          } else {
            return 1
          }
        })
    }
    if (!!state.Price) {
        mutateCopy.sort((a, b) =>  a.price - b.price)
    }
    return mutateCopy
  }

  addStockToPortfolio = stockId => {
    console.log(stockId)
    const stockToTrade = this.state.stocks.find(stock => stock.id === stockId)
    console.log(stockToTrade)
    if (!this.state.ownedStocks.includes(stockToTrade)){
      this.setState(prevState => ({ownedStocks: [...prevState.ownedStocks, stockToTrade]}), ()=>console.log(this.state.ownedStocks))
    }
  }

  removeStockFromPortfolio = stockId => {
    const stockToTradeIn = this.state.stocks.find(stock => stock.id === stockId)
    this.setState(prevState => ({ownedStocks: [...prevState.ownedStocks.filter(stock => stock.id !== stockId)]}))
  }

  render() {
    return (
      <div>
        <SearchBar onChange={this.onFilterChange} onOrderTermChange={this.onOrderTermChange} alphabetically={this.state.Alphabetically} price={this.state.Price}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.filterResults(this.state)} handleOnClick={this.addStockToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer ownedStocks={this.state.ownedStocks} handleOnClick={this.removeStockFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
