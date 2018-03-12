import React from 'react';
import { connect } from 'react-redux';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';
import Input from 'muicss/lib/react/input';
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
  }

  componentDidMount() {
    // this.originAmountInput.focus();
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

    // remove unallowed chars
    newAmount = newAmount.replace(',','')

    // optimistic field updates
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

    // remove unallowed chars
    newAmount = newAmount.replace(',','')

    // optimistic field updates
    this.props.dispatch(actions.changeDestAmount(newAmount));

    const payload = {
      destAmount: newAmount,
      originCurrency: this.props.originCurrency,
      destCurrency: this.props.destinationCurrency,
      calcOriginAmount: true
    }

    this.props.dispatch(actions.fetchConversionRateAndFees(payload));
  }

  render() {
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
          <Option value="USD" label="USD" />
          <Option value="EUR" label="EUR" />
          <Option value="JPY" label="JPY" />
        </Select>
        <Input label="To" className="amount-field" onChange={this.handleDestAmountChange} value={this.props.destinationAmount} placeholder="Input 2" />
        <Select name="input" label="Select Currency" value={this.props.destinationCurrency} onChange={this.handleDestCurrencyChange}>
          <Option value="USD" label="USD" />
          <Option value="EUR" label="EUR" />
          <Option value="JPY" label="JPY" />
        </Select>
        <br/>
        <FeesTable
          originCurrency={this.props.originCurrency}
          destinationCurrency={this.props.destinationCurrency}
          conversionRate={this.props.conversionRate}
          fee={this.props.feeAmount}
          total={this.props.totalCost}
        />
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
    errorMsg: state.error.errorMsg
  }

})(Conversion);