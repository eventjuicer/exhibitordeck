import React from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import {connect} from 'react-redux'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform
} from 'react-native';

import {Image} from 'react-native-elements'

import {
    CompanyNamesSelector
} from '../redux';

class SelectCompany extends React.Component {

  static renderCompany(item) {

    const { id, name, image } = item;

    if(image && image.indexOf("http")>-1){
      return (<Image
        source={{ uri: image }}
        style={{ width: 300, height: 100 }}
        PlaceholderContent={<ActivityIndicator />}
        resizeMode="contain"
      />)
    }

    return null
  }

  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  handleChange(value, id){
    const {onChange} = this.props;

    if(id && id > 0){
      console.log(id);
      onChange(id);
    }

    //find the items...if 1 matches than we fire onChange too!
    const matching = this.findCompany(value);

    if(matching.length === 1){
      onChange( matching[0].id );
    }

    this.setState({ query: value })
  }

  findCompany(query) {
    const {companies} = this.props;
    if (query === '') {
      return [];
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return companies.filter(item => item.name.search(regex) >= 0);
  }

  render() {
    const {placeholder} = this.props;
    const { query } = this.state;
    const films = this.findCompany(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          listContainerStyle={styles.listContainerStyle}
          listStyle={styles.listStyle}
          data={films.length === 1 && comp(query, films[0].name) ? [] : films}
          defaultValue={query}
          onChangeText={ text => this.handleChange(text) }
          placeholder={placeholder}
          keyExtractor={ item => item.id.toString() }
          flatListProps={{ nestedScrollEnabled: true, }}
          renderItem={({index, item}) => {
            
             const {id, name} = item;

             return (
                <TouchableOpacity style={styles.touchableListItem} onPress={() => this.handleChange(name, id) }>
                 <View style={{flex:1}}>
                   <Text style={styles.itemText}>
                    {name}
                  </Text>
                  </View> 
                </TouchableOpacity>
              )
          }}
        />
        <View style={styles.descriptionContainer}>
          {films.length > 0 ? (
            SelectCompany.renderCompany(films[0])
          ) : (
            <Text style={styles.infoText}>
             {placeholder}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

/**ANDROID
 * 
 *  autocompleteContainer: {
  
  }
 */

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginTop: 25,
    display : 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems : 'center',
    width: '100%',
    zIndex: 900
  },
  listStyle : {
    backgroundColor: '#ffffff',
  },
  listContainerStyle : {
    backgroundColor: '#ffffff',
  },
  touchableListItem: {
    backgroundColor: '#ffffff',
  },
  autocompleteContainer: {...{
    width: '90%',
    backgroundColor: '#ffffff',
    margin: 10,
  }, ...(Platform.OS == "android" ? {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1000
  } : {})},
  itemText: {
    backgroundColor: '#ffffff',
    fontSize: 20,
    margin: 5,
    padding: 5
  },
  descriptionContainer: { 
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#ffffff',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    textAlign: 'center'
  },
  // titleText: {
  //   fontSize: 18,
  //   fontWeight: '500',
  //   marginBottom: 10,
  //   marginTop: 10,
  //   textAlign: 'center'
  // },
});

SelectCompany.defaultProps = {
  placeholder : "Enter Company Name"
}

export default connect((state, props) => ({
    companies : CompanyNamesSelector(state, props)
}), {})(SelectCompany);


