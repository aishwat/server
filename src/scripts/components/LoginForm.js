import React from 'react'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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

class LoginForm extends React.Component {
  constructor(props) {
        super(props);
        
        //this._change = this._change.bind(this);
        this.formValue = {
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
      {<CardTitle title="Login" /> }
      <form onSubmit={this._submitForm}>
        <div>
          <TextField name="email" label="Email" onChange={this._textFieldChange} floatingLabelText='Email' fullWidth={true} />
        </div>
        <div>
          <TextField name="password" label="Password" onChange={this._textFieldChange} floatingLabelText="Password" type="password" fullWidth={true} />
        </div>
        
         <div>
          <RaisedButton type="submit" primary={true} label="Login" fullWidth={true} style={style}   />
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

  _handleClose(){
    this.setState({
      showDialog: false
    });
  }


  _submitForm(e){
    e.preventDefault();
    if(this._validateForm(this.formValue)){
      // this.setState({
      //   showDialog: true,
      //   registrationStatus: 'Success! Check email for confirmation'
      // });
      
      this.props.login(this.formValue);
    } else {
      this.setState({
        showDialog: true,
        registrationStatus: 'Failure, all fields must be valid.'
      });
    }
  }
};

module.exports = LoginForm;