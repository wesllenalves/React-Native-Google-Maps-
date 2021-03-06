import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {View, FlatList,TextInput, Text, Platform, TouchableOpacity, Image} from 'react-native';
import {Card, CardItem, Button, CallOrMessagePopUp, Navbar} from './common';
import {search} from '../actionCreators/search';
import Map from './Map';
import ListItem from './ListItem';

class SearchResults extends Component {

  state = {
    expanded: false,
    navBarExpanded: false
  };

  toggleModal = () => {
   this.setState({
     navBarExpanded: !this.state.navBarExpanded
   })
 };

  componentWillReceiveProps = (props) => {
    if(props.navBarExpanded){
      this.toggleModal();
    };
  };

  method = (item) => {
    this.props.selectUser(item);
    Actions.LoginForm();
  };

  expandResults = () => {
    return this.setState({expanded: !this.state.expanded});
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render(){

    let top = (Platform.OS === 'android' ? 55 : 64);

    if(this.props.users.length <= 1){
      top = 79;
    }

    let height = (100 - top);

    let blueBar;

    if(this.props.filters.rateMin !== 0 && this.props.filters.rateMax !== 100000000000000 && this.props.filters.availabilityMin !== "" && this.props.filters.availabilityMax !== ""){
      blueBar = <View style={{backgroundColor: '#426E86', position: 'absolute', top: 0, left: 0, zIndex: 100, width: '100%', height: 45}}>
                  {this.props.filters.capability === "" ? null : <Text style={{color: 'white', alignSelf: 'center'}}>{this.capitalize(this.props.filters.capability)}</Text>}
                  <Text style={{color: 'white', alignSelf: 'center'}}>${this.props.filters.rateMin} - ${this.props.filters.rateMax}</Text>
                  <Text style={{color: 'white', alignSelf: 'center'}}>{this.props.filters.availabilityMin} to {this.props.filters.availabilityMax}</Text>
                </View>
                if (Platform.OS === 'android') {

                  if(this.props.users.length <= 1){
                    top = 76;
                  } else  {
                    top = 61
                  }
                }
    }
    else if ((this.props.filters.rateMin === 0 || this.props.filters.rateMax === 100000000000000) && (this.props.filters.availabilityMin !== "" || this.props.filters.availabilityMax !== "")) {
      blueBar = <View style={{backgroundColor: '#426E86', position: 'absolute', top: 0, left: 0, zIndex: 100, width: '100%', height: 45}}>
                  {this.props.filters.capability === "" ? null : <Text style={{color: 'white', alignSelf: 'center'}}>{this.capitalize(this.props.filters.capability)}</Text>}
                  <Text style={{color: 'white', alignSelf: 'center'}}>{this.props.filters.availabilityMin === "" ? 'Any' : this.props.filters.availabilityMin} to {this.props.filters.availabilityMax === "" ? 'Any' : this.props.filters.availabilityMax}</Text>
                </View>
                if (Platform.OS === 'android') {

                  if(this.props.users.length <= 1){
                    top = 79;
                  } else  {
                    top = 61
                  }
                }
    }
    else if ((this.props.filters.rateMin !== 0 || this.props.filters.rateMax !== 100000000000000) && (this.props.filters.availabilityMin === "" || this.props.filters.availabilityMax === "")) {
      blueBar = <View style={{backgroundColor: '#426E86', position: 'absolute', top: 0, left: 0, zIndex: 100, width: '100%', height: 45}}>
                  {this.props.filters.capability === "" ? null : <Text style={{color: 'white', alignSelf: 'center'}}>{this.capitalize(this.props.filters.capability)}</Text>}
                  <Text style={{color: 'white', alignSelf: 'center'}}>${this.props.filters.rateMin === 0 ? 'Any' : this.props.filters.rateMin} - ${this.props.filters.rateMax === 100000000000000 ? "Any" : this.props.filters.rateMax}</Text>
                </View>

                if (Platform.OS === 'android') {

                  if(this.props.users.length <= 1){
                    top = 76;
                  } else  {
                    top = 61
                  }
                }
    }
    else if(this.props.filters.rateMin === 0 && this.props.filters.rateMax === 100000000000000 && this.props.filters.availabilityMin === "" && this.props.filters.availabilityMax === "" && this.props.filters.capability !== ""){
      blueBar = <View style={{backgroundColor: '#426E86', position: 'absolute', top: 0, left: 0, zIndex: 100, width: '100%', height: 45}}>
                  {this.props.filters.capability === "" ? null : <Text style={{color: 'white', alignSelf: 'center'}}>{this.capitalize(this.props.filters.capability)}</Text>}
                </View>
                if (Platform.OS === 'android') {

                  if(this.props.users.length <= 1){
                    top = 76;
                  } else  {
                    top = 61
                  }
                }
    }

    else {
      blueBar = null
      if (Platform.OS === 'android') {

        if(this.props.users.length <= 1){
          top = 76;
        } else  {
          top = 61
        }
      }
    }
    // if(this.props.filters.rateMin === 0 && this.props.filters.rateMax === 100000000000000 && this.props.filters.availabilityMin === "" && this.props.filters.availabilityMax === ""){

    return(
      <Card>
       {this.state.expanded ? null : blueBar}
       <Map height="100%" width="100%"/>
       <View style={
         this.state.expanded ? {position: 'absolute', backgroundColor: 'rgba(255,255,255, 1)', top: 0, left: 0, right: 0, zIndex: 10, height:'100%'} : {position: 'absolute', backgroundColor: 'rgba(255,255,255,0.8)', top:''+top+'%', left: 0, right: 0, zIndex: 10, height: ''+height+'%'}
        }>
         <TouchableOpacity onPress={()=>{this.expandResults()}}>
           {this.state.expanded ? <Image source={{uri: 'https://torinit.com/assets/workorbe/Down-Arrow.png'}} style={{width: 20, height: 20, alignSelf:'center', marginBottom: 10, marginTop: 10}}/> :
                                  <Image source={{uri: 'https://torinit.com/assets/workorbe/Up-Arrow.png'}} style={{width: 20, height: 20, alignSelf:'center', marginBottom: 10, marginTop: 10}}/> }
         </TouchableOpacity>
         {this.state.expanded ? <Text style={{position: 'absolute', top:10, right: 10, fontSize: 16}}> Search Results ({this.props.users.length})</Text> : null}
         <FlatList
           data={this.props.users}
           keyExtractor={(item) => (item.name + item.capability)}
           renderItem={({item}) => {
               return (
                 <ListItem
                   user={item}
                   // clicked={this.method.bind(this,item)}
                   // clicked={()=>{this.props.selectUser(item); Actions.LoginForm();}}
                   clicked = {()=>{this.method(item)}} //all 3 solutions work. For some reason, if you provide item as an argument in the arrow function, it doesnt work.
                 />
               );
             }
           }
         />
       </View>
       {this.props.auth.loggedIn || this.props.auth.signedUp ? <CallOrMessagePopUp name={this.props.selectedUser.name} phoneNumber={this.props.selectedUser.phone}/> : null}
       {this.state.navBarExpanded ? <Navbar navBarExpanded/> : null}
     </Card>
   );

  }
}

const mapStateToProps = state => {
  // const {location, unionized, insurance, endDate, startDate, rating, rateMax, rateMin, capability, radius} = state.filters;
  return ({
    filters:state.filters,
    users:state.search.users,
    auth: state.auth,
    selectedUser: state.search.selectedUser
  });
};

const mapDispatchToProps = (dispatch) => {
  return{
    selectUser: (item)=> {
                            return dispatch({type: 'selectUser', user: item});
                          }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
