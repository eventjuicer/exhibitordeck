
import React from 'react';
import { connect } from 'react-redux';
import {StyleSheet, View, Text, Image } from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import SelectCompany from '../components/SelectCompany'
import CompanyReps from '../components/CompanyReps'

//custom
import Header from '../components/MyHeader'
import {
    authenticateByCredentials, 
    getCompanies,
    unSetCompany,
    AuthenticatedCompanySelector
} from '../redux';


const schema = yup.object().shape({
    company_id: yup.number().required("Company name required").positive('Wrong Company Name'),
    password: yup.string().required('Password required').min(4, "Too short..."),
  });

const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : '100%',
    },
    form : {
        display: 'flex',
        flexDirection : 'column',
        justifyContent: 'space-around',
        alignItems : 'center',
        width : '100%',
        marginTop: 0
    }
})


/**
 * https://jaredpalmer.com/formik/docs/api/formik
 */

class User extends React.Component {
  
  componentDidMount(){
      const {getCompanies} = this.props;
      getCompanies();
  }

  render() {

    const { auth, authenticateByCredentials } = this.props;

    return (

    <View style={{flex:1}}>
    <Header />
    <View style={{flex:1, marginTop: 20}}>
    {auth ? <CompanyReps /> : <Formik
        initialValues={{ 
            company_id: 0, password : '' 
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
        }}
        >
        {
        
        (formikProps) => {

            // console.log(errors, status);

            const { 
                setFieldValue, 
                handleSubmit, 
                handleChange, 
                handleBlur, 
                values, 
                errors, 
                status, 
                isValid, 
                isSubmitting
            } = formikProps;

            return (

    <View style={{marginTop: 10}}>
    <SelectCompany onChange={(value) => setFieldValue("company_id", value)} />
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
        secureTextEntry={false}
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

    </View>

                )

        }}
    </Formik>}
    
    </View>
    </View>
    );
    }
}


export default connect((state, props) => ({
    auth : AuthenticatedCompanySelector(state, props),
  //  options : state.options
}), {authenticateByCredentials, unSetCompany, getCompanies})(User);
