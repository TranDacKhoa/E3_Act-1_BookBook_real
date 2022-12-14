(function () {
   'use strict'
 
   var forms = document.querySelectorAll('.needs-validation')
 
   Array.prototype.slice.call(forms)
     .forEach(function (form) {

         form.addEventListener('submit', function (event) {
            event.preventDefault()
            event.stopPropagation()
   
            form.classList.add('was-validated')
         }, false)
     })
})()


username = document.getElementById("username")
username.addEventListener("input", () => {
   const username_regex = /^(?!\d)(\w){6,}$/

   if (username_regex.test(username.value)) {
      username.setCustomValidity("")
   }
   else {
      username.setCustomValidity("Invalid")
   }
})

password = document.getElementById("password")
password.addEventListener("input", () => {
   const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

   if (password_regex.test(password.value)) {
      password.setCustomValidity("")
   }
   else {
      password.setCustomValidity("Invalid")
   }
})

function validateLogin(form) {
   let inputs = document.querySelectorAll("input")
   let isValid = true

   for (let i = 0; i < inputs.length; i++) {
      if (validator(inputs[i].value)) {
         inputs[i].classList.add("is-valid")
      }
      else {
         isValid = false
         inputs[i].classList.add("is-invalid")
      }
   }
   
   return isValid
 }
 
//  let isDupUsername = false
//  function validateSignup() {
//    const signup_form = document.forms.namedItem("form-signup")
//    let isValid = true
 
//    for (let i = 0; i < signup_form.length - 2; i++) {
//      if (signup_form[i].id == "male" || signup_form[i].id == "female") {
//        continue
//      }
//      if (signup_form[i].id == "password" || signup_form[i].id == "dob" || 
//          signup_form[i].id == "secretkey" || validator(signup_form[i])) {
//        setSuccess(signup_form[i])
//      }
//      else {
//        if (signup_form[i].id == "username" && isDupUsername) {
//          setError(signup_form[i], "has been used")
//        }
//        else {
//          setError(signup_form[i])
//        }
//        isValid = false
//      }
//    }
 
//    return isValid
//  }
 

 
// function validator(input) {
//    switch (input.id) {
//       case "fullname":
//          return checkFullname(input.value)
//       case "username":
//          return checkUsername(input.value)
//       case "email":
//          return checkEmail(input.value)
//       case "phone":
//          return checkTel(input.value)
//    }
// }
 
//  function checkFullname(fullname) {
//    const fullname_regex = /^[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*(?: [A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*$/
//    return fullname_regex.test(fullname)
//  }
 
//  function checkUsername(username) {
//    const username_regex = /^(?!\d)(\w){6,}$/
 
//    fetch('/user', {
//      method: "POST",
//      headers: {
//        "Content-Type": "application/json",
//        Accept: "application/json",
//      },
//      body: JSON.stringify({todo: "checkusername", username: username})
//    })  
//    .then((res) => res.json())
//    .then((data_received) => {
//      if (data_received.result == 0) {
//        isDupUsername = true
//      }
//      else {
//        isDupUsername = false
//      }
//    })
//    .catch((error) => {
//      console.error(error)
//    })
 
//    if (username_regex.test(username) && !isDupUsername) {
//      return true
//    }
//    else {
//      return false
//    }
//  }
 
//  function checkEmail(email) {
//    const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//    return email_regex.test(email)
//  }
 
//  function checkTel(tel) {
//    const tel_regex = /^0[0-9]{9}$/
//    return tel_regex.test(tel)
//  }
