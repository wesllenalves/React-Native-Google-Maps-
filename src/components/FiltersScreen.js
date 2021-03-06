import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, Switch, Picker,Platform } from 'react-native';
import {Header, Input, Card, Button, SwitchInput, DatePage, SlideBar, Radius, Rate, Rating,ExpOpts } from './common';
import {Actions} from 'react-native-router-flux';
import * as searchActions from '../actionCreators/searchFilter';
import {search} from '../actionCreators/search';

class FiltersScreen extends Component {
  state = {
    rateClicked: false,
    dateClicked: false,
    expClicked: false
  };

  onCapabilityChange(capability) {
    this.props.capabilityChange(capability);
  }

  onExperienceChange(experience) {
    this.props.experienceChange(experience);
  }

  onRateMinChange(ratemin) {
    this.props.rateMinChange(ratemin);
  }

  onRateMaxChange(ratemax) {
    this.props.rateMaxChange(ratemax);
  }

  onRatingChange(rating) {
    this.props.ratingChange(rating);
  }

  onInsuranceChange(insurance) {
    this.props.insuranceChange(insurance);
  }

  onUnionizedChange(unionized) {
    this.props.unionizedChange(unionized);
  }

  onRadiusChange(radius) {
    this.props.radiusChange(radius);
  }

  onAvailabilityMinChange(availabilityMin) {
    this.props.availabilityMinChange(availabilityMin);
  }

  onAvailabilityMaxChange(availabilityMaxChange) {
    this.props.availabilityMaxChange(availabilityMaxChange);
  }

  onSearchButtonPress() {
    this.props.search({...this.props.filters});
    Actions.results();
  }

  onRateButtonPress() {
    this.setState({rateClicked:!this.state.rateClicked});
    this.onDateCloseButtonPress();
    this.onExpCloseButtonPress();
  }

  onRateCloseButtonPress() {
    this.setState({rateClicked:false});
  }

  onSetRateButtonPress() {
    console.log('rateClicked:', this.state.rateClicked);
    this.setState({rateClicked:false});
    console.log('rateClicked:', this.state.rateClicked);
  }

  showRateOptions(rateMin,rateMax) {
    // return (this.state.rateClicked ? <Rate/> : '' );
    if (this.state.rateClicked) {
      return (
        <Rate
          rateMin={rateMin}
          rateMax={rateMax}
          selectMin={this.onRateMinChange.bind(this)}
          selectMax={this.onRateMaxChange.bind(this)}
          close={this.onSetRateButtonPress.bind(this)}
        />
      );
    }
  }

  onDateButtonPress() {
    this.setState({dateClicked:!this.state.dateClicked});
    this.onRateCloseButtonPress();
    this.onExpCloseButtonPress();
  }

  onDateCloseButtonPress(){
    this.setState({dateClicked:false});
  }

  showDateOptions(availabilityMin,availabilityMax) {
    if (this.state.dateClicked) {
      return (
        <DatePage
          availabilityMin={availabilityMin}
          availabilityMax={availabilityMax}
          selectMin={this.onAvailabilityMinChange.bind(this)}
          selectMax={this.onAvailabilityMaxChange.bind(this)}
          close={this.onDateCloseButtonPress.bind(this)}
        />
      );
    }
  }

  onExperienceButtonPress() {
    this.setState({expClicked:!this.state.expClicked});
    this.onDateCloseButtonPress();
    this.onRateCloseButtonPress();
  }

  showExperienceOptions(expMin) {
    if (this.state.expClicked) {
      return (
        <ExpOpts
          expMin={expMin}
          selectMin={this.onExperienceChange.bind(this)}
          close={this.onExpCloseButtonPress.bind(this)}
        />
      );
    }
  }

  onExpCloseButtonPress() {
    this.setState({expClicked:false});
  }

  render(){

    const { experience,
            rateMin,
            rateMax,
            radius,
            capability,
            insurance,
            unionized,
            rating,
            availabilityMin,
            availabilityMax
            } = this.props.filters;


      const rateAndDateButtonStyle = {
        button: {
          // alignSelf: "center",
          backgroundColor: '#F9BA32',
          borderRadius: 5,
          paddingVertical: 10,
          width: '49%',

          height: 45
        },
        text:{
          fontSize: 20,
          color: 'white',
          alignSelf: 'center'
        }
      };
    const rateAndDateViewStyle = {


      justifyContent: 'space-around',
      flexDirection: 'row',
      marginBottom:15,
      width: '81.5%',
      marginLeft: '9.5%'

    };

    // if(Platform.OS === 'ios'){
    //   rateAndDateViewStyle = {
    //     justifyContent: 'space-around',
    //     flexDirection: 'row',
    //     marginBottom:15,
    //     width: '81.5%',
    //     marginLeft: '9.5%'
    //   };
    // };


    const searchButtonStyle = {
      button: {
        alignSelf: 'center',
        backgroundColor: '#F9BA32',
        borderRadius: 5,
        paddingVertical: 10,
        width: '81%',
        height: 45,
        marginTop: 0,
        marginBottom: 15,
        marginLeft: '1%'
      },
      text:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
      }
    };

    return(
      <Card style={{
        margin:0,
        position: 'absolute',
        top: 0,
        height: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'white'
      }}>

        <Input
          label=""
          changed={this.onCapabilityChange.bind(this)}
          value={capability}
          placeholder="Capability"
          style={{backgroundColor: 'white'}}
          autoFocus={true}
        />

        <View
          style={rateAndDateViewStyle}
        >
            <Button
              style={rateAndDateButtonStyle}
              content="$ Rate"
              pressed={this.onRateButtonPress.bind(this)}

            />


            <Button
              style={rateAndDateButtonStyle}
              content="Date"
              pressed={this.onDateButtonPress.bind(this)}
            />
        </View>

        <Button
          style={searchButtonStyle}
          content="Experience"
          pressed={this.onExperienceButtonPress.bind(this)}
        />


        <Rating
          pressed={this.onRatingChange.bind(this)}
          rating={rating}
        />

        <SwitchInput
          label="Insurance"
          changed={this.onInsuranceChange.bind(this)}
          value={insurance}
        />

        <SwitchInput
          label="Unionized"
          changed={this.onUnionizedChange.bind(this)}
          value={unionized}
        />

        <Radius
          pressed={this.onRadiusChange.bind(this)}
          radius={radius}
        />

        <Button style={searchButtonStyle} content="Search" pressed={this.onSearchButtonPress.bind(this)} />

        {this.showRateOptions(rateMin,rateMax)}
        {this.showDateOptions(availabilityMin,availabilityMax)}
        {this.showExperienceOptions(experience)}
      </Card>
    );
  }
}

const mapStateToProps = ({filters}) => ({filters});

export default connect(mapStateToProps, {...searchActions, search})(FiltersScreen);
