import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import * as Colors from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Done from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import Dispatcher from '../dispatcher/Dispatcher';
import HomeStore from '../stores/HomeStore';
import QuestionsStore from '../stores/QuestionsStore';
import LandingStore from '../stores/LandingStore';
import HomeActions from '../actions/HomeActions';
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            model: [],
            questions: [],
            questionNumber : 0
        };
        this.questionStyle = {
           
        };
        this.currentCategory = {
            category: '',
            subCategoryIndex: 0
        };
        this._change = this._change.bind(this);
        this._toggleCategoryClick = this._toggleCategoryClick.bind(this);
        this._subcategoryClicked = this._subcategoryClicked.bind(this);
        this._answerClicked = this._answerClicked.bind(this);
    }

    componentWillMount() {
        HomeStore.addChangeListener(this._change);
        HomeActions.getQuestionCategories();
        QuestionsStore.addChangeListener(this._change);
       // HomeActions.getQuestions();
    }

    componentWillUnmount() {
        HomeStore.removeChangeListener(this._change);
        QuestionsStore.removeChangeListener(this._change);
    }

    render() {
        var self = this;
        const style = {
            height: 80,
            width: 900,
            // marginLeft: 350,
            // marginRight: 50,
            marginTop: 50,
            // marginBottom: 50,
            textAlign: 'center',
            display: 'inline-block',
            large: {
            width: 120,
            height: 120,
            padding: 30,
          },
          largeIcon: {
            width: 60,
            height: 60,
            zIndex: 10
          }
        };

        const buttonStyle = {
          marginRight: 20,
          height: 40,
            width: 900,
            // marginLeft: 350,
            // marginRight: 50,
            marginTop: 50,
            // marginBottom: 50,
            textAlign: 'center',
            display: 'inline-block',
          position: 'absolute',
          right: 20,
          bottom: 20,
          left: 400
        };
        
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)} style={{backgroundColor:Colors.grey200}}>
                <div>
                    <Toolbar style={{backgroundColor:Colors.cyan300}}/>
                    <Drawer open={this.state.open}>
                      <MenuItem primaryText={LandingStore.getUserData().email} style={{backgroundColor:Colors.cyan300, height:'56px'}}></MenuItem>
                      {
                        this.state.model.map(function(object, index){
                            var icon = object.isClicked ? <ArrowDropUp /> : <ArrowDropDown/>;
                            return (
                                <div key={index}>
                                    <MenuItem
                                        primaryText={object.category}
                                        rightIcon={icon}
                                        onTouchTap={(function(){
                                            return function(){
                                                var _index = index;
                                                self._toggleCategoryClick(_index);
                                            }
                                        })()}
                                        />
                                    <Divider/>
                                    { 
                                        object.isClicked && object.subCategories.map(function(_object, index){
                                                return (
                                                    <div key={index}>
                                                        <MenuItem
                                                            primaryText={_object.subCategory}
                                                            insetChildren={true}
                                                            style={{paddingLeft:'0px'}}
                                                            onTouchTap={(function(){
                                                                 var category = object.category;
                                                                 var _index = index;
                                                                return function(){
                                                                    self._subcategoryClicked(category, _index);
                                                                }
                                                            })()}/>
                                                    </div>
                                                    )
                                            })
                                    }
                                </div>
                                )
                        })
                      }
                    </Drawer>
                    <div className='row'>
                        <div className='col-xs-3'></div>
                        <div className='col-xs-9'>
                            <Paper style={style}>
                                {
                                    (this.state.questions.length > 0) && (function(){
                                        var questionObj = self.state.questions[self.state.questionNumber];
                                        var q = (self.state.questionNumber + 1) + '/' + (self.state.questions.length)  + ')   ' + questionObj.question;
                                        return (
                                            <div style={{paddingLeft: 20, paddingTop: 20, paddingRight: 20}}>   
                                                <p>{q}</p>
                                            </div>
                                        )
                                    })()
                                }
                                {
                                    (this.state.questions.length === 0) && (function(){
                                        return (
                                            <div style={{paddingLeft: 20, paddingTop: 20, paddingRight: 20}}>   
                                                <p><b>Select category to begin</b></p>
                                            </div>
                                            )
                                    })()
                                }
                            </Paper>
                            {
                                (this.state.questions.length > 0) && (function(){
                                        var questionObj = self.state.questions[self.state.questionNumber];
                                        return (
                                            questionObj.options.map(function(object, index){
                                                return (
                                                    <div key={index} style={{paddingLeft: 20, paddingTop: 20, paddingRight: 20, marginBottom: 20, width: 900, height: 48}}>   
                                                        <Paper style={{height: 48}}><MenuItem primaryText={object.answer} style={object.style}
                                                        onTouchTap={(function(){
                                                           
                                                            var _questionIndex = self.state.questionNumber;
                                                            var _answerIndex = index;
                                                            
                                                            return function(){
                                                               
                                                                self._answerClicked(_questionIndex, _answerIndex);
                                                            }
                                                        })()}
                                                        /></Paper>
                                                    </div>
                                                    )
                                        })
                                        )
                                    })()

                            }
                            
                            <BottomNavigation style={{paddingLeft: 20, paddingTop: 20, paddingRight: 20, marginBottom: 20, width: 900, height: 48, marginTop: 50}}>
                              <BottomNavigationItem
                                label=""
                                icon={<ArrowBack/>}
                                onTouchTap={function(){
                                    //this.select(2)
                                var questionNumber = self.state.questionNumber;
                                if(questionNumber > 0){
                                    self.setState({
                                    questionNumber: questionNumber - 1
                                });
                                }
                                
                            }}
                              />
                              <BottomNavigationItem
                                label=""
                                icon={<Done/>}
                                onTouchTap={() => this.select(1)}
                              />
                              <BottomNavigationItem
                                label=""
                                icon={<ArrowForward/>}
                                onTouchTap={function(){
                                    //this.select(2)
                                var questionNumber = self.state.questionNumber;
                                if(questionNumber < self.state.questions.length - 1){
                                    self.setState({
                                    questionNumber: questionNumber + 1
                                });
                                // if(questionNumber === self.state.questions.length - 1){
                                //     location.href = '/#/report';
                                // }
                                }
                                
                            }}
                              />
                            </BottomNavigation>
                        </div>
                        <RaisedButton
                  label="View report"
                  labelPosition="before"
                  primary={true}
                  icon={<ArrowForward />}
                  style={buttonStyle}
                  onTouchTap={function(){
                    HomeActions.viewReport(self.state.model);
                }}
                />
                    </div>  
                           
                </div>

            </MuiThemeProvider>
        );
    }

    _change() {
        
        this.setState({
            model: HomeStore.getModel(),
            questions: QuestionsStore.getQuestions(),
            questionNumber: 0
        });
    }

    _toggleCategoryClick(index) {
        var newModel = this.state.model;
        newModel.map(function(object, _index) {
            if (index !== _index) {
                object.isClicked = false;
            }
        });
        newModel[index].isClicked = !newModel[index].isClicked;
        this.setState({
            model: newModel
        });
    }

    _subcategoryClicked(category, subCategoryIndex) {
        this.currentCategory.category = category;
        this.currentCategory.subCategoryIndex = subCategoryIndex;
        HomeActions.getQuestions();
    }

    _answerClicked(questionIndex, answerIndex){
        var self = this;
        var newQuestions = this.state.questions;
        var newModel = this.state.model;
        if(newQuestions[questionIndex].answer === answerIndex){
            newQuestions.correctAnswered = newQuestions.correctAnswered + 1;
           
            newModel.map(function(obj, index){
                if(obj.category === self.currentCategory.category){
                    obj.subCategories[self.currentCategory.subCategoryIndex].correctAnswered++;
                }
            })
        }
        newQuestions[questionIndex].options[answerIndex].style = {
            backgroundColor: Colors.red600
        };
        newQuestions[questionIndex].options[newQuestions[questionIndex].answer].style = {
            backgroundColor: Colors.green600
        };
        var questionNumber = this.state.questionNumber;
        // if(questionNumber < this.state.questions.length - 1){
        //     setTimeout(function(){
        //         self.setState({
        //             questionNumber: questionNumber + 1
        //         })
        //     }, 5000);
        // }

        this.setState({
            questions: newQuestions
        });
    }
};

module.exports = Home;
