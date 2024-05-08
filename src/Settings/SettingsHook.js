import { useState } from 'react'
import UserService from '../Services/UserService'
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function SettingsHook() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    customers: [{
      customer_name: '',
      phone: '',
      email: '',
      address: '',
      wallet_amount: ''
    }]
  })
  const [submitted, setSubmitted] = useState(false)
  const [emailValidation, setEmailValidation] = useState([])
  const [phoneValidation, setPhoneValidation] = useState([])
  const [showUpdate, setShowUpdate] = useState(false)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const handleChange = (index, event) => {
    const { name, value } = event.target;

    // if(name === 'email'){
    //   const emailPattern = /^\S+@\S+\.\S+$/;
    //   setEmailValidation(!emailPattern.test(value));
    // }

    // if (name === 'phone'){
    //   setPhoneValidation(value.length < 10);
    // }

    if (name === 'email') {
      const emailPattern = /^\S+@\S+\.\S+$/;
      const isEmailInvalid = !emailPattern.test(value);
      setEmailValidation(prevState => {
        const newValidation = [...prevState];
        newValidation[index] = isEmailInvalid;
        return newValidation;
      });
    }

    if (name === 'phone') {
      const isPhoneInvalid = value.length < 10;
      setPhoneValidation(prevState => {
        const newValidation = [...prevState];
        newValidation[index] = isPhoneInvalid;
        return newValidation;
      });
    }

    const newItems = [...formData.customers]
    newItems[index][name] = value;
    setFormData({ customers: newItems })
  }

  const addNewCustomer = () => {
    setFormData({
      customers: [...formData.customers, {
        customer_name: '',
        phone: '',
        email: '',
        address: '',
        wallet_amount: ''
      }]
    })
  }

  const removeCustomer = (index) => {
    const newItems = [...formData.customers]
    newItems.splice(index, 1)
    setFormData({ customers: newItems })
  }

  const saveForm = (e) => {
    setSubmitted(true)
    let hasError = false;
    formData.customers.forEach((customer) => {
      Object.values(customer).forEach((val) => {
        if (!val) {
          hasError = true;
        }
      })
    })

    if (!hasError && !emailValidation.some(val => val) && !phoneValidation.some(val => val)) {
      setSubmitted(false)
      UserService.addCustomer(formData.customers)
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.status.message)
          } else {
            alert(response.data.status.message)
          }
        })
        .catch((error) => {
          alert(error.response.data.status.message)
        })
    }
  }

  const numberOnly = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    // Allow only digits and certain special keys like backspace, delete, arrow keys, etc.
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];

    if (!allowedKeys.includes(keyValue) && event.key !== 'Backspace') {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (id) {
      setShowUpdate(true)
      UserService.getCustomerbyID(id)
        .then((response) => {
          setFormData({
            customers: [{
              customer_name: response.data.data[0].customer_name,
              phone: response.data.data[0].phone,
              email: response.data.data[0].email,
              address: response.data.data[0].address,
              wallet_amount: response.data.data[0].wallet_amount
            }]
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [id])

  const updateForm = () => {
    setSubmitted(true)
    let hasError = false;
    formData.customers.forEach((customer) => {
      Object.values(customer).forEach((val) => {
        if (!val) {
          hasError = true;
        }
      })
    })

    if (!hasError && !emailValidation.some(val => val) && !phoneValidation.some(val => val)) {
      setSubmitted(false)
      UserService.updateCustomer(id, formData.customers[0])
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.status.message)
            navigate("/customer")
          } else {
            alert(response.data.status.message)
          }
        })
        .catch((error) => {
          alert(error.response.data.status.message)
        })
    }
  }

  return {
    formData,
    handleChange,
    addNewCustomer,
    removeCustomer,
    saveForm,
    submitted,
    emailValidation,
    numberOnly,
    phoneValidation,
    showUpdate,
    updateForm
  }
}

export default SettingsHook
