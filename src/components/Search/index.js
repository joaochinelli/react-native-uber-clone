import React, {Component} from 'react';
import { Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Search extends Component {
    render(){
        const { onLocationSelected } = this.props;

        return <GooglePlacesAutocomplete 
            placeholder='Para onde?'
            onPress={onLocationSelected}
            query={{
                key: 'API_KEY',
                language: 'pt-BR'
            }}
            textInputProps={{
                autoCapitalize: "none",
                autoCorrect: false
            }}
            fetchDetails
            enablePoweredByContainer={false}
            styles={{
                container:{
                    position: "absolute",
                    top: Platform.select({
                        ios: 50, android: 20
                    }),
                    width: "100%"
                },
                textInputContainer: {
                    flex: 1,
                    backgroundColor: "transparent",
                    height: 44,
                    marginHorizontal: 20,
                    borderTopWidth: 0,
                    borderBottomWidth: 0
                },
                textInput:{
                    height: 44,
                    margin: 0,
                    borderRadius: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                    paddingLeft: 15,
                    paddingRight: 15,
                    marginBottom: 0,
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { x: 0, y:0},
                    shadowRadius: 35,
                    borderWidth: 0,
                    fontSize: 16
                },
                listView: {
                    marginHorizontal: 20
                }
            }}
        />
    }
}