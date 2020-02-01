
import React from 'react';
import { connect } from 'react-redux';
import {Alert, StyleSheet, ScrollView, View, Text, Image, KeyboardAvoidingView } from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';

import Header from '../components/MyHeader'
import {authenticateByCredentials} from '../redux/actions';
import {CommentsStyles as styles} from '../styles';

const schema = yup.object().shape({
    email: yup.string().required("E-mail required").email('Valid E-mail required'),
    password: yup.string().required('Password required').min(4, "Too short..."),
  });

/**
 * https://jaredpalmer.com/formik/docs/api/formik
 */

class SignIn extends React.Component {


  state = {
    behavior: 'padding',
  }
 
  render() {

    const { behavior } = this.state;
    const { authenticateByCredentials } = this.props;

    return (

<ScrollView style={styles.container}>
  <KeyboardAvoidingView behavior={behavior} style={styles.container}>

    <Formik
        initialValues={{ 
            email: '', password : '' 
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {

        /*
        actions:

        "resetForm": [Function anonymous],
        "setErrors": [Function anonymous],
        "setFieldError": [Function anonymous],
        "setFieldTouched": [Function anonymous],
        "setFieldValue": [Function anonymous],
        "setFormikState": [Function anonymous],
        "setStatus": [Function anonymous],
        "setSubmitting": [Function anonymous],
        "setTouched": [Function anonymous],
        "setValues": [Function anonymous],
        "submitForm": [Function anonymous],
        "validateField": [Function anonymous],
        "validateForm": [Function anonymous],
        */
      
            authenticateByCredentials(values);
            alert("test")
        }}
        >
        {
        
        ({ handleSubmit, handleChange, handleBlur, values, errors, status, isValid, isSubmitting }) => {

            // console.log(errors, status);

            return (
                <View>
                   
                   <Header navigation={this.props.navigation} />
                 
                   <View style={{
                      // padding: 10,   
                       alignItems: 'center',
                        flex: 1,
                        justifyContent : 'center'
}}>

  <View style={{width: '100%'}}>
                     <Input
                        placeholder="Your e-mail address"
                        returnKeyType="next"
                        leftIcon={
                            <Icon
                            name='email'
                            size={30}
                            color='#bbbbbb'
                            />
                        }
                        autoComplete="email"
                        leftIconContainerStyle={{marginRight: 10}}
                        multiline={false}
                        containerStyle={{padding: 10}}
                        value={values.email}
                        onBlur={handleBlur('email')}
                        onChangeText={handleChange('email')}
                        errorStyle={{ color: 'red' }}
                        errorMessage={errors && "email" in errors ? errors.email : null}
                    />
        
        
                    <Input
                        placeholder="company password"
                        returnKeyType="send"
                        leftIcon={
                            <Icon
                            name='lock'
                            size={30}
                            color='#bbbbbb'
                            />
                        }
                        containerStyle={{padding: 10}}
                        secureTextEntry={true}
                        leftIconContainerStyle={{marginRight: 10}}
                        multiline={false}
                  
                        value={values.password}
                        onBlur={handleBlur('password')}
                        onChangeText={handleChange('password')}
                        errorStyle={{ color: 'red' }}
                        errorMessage={errors && "password" in errors ? errors.password  : null}
                        onSubmitEditing={handleSubmit}
                    />
        
                    <Button  
                        color="#000000" 
                        buttonStyle={{margin: 20}}  
                        backgroundColor="transparent" 
                        borderRadius={2} 
                        onPress={handleSubmit}
                        title="Sign In"
                        disabled={!isValid}
                        type="clear"
                    />
                    </View></View>
                  
        
                </View>
                )

        }}
    </Formik>
    </KeyboardAvoidingView>
    </ScrollView>
    );
    }
}


const mapStateToProps = state => ({
  auth : state.auth,
  options : state.options
});

export default connect(mapStateToProps, {authenticateByCredentials})(SignIn);
