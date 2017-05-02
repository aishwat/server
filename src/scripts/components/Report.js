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
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import d3 from 'd3';

import Dispatcher from '../dispatcher/Dispatcher';
import HomeStore from '../stores/HomeStore';
import QuestionsStore from '../stores/QuestionsStore';
import LandingStore from '../stores/LandingStore';
import HomeActions from '../actions/HomeActions';
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
//import Recharts from 'recharts';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis
} from 'recharts';
import Header2 from './Header2';
//import Body from './Body';
import Footer from './Footer';
// const data = [
//     { name: 'Page A', uv: 4000, pv: 2400, amt: 0 },
//     { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
//     { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
//     { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
//     { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
//     { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
// ];
const style = {
    display: 'inline-block'
};

const paperStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: 'auto',
    height: '40px',
    backgroundColor: 'rgb(0, 188, 212)'
};
const divStyle = {
    color: 'white',
    marginTop: '8px',
    marginLeft: '20px'

};

const buttonStyle = {
    marginRight: 20,
    height: 40,
    width: 100,
    // marginLeft: 350,
    // marginRight: 50,
   // marginTop: 50,
    // marginBottom: 50,
    textAlign: 'center',
    display: 'inline-block',
    position: 'absolute',
    right: 20,
    top: 0,
    left: 0,
    zIndex: 3,
    backgroundColor: Colors.red300,
    position: 'fixed'
};
class SimpleBarChart extends React.Component {
    render() {
        return (
            <BarChart data={this.props.data} width={this.props.width} height={this.props.height}
            margin={{top: 20, right: 30, left: 20, bottom: 5}} style={style}>
       <XAxis dataKey="name"/>
       <YAxis domain={[0, 5]}/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="right" fill="#8884d8" />
       <Bar dataKey="wrong" fill="#82ca9d" />
      </BarChart>
        );
    }
};

class SimpleRadarChart extends React.Component {
    render() {
        return (
            <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={this.props.data}>
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
          <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis domain={[0, 5]}/>
        </RadarChart>
        );
    }
}


class Report extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     model: HomeStore.getModel()
        // };

        //this.state = HomeStore.getModel();

    }

    componentWillMount() {
        this.state = {
            model: HomeStore.getModel()
        };

        //  HomeStore.addChangeListener(this._change);
        //        QuestionsStore.addChangeListener(this._change);
    }

    componentWillUnmount() {
        //window.onbeforeunload = function () {return true;}
        // HomeStore.removeChangeListener(this._change);
        // QuestionsStore.removeChangeListener(this._change);
    }

    render() {
        //window.onbeforeunload = function () {return false;}

        var self = this;
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)} style={paperStyle}>
          <div>

         <Header2>
         </Header2>
         <RaisedButton
                  label="Back"
                  labelPosition="after"
                  primary={true}
                  icon={<ArrowBack />}
                  style={buttonStyle}
                  onTouchTap={function(){
                    location.href = '/#/home';
                }}/>
         <p>. </p>
         <p>. </p>

          <div>
          {
            (function(){
          return ( self.state.model.map(function(object, index){
            var data = [];
            
          object.subCategories.map(function(_object, index){
            var obj = {};
          
            obj.name = _object.subCategory;
            obj.right = _object.correctAnswered;
            obj.wrong = (5 - _object.correctAnswered);
            //obj.amt = 0;
            data.push(obj);
            });
          return (
            <div key={index} display={style}>
            <h4>{object.category}</h4>
              <SimpleBarChart data={data} width={900} height={300}/>
            </div>
            )
          }) );
          
        })()
          }
          </div>
            <div>
      { 
        (function(){
          var data = [];
          
            self.state.model.map(function(object){
              var correct = 0;
              var categories = 0;
              object.subCategories.map(function(_object){
                correct += _object.correctAnswered;
                categories++;
              });
              var obj = {
                subject : object.category,
                A : correct,
                B : (5 - correct)
              };
            
              data.push(obj);
              
            })

            return (
              <div>
              <h4>Summary Radar Chart</h4>
              <SimpleRadarChart data={data} />
              </div>
              )
        })()

        
      }
      </div>
      <Footer />
      </div>
      </MuiThemeProvider>
        )
    }
};

module.exports = Report;
