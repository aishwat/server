import React from 'react'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton';

import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardHeader} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';

const style = {
  marginTop: 12,
};
const cardStyle = {
  marginRight:70,
  marginLeft:'auto',
  marginTop: 70,
  padding:40,
  width: '350px'
};

class SignupForm extends React.Component {

  constructor(props) {
        super(props);
        
        //this._change = this._change.bind(this);
        this.formValue = {
          firstName : '',
          lastName : '',
          email : '',
          password: ''
        };
        this._textFieldChange = this._textFieldChange.bind(this);
        this._submitForm = this._submitForm.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this.state = {
          showDialog: false,
          registrationStatus : ''
        };
        // this._subcategoryClicked = this._subcategoryClicked.bind(this);
        // this._answerClicked = this._answerClicked.bind(this);
    }

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onTouchTap={this._handleClose}
      />];
  return (
    <Card style={cardStyle} >
    {<CardTitle title="Signup" /> }
    <form onSubmit={this._submitForm}>
      <div>
        <TextField name="firstName"  onChange={this._textFieldChange} floatingLabelText="First Name" label="First Name" fullWidth={true} />
      </div>
      <div>
        <TextField name="lastName"  onChange={this._textFieldChange} floatingLabelText="Last Name" label="Last Name" fullWidth={true} />
      </div>
      <div>
        <TextField name="email"  onChange={this._textFieldChange} floatingLabelText="Email" label="Email" fullWidth={true} />
      </div>
      <div>
        <TextField name="password"  onChange={this._textFieldChange} floatingLabelText="Password" label="Password" type='password' fullWidth={true} />
      </div>
      
       <div>
        <RaisedButton type="submit" primary={true} label="Signup" fullWidth={true} style={style}   />
        {/*<button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values 
        </button> */}
        </div>
        <Dialog
          title={this.state.registrationStatus}
          actions={actions}
          modal={false}
          open={this.state.showDialog}
          onRequestClose={this._handleClose}
        />
    </form>
    </Card>
  )
  }

  _handleClose(){
    this.setState({
      showDialog: false
    });
  }

  _textFieldChange(e, newVal){
    this.formValue[e.target.name] = newVal;
  }

  _validateForm(object){
    for(var key in object){
      if(!object[key]){
        return false;
      }
    }
    if(!this._validateEmail(object.email)){
      return false;
    }
    return true;
  }

  _validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
  }

  _submitForm(e){
    e.preventDefault();
    if(this._validateForm(this.formValue)){
      this.setState({
        showDialog: true,
        registrationStatus: 'Success! Check email for confirmation'
      });
      
      this.props.register(this.formValue);
    } else {
      this.setState({
        showDialog: true,
        registrationStatus: 'Failure, all fields must be valid.'
      });
    }
  }
};

module.exports = SignupForm;