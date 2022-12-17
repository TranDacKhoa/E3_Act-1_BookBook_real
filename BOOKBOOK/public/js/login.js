(function () {
   'use strict'
 
   var forms = document.querySelectorAll('.needs-validation')
 
   Array.prototype.slice.call(forms)
     .forEach(function (form) {

         form.addEventListener('submit', function (event) {

            if (!form.checkValidity()) {
               document.getElementById("un-fb").innerHTML = "<small>Not begin with a digit and contain at least 6 characters, including alphabet letters, numbers or _ (underscore)</small>"
               document.getElementById("pw-fb").innerHTML = "<small>At least 8 characters, 1 uppercase, 1 lowercase and 1 number</small>"
               event.preventDefault()
               event.stopPropagation()
            }
   
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