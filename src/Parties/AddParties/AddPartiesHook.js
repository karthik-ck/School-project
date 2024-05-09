import { useEffect, useState } from 'react'
import UserService from '../../Services/UserService'
import { useLocation, useNavigate } from 'react-router-dom'

function AddPartiesHook() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    parties: [{
      parties_name: '',
      phone: '',
      email: '',
      address: ''
    }]
  })
  const [submitted, setSubmitted] = useState(false)
  const [emailValidation, setEmailValidation] = useState([])
  const [phoneValidation, setPhoneValidation] = useState([])
  const [showUpdate, setShowUpdate] = useState(false)

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const handleChange = (event, index) => {
    const { name, value } = event.target;

    if (name === 'email') {
      const emailPattern = /^\S+@\S+\.\S+$/;
      const isEmailInvalid = !emailPattern.test(value)
      setEmailValidation(prevState => {
        const newValidation = [...prevState]
        newValidation[index] = isEmailInvalid
        return newValidation
      })
    }

    if (name === 'phone') {
      const isPhoneInvalid = value.length < 10
      setPhoneValidation(prevState => {
        const newValidation = [...prevState]
        newValidation[index] = isPhoneInvalid
        return newValidation
      })
    }

    const newItems = [...formData.parties]
    newItems[index][name] = value
    setFormData({ parties: newItems })
  }

  const addNewParty = () => {
    setFormData({
      parties: [...formData.parties, {
        parties_name: '',
        phone: '',
        email: '',
        address: ''
      }]
    })
  }

  const removeParty = (index) => {
    const newItems = [...formData.parties]
    newItems.splice(index, 1)
    setFormData({ parties: newItems })
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

  const saveParty = () => {
    setSubmitted(true)
    let hasError = false;
    formData.parties.forEach((party) => {
      Object.values(party).forEach((val) => {
        if (!val) {
          hasError = true;
        }
      })
    })

    if (!hasError && !emailValidation.some(validation => validation) && !phoneValidation.some(validation => validation)) {
      setSubmitted(false)
      UserService.addParties(formData.parties)
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.status.message)
            navigate("/parties")
          } else {
            alert(response.data.status.message)
          }
        })
        .catch((error) => {
          alert(error.response.data.status.message)
        })
    }
  }

  useEffect(() => {
    if (id) {
      setShowUpdate(true)
      UserService.getPartiesbyID(id)
        .then((response) => {
          setFormData({
            parties: [{
              parties_name: response.data.data[0].parties_name,
              phone: response.data.data[0].phone,
              email: response.data.data[0].email,
              address: response.data.data[0].address
            }]
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [id])

  const cancelBtn = () => {
    navigate("/parties")
  }

  const updateParty = () => {
    setSubmitted(true)
    let hasError = false;
    formData.parties.forEach((party) => {
      Object.values(party).forEach((val) => {
        if (!val) {
          hasError = true;
        }
      })
    })

    if (!hasError && !emailValidation.some(validation => validation) && !phoneValidation.some(validation => validation)) {
      setSubmitted(false)
      UserService.updateParty(id,formData.parties[0])
        .then((response) => {
          if (response.status === 200) {
            alert(response.data.status.message)
            navigate("/parties")
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
    addNewParty,
    removeParty,
    numberOnly,
    submitted,
    saveParty,
    emailValidation,
    phoneValidation,
    showUpdate,
    cancelBtn,
    updateParty
  }
}

export default AddPartiesHook
