(function () {
   'use strict'
 
   var forms = document.querySelectorAll('.needs-validation')
 
   Array.prototype.slice.call(forms)
     .forEach(function (form) {

         form.addEventListener('submit', async function (event) {
            event.preventDefault()
            event.stopPropagation()
            let username = document.getElementById("username")
            
            if (checkUsername()) {
               let data_received = await fetch('/signup', {
                  method: 'post',
                  headers: {
                     "Content-Type": "application/json",
                     Accept: "application/json",
                  },
                  body: JSON.stringify({ todo: "checkusername", username: username.value })
               }).then(res => res.json())

               if (data_received.result == 1) {
                  username.setCustomValidity("")
                  document.getElementById("un-fb").innerText = "Not begin with a digit and contain at least 6 characters, including alphabet letters, numbers or _ (underscore)"
               }
               else {
                  username.setCustomValidity("Invalid")
                  document.getElementById("un-fb").innerText = "This username has been used"
               }
            }
   
            form.classList.add('was-validated')
         }, false)
     })
})()

async function signUp() {
   // signup
}

const fullname_regex = /^[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*(?: [A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ][a-zàáâãèéêìíòóôõùúăđĩũơưăạảấầẩẫậắằẳẵặẹẻẽềềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*)*$/
const username_regex = /^(?!\d)(\w){3,}$/
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


fullname = document.getElementById("fullname")
fullname.addEventListener("input", () => {
   if (fullname_regex.test(fullname.value)) {
      fullname.setCustomValidity("")
   }
   else {
      fullname.setCustomValidity("Invalid")
   }
})

username = document.getElementById("username")
function checkUsername() {
   document.getElementById("un-fb").innerText = "Not begin with a digit and contain at least 6 characters, including alphabet letters, numbers or _ (underscore)"
   if (username_regex.test(username.value)) {
      username.setCustomValidity("")
      return true
   }
   else {
      username.setCustomValidity("Invalid")
      return false
   }
}
username.addEventListener("input", checkUsername)

password = document.getElementById("password")
password.addEventListener("input", () => {
   if (password_regex.test(password.value)) {
      password.setCustomValidity("")
   }
   else {
      password.setCustomValidity("Invalid")
   }
})

confirm_pw = document.getElementById("confirm_pw")
confirm_pw.addEventListener("input", () => {
   if (password_regex.test(confirm_pw.value) && confirm_pw.value == password.value) {
      confirm_pw.setCustomValidity("")
   }
   else {
      confirm_pw.setCustomValidity("Invalid")
   }
})

email = document.getElementById("email")
email.addEventListener("input", () => {
   if (email_regex.test(email.value)) {
      email.setCustomValidity("")
   }
   else {
      email.setCustomValidity("Invalid")
   }
})
 
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
