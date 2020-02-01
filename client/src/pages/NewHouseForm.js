import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from "yup";
import { Card, Logo } from '../components/AuthForm';
import logoImg from "../img/walkthru.JPG";
import "../styles.css";
import "../styles-custom.css";
import axios from 'axios';
import Geocode from "react-geocode";

Geocode.setApiKey('AIzaSyCSybu-E2Hs97g9Wwo8XmqTVtA-4y9h9co');
// RJ's GOOGLE API KEY
Geocode.setLanguage("en");
Geocode.enableDebug();


const NewHouseForm = () => {

    const MyTextInput = ({ label, ...props }) => {
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        // which we can spread on <input> and also replace ErrorMessage entirely.
        const [field, meta] = useField(props);
        return (
            <>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input className="text-input" {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error"> {meta.error} </div>
                ) : null}
            </>
        );
    };
    return (
        <Card>
            <Logo src={logoImg} />
            <h1>Create a new house/property!</h1>
            <Formik
                initialValues={{ street: "", city: "", st: "", zip: "" }}
                validationSchema={Yup.object({
                    street: Yup.string()
                        .min(1, 'Street Address must not be blank.')
                        .required('Required'),
                    city: Yup.string()
                        .min(1, "City must not be blank.")
                        .required('Required'),
                    st: Yup.string()
                        .max(2, "Please use the states abbreviation.")
                        .required('Required'),
                    zip: Yup.string()
                        .min(5, "Zip Must be 5 digits.")
                        .max(5, "Zip Must be 5 digits.")
                        .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);

                    let {street, city, st, zip} = values;
                    console.log(values);

                    axios.post("/api/houses", {
                        street,
                        city,
                        st,
                        zip
                    })
                    .then(result => {
                        console.log(result);
                    })
                    .then(
                        Geocode.fromAddress("11800 South 300 East, Draper, UT 84020").then(
                            response => {
                            //   const { lat, lng } = response.results[0].geometry.location;
                            //   console.log(lat, lng);
                            console.log(response);
                            },
                            error => {
                              console.error(error);
                            }
                          )
                    )
                    .catch(err => {
                        console.log(err);
                    });
                 }}
            >
                <Form>
                    <MyTextInput
                        label="Street"
                        name="street"
                        type="text"
                        placeholder="Street Address"
                    />
                    <MyTextInput
                        label="City"
                        name="city"
                        type="text"
                        placeholder="City"
                    />
                    {/* Option drop down menu for the State field */}
                    {/* <MySelect label="State" name="st">
                        <option value="">Select a State</option>
                        <option value="AK">AK</option>
                        <option value="AR">AR</option>
                        <option value="AZ">AZ</option>
                        <option value="CA">CA</option>
                    </MySelect> */}
                    <MyTextInput
                        label="St"
                        name="st"
                        type="text"
                        placeholder="St"
                    />
                    <MyTextInput
                        label="zip"
                        name="zip"
                        type="number"
                        placeholder="Zip"
                    />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </Card>
    );
};

export default NewHouseForm;