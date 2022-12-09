const nameRegex =
  /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)+$/;

const usernameRegex = /^(?!\d)(\w){6,}$/;

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const telRegex = /^[0][0-9]{9}$/;

var form = document.getElementById("form-signup");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    var valid = validateInputs();
    if (valid) {
      alert("Sign up successful!");
      window.location = "index.html";
    }
  });
}

const formLogin = document.getElementById("form-login");
if (formLogin) {
  form = formLogin;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateInputs()) {
      alert("Checking account...");
    }
  });
}

function validateInputs() {
  var allValid = true;
  var arrGroup = form.getElementsByClassName("form-group");
  for (let group of arrGroup) {
    let input = group.querySelector("input");
    if (validator(input)) {
      setSuccessFor(input);
    } else {
      allValid = false;
    }
  }
  return allValid;
}
function validator(input) {
  var type = input.className;
  switch (type) {
    case "fullname":
      return checkFullname(input);
    case "username":
      return checkUsername(input);
    case "email":
      return checkEmail(input);
    case "phone":
      return checkTel(input);
    case "birthday":
      return checkBirthday(input);
    default:
      return filledOut(input);
  }
}
function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-group success";
}
function raiseError(input, msg, prefix = true, longMSG = false) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-group error";
  small.innerText = (prefix ? input.id : "") + " " + msg;
}

function filledOut(input) {
  const inputValue = input.value.trim();
  if (inputValue === "") {
    raiseError(input, "can not be blank");
    return false;
  }
  return true;
}
function checkFullname(input) {
  if (!filledOut(input)) {
    return false;
  }
  if (!nameRegex.test(input.value)) {
    raiseError(input, "is invalid");
    return false;
  }
  return true;
}
function checkUsername(input) {
  if (!filledOut(input)) {
    return false;
  }
  if (!usernameRegex.test(input.value)) {
    raiseError(input, "is invalid", true, true);
    return false;
  }
  return true;
}
function checkEmail(input) {
  if (!filledOut(input)) {
    return false;
  }
  if (!emailRegex.test(input.value)) {
    raiseError(input, "is invalid");
    return false;
  }
  return true;
}
function checkTel(input) {
  if (!filledOut(input)) {
    return false;
  }
  let phone = input.value.trim();
  let len = phone.toString().length;
  if (len != 10) {
    raiseError(input, "number must has 10 digits");
    return false;
  } else if (!telRegex.test(phone)) {
    raiseError(input, "is invalid");
    return false;
  }
  return true;
}

function calculateAge(date) {
  date = new Date(date.toString());
  const now = new Date();
  const diff = Math.abs(now - date);
  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  return age;
}
function checkBirthday(input) {
  if (!filledOut(input)) {
    return false;
  }
  console.log(input.value);
  let age = calculateAge(input.value);
  console.log(age);
  if (age < 15 || age > 55) {
    raiseError(input, "Age must between 15 and 55", false);
    return false;
  }
  return true;
}
