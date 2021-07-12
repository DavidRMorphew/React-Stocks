import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  renderPortfolioStocks = (ownedStocks) => {
    console.log(ownedStocks)
    if (ownedStocks){
      return ownedStocks.map(stock => <Stock key={`portfolio-${stock.id}`} stock={stock} handleOnClick={this.props.handleOnClick}/>)
    }
  }

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.renderPortfolioStocks(this.props.ownedStocks)
          }
      </div>
    );
  }

}

export default PortfolioContainer;
