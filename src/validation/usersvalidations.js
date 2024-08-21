const ValidateCreate = (formData) => {
  let error = {}

if (!formData.name) {
  error.name = 'First Name is required';
} else if (!/^[a-zA-Z. ]+$/.test(formData.name.trim())) {
  error.name = 'First Name should only contain alphabetic characters';
}
if (!formData.lastname) {
  error.lastname = 'Last Name is required';
} else if (!/^[a-zA-Z. ]+$/.test(formData.lastname)) {
  error.lastname = 'Last Name should only contain alphabetic characters';
}
  if (!formData.email) {
    error.email = 'Email is required' 
  }
  else if (!(/^\S+@\S+\.\S+$/.test(formData.email))) {
    error.email = "Email address 'abc@gmail.com' is invalid."
  }
  if (!formData.phoneNumber) {
    error.phoneNumber = 'Phone Number is required';
  // } else if (!/^\d{10}$/.test(formData.PhoneNumber)) {
  //   error.PhoneNumber = 'Phone Number must be 10 digits';
  // } else if (formData.PhoneNumber.length < 10){
    error.phoneNumber = 'Phone Number minimum 10 digits';
  }
  else if (formData.phoneNumber.length > 10){
    error.phoneNumber = 'Phone Number maximum 10 digits';
  }

  if (!formData.password) {
    error.password = 'Password is required';
  } 
  return error;
};
export default ValidateCreate
