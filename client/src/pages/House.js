
// import React from "react";
// import { Button } from "../components/AuthForm";
// import { useAuth } from "../context/auth";
// import { Formik, yupToFormErrors } from "formik";
// import { Card, Logo, Error } from '../components/AuthForm';
// import Axios from "axios";
// import * as Yup from "yup";

// function House(props) {
//   const [isLoggedIn, setLoggedIn] = useState(false);
//   const [isError,setIsError] = useState(false)
//   const [errorText, setErrorText] = useState(true);
//   const { setAuthTokens } = useAuth();

//   const referer = props.location.state.referer || '/';
//   const MyTextInput = ({ label, ...props }) => {
//     // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
//     // which we can spread on <input> and alse replace ErrorMessage entirely.
//     const [field, meta] = useField(props);
//     return (
//       <>
//         <label htmlFor={props.id || props.name}>{label}</label>
//         <input className="text-input" {...field} {...props} />
//         {meta.touched && meta.error ? (
//           <div className="error">{meta.error}</div>
//         ) : null}
//       </>
//     );
//   };


// if (isLoggedIn) {
//     return <Redirect to={referer} />;
// }
//   function logOut() {
//     setAuthTokens();
//   }

//   return (
//     <div>
//       <div>House Page</div>
//       <Button onClick={logOut}>Log out</Button>
//       <div>
//         <Card>
//           <Formik
//           initialValues={{
//            street: "",
//            city: "",
//            state: "",
//            zip: "", 
//           //  comment
//           }}
//           validationSchema={yupToFormErrors.object({
//             street: Yup.string()
//               .required("Required"),
//             city: Yup.string()
//               .required("Required"),
//             state: Yup.string()
//               .max(2, "Please use 2 Letter State Abbreviation.")
//               .required("Required"),
//             zip: Yup.number()
//               .max(15, "Must be a valid 5 digit zip")
//               .required("Required"),
//           })}
//           onSubmit={(values, { setSubmitting }) => {
//             let {street, city, state, zip} = values

//             Axios.post("api//users/house", {
//               street,
//               city,
//               state,
//               zip
//             }).then(result => {
//               if(result.status === 200) {
//                 if (result.data.error) {
//                   setErrorText(result.data.error)
//                   SpeechSynthesisErrorEvent(true)
//                 } else {
//                   setAuthTokens(result.data)
//                   setLoggedIn(true);
//                 }
//               } else {
//                 SpeechSynthesisErrorEvent(true);
//               }
//             }).catch(e => {
//               SpeechSynthesisErrorEvent(true);
//             });
//           }}
//           >
//             <Form>
//               <MyTextInput
//                 label="Property Street Address"
//                 name="street"
//                 type="text"
//                 placeholder="Street Address"
//               />
//               <MyTextInput
//                 label="City"
//                 name="city"
//                 type="text"
//                 placeholder="City"
//               />
//               <MyTextInput
//                 label="State"
//                 name="state"
//                 type="text"
//                 placeholder="St"
//               />
//               <MyTextInput
//                 label="Zip"
//                 name="zip"
//                 type="number"
//                 placeholder="Zip"
//               />
//               <button type="submit">Submit</button>
//             </Form>
//           </Formik>
//           <Link to="/signup">Don't have an account?</Link>
//             { isError &&<Error>{errorText}</Error>}
//         </Card>
//       </div>
//     </div>
//   );
// }

// // headline: { type: String },
// //     houseImageURL: { type: String },
// //     street: { type: String, required: true },
// //     city: { type: String, required: true },
// //     state: { type: String, required: true },
// //     zip: { type: Number, required: true },
// //     lat: { type: Number },
// //     long: { type: Number }

// export default House;
