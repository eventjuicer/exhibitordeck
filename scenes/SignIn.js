
import React from 'react';
import { connect } from 'react-redux';

import {Alert, StyleSheet, ScrollView, View, Text, Image, KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, Input} from 'react-native-elements';

import {CommentsStyles as styles} from '../styles';

import {authenticate} from '../redux/actions';
import Icon from 'react-native-vector-icons/FontAwesome';


import { Formik } from 'formik';
import * as yup from 'yup';


const schema = yup.object().shape({
    email: yup.string().required("E-mail required").email('Valid E-mail required'),
    password: yup.string().required('Password required').min(4, "Too short..."),
  });


class SignIn extends React.Component {


  state = {
    behavior: 'padding',
  }
 
  render() {

    const { behavior } = this.state;
    const { authenticate } = this.props;

    return (

<ScrollView style={styles.outerContainer}>
  <KeyboardAvoidingView behavior={behavior} style={styles.container}>

    <Formik
        initialValues={{ 
            email: '', password : '' 
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {

            authenticate(values)

            actions.setStatus({
                email : 'asd',
                password : 'dsa'
            })
            console.log(values)
        }}
        >
        {
        
        ({ handleSubmit, handleChange, handleBlur, values, errors, status }) => {

            // console.log(errors, status);

            return (
                <View>
                   
                    <Input
                        returnKeyType="next"
                        leftIcon={
                            <Icon
                            name='envelope'
                            size={24}
                            color='black'
                            />
                        }
                        autoComplete="email"
                        leftIconContainerStyle={{marginRight:10}}
                        multiline={false}
                        placeholder="your e-mail address"
                        style={styles.textInput}
                        value={values.email}
                        onBlur={handleBlur('email')}
                        onChangeText={handleChange('email')}
                        errorStyle={{ color: 'red' }}
                        errorMessage={errors && "email" in errors ? errors.email : null}
                    />
        
        
                    <Input
                        returnKeyType="send"
                        leftIcon={
                            <Icon
                            name='key'
                            size={24}
                            color='black'
                            />
                        }
                        secureTextEntry={true}
                        leftIconContainerStyle={{marginRight:10}}
                        multiline={false}
                        placeholder="company password"
                        style={styles.textInput}
                        value={values.password}
                        onBlur={handleBlur('password')}
                        onChangeText={handleChange('password')}
                        errorStyle={{ color: 'red' }}
                        errorMessage={errors && "password" in errors ? errors.password : null}
                    />
        
                    <Button large 
                        color="#787878" 
                        buttonStyle={{margin: 20}}  
                        backgroundColor="transparent" 
                        borderRadius={2} 
                        onPress={handleSubmit}
                        title="Sign In"
                    />
        
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

export default connect(mapStateToProps, {authenticate})(SignIn);
