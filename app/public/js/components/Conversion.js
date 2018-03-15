import React from 'react';
import { connect } from 'react-redux';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';
import Input from 'muicss/lib/react/input';
import Form from 'muicss/lib/react/form';
import Button from 'muicss/lib/react/button';
import Panel from 'muicss/lib/react/panel';
import axios from 'axios';
import debounce from 'lodash.debounce';
import FeesTable from './FeesTable';
import * as actions from '../actions/actions';

class Conversion extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleOriginAmountChange = this.handleOriginAmountChange.bind(this);
    this.handleDestAmountChange = this.handleDestAmountChange.bind(this);
    this.handleOriginCurrencyChange = this.handleOriginCurrencyChange.bind(this);
    this.handleDestCurrencyChange = this.handleDestCurrencyChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
  }

  componentDidMount() {
    this.init(1)
  }

  init(profileId) {
    this.props.dispatch(actions.initOrderInfo(profileId));
  }

  handleOriginCurrencyChange(event) {
    const newCurrency = event.target.value;
    this.props.dispatch(actions.changeOriginCurrency(newCurrency));

    const payload = {
      originAmount: this.props.originAmount,
      originCurrency: newCurrency,
      destCurrency: this.props.destinationCurrency,
      calcOriginAmount: false
    }

    this.props.dispatch(actions.fetchConversionRate(payload));

    const feePayload = {
      originAmount: this.props.originAmount,
      originCurrency: newCurrency,
      destCurrency: this.props.destinationCurrency
    }

    this.props.dispatch(actions.fetchFees(feePayload));
  }

  handleDestCurrencyChange(event) {
    const newCurrency = event.target.value;
    this.props.dispatch(actions.changeDestCurrency(newCurrency));

    const payload = {
      originAmount: this.props.originAmount,
      originCurrency: this.props.originCurrency,
      destCurrency: newCurrency,
      calcOriginAmount: false
    }

    this.props.dispatch(actions.fetchConversionRate(payload));

    const feePayload = {
      originAmount: this.props.originAmount,
      originCurrency: this.props.originCurrency,
      destCurrency: newCurrency
    }

    this.props.dispatch(actions.fetchFees(feePayload));
  }

  handleOriginAmountChange(event) {
    let newAmount = event.target.value;
    newAmount = newAmount.replace(',','')
    this.props.dispatch(actions.changeOriginAmount(newAmount));

    const payload = {
      originAmount: newAmount,
      originCurrency: this.props.originCurrency,
      destCurrency: this.props.destinationCurrency,
      calcOriginAmount: false
    }

    this.props.dispatch(actions.fetchConversionRate(payload));

    const feePayload = {
      originAmount: newAmount,
      originCurrency: this.props.originCurrency,
      destCurrency: this.props.destinationCurrency
    }

    this.props.dispatch(actions.fetchFees(feePayload));
  }

  handleDestAmountChange(event) {
    let newAmount = event.target.value;
    newAmount = newAmount.replace(',','')
    this.props.dispatch(actions.changeDestAmount(newAmount));

    const payload = {
      destAmount: newAmount,
      originCurrency: this.props.originCurrency,
      destCurrency: this.props.destinationCurrency,
      calcOriginAmount: true
    }

    this.props.dispatch(actions.fetchConversionRateAndFees(payload));
  }

  handleUsernameChange(event) {
    const username = event.target.value;

    const usernamePayload = {
      username: username
    }

    this.props.dispatch(actions.usernameChange(usernamePayload));
  }

  handleOrderSubmit(event) {
    // To Do: Build out SPA functionality, don't refresh page, but clean it up
    event.preventDefault();

    const today =`${new Date().getMonth() + 1}${new Date().getDate()}${new Date().getYear()}`
    const orderSubmitPayload = {
      username: this.props.username,
      originCurrency: this.props.originCurrency,
      destinationCurrency: this.props.destinationCurrency,
      originAmount: parseInt(this.props.originAmount),
      destinationAmount: parseInt(this.props.destinationAmount),
      date: parseInt(today)
    }

    this.props.dispatch(actions.orderSubmit(orderSubmitPayload));
    alert(`Your order has been submitted and is saved in the postgres database. 
      To Do: Render Flash Message on Page and clean up left over state from transaction. 
      Also, your ${this.props.destinationAmount} ${this.props.destinationCurrency} will be ready tomorrow at 12pm.)`)
  }

  render() {
    const currencyCodes = ['AUD','BGN','BRL','CAD','DKK','EUR','GBP','HKD','IDR','JPY','MXN','SEK','SGD','THB','USD'];
    let errorMsg;
    if (this.props.errorMsg) {
      errorMsg = <div className="errorMsg">{this.props.errorMsg}</div>
    }

    return (
      <div>
        <span className="titlePT1">Bank of Harlow</span>
        <div className="br1"></div>
        <span className="titlePT2"> Currency</span>
        <div className="br2"></div>
        <span className="titlePT3"> Exchange</span>
        <br /><br />
        <img className="currencyImg" src="../../images/currencies.png"></img>
        <br />
        {errorMsg}
        <Input label="Convert" className="amount-field" onChange={this.handleOriginAmountChange} value={this.props.originAmount} />
        <Select name="input" label="Select Currency" value={this.props.originCurrency} onChange={this.handleOriginCurrencyChange}>      
          {currencyCodes.map((currency, i) => <Option key={i} value={currency} label={currency} />)}
        </Select>
        <Input label="To" className="amount-field" onChange={this.handleDestAmountChange} value={this.props.destinationAmount} placeholder="Input 2" />
        <Select name="input" label="Select Currency" value={this.props.destinationCurrency} onChange={this.handleDestCurrencyChange}>
          {currencyCodes.map((currency, i) => <Option key={i} value={currency} label={currency} />)}
        </Select>
        <Form onSubmit={this.handleOrderSubmit}>
          <Input label="Username" placeholder="Edsger Wybe Dijkstra" onChange={this.handleUsernameChange} value={this.props.username}/>
          <Button variant="raised">Submit Currency Order</Button>
        </Form>
        <br/>
        <FeesTable
          originCurrency={this.props.originCurrency}
          destinationCurrency={this.props.destinationCurrency}
          conversionRate={this.props.conversionRate}
          fee={this.props.feeAmount}
          total={this.props.totalCost}
        />
        <Panel>
          {`${this.props.username || 'Loyal customer'}, your most recent order is for ${this.props.mostRecentOriginAmount}: ${this.props.mostRecentOriginCurrency} converted to ${this.props.mostRecentDestinationAmount}: ${this.props.mostRecentDestinationCurrency}, created ${this.props.date || 'in the near future!'}`}
        </Panel>
      </div>
    )
  }
}

export default connect((state, props) => {
  return {
    originAmount: state.amount.originAmount,
    destinationAmount: state.amount.destinationAmount,
    originCurrency: state.amount.originCurrency,
    destinationCurrency: state.amount.destinationCurrency,
    conversionRate: state.amount.conversionRate,
    feeAmount: state.amount.feeAmount,
    totalCost: state.amount.totalCost,
    username: state.order.username,
    date: state.order.date,
    mostRecentOriginAmount: state.order.mostRecentOriginAmount,
    mostRecentOriginCurrency: state.order.mostRecentOriginCurrency,
    mostRecentDestinationAmount: state.order.mostRecentDestinationAmount,
    mostRecentDestinationCurrency: state.order.mostRecentDestinationCurrency,
    errorMsg: state.error.errorMsg,
  }

})(Conversion);