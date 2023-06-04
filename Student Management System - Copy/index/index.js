$(document).ready(function () {
  // document.getElementById("login-section").style.display = "block";
  // document.getElementById("signup-section").style.display = "none";

  // ---------------------------------------------------------------------------------------
  document.getElementById("option").addEventListener("change", function () {
    var selectedOption = this.value;

    if (selectedOption === "login") {
      document.getElementById("login-section").style.display = "block";
      document.getElementById("signup-section").style.display = "none";
    } else if (selectedOption === "signup") {
      document.getElementById("login-section").style.display = "none";
      document.getElementById("signup-section").style.display = "block";
    }
    //  else {
    //   document.getElementById("login-section").style.display = "block";
    //   document.getElementById("signup-section").style.display = "none";
    // }
  });

  document
    .querySelector("#login-section form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      // Handle login form submission here

      var email = $("#login_email").val();
      var password = $("#login_password").val();

      var loginData = {
        email: email,
        password: password,
      };

      $.ajax({
        type: "POST",
        url: "http://localhost:9090/student/login",
        // data: JSON.stringify(loginData),
        // contentType: "application/json",
        data: loginData, // Send the loginData object as the request payload
        success: function (response) {
          if (response === true) {
            alert("Login successful");
            // Additional code for handling successful login
            // Redirect to the logged-in page

            window.location.href = "/studentdata/students_list.html";
          } else {
            alert("Invalid email or password");
            // Redirect to the sign-up page
            window.location.href = "/signup/signup.html";
          }
        },
        error: function () {
          alert("An error occurred during login");
        },
      });

      console.log("Login form submitted");
    });

  document
    .querySelector("#signup-section form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      // Handle sign up form submission here
      addStudent();
      console.log("Sign up form submitted");
    });
  //------------------------------------------------------------------------------------------------
  // Function to handle form submission for adding a student
  function addStudent() {
    var name = $("#name").val();
    var email = $("#email").val();
    var date = $("#date").val();
    var time = $("#time").val();
    var password = $("#password").val();

    // Create student object
    var student = {
      name: name,
      email: email,
      date: date,
      time: time,
      password: password,
    };

    $.ajax({
      url: "http://localhost:9090/student",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(student),
      success: function (data) {
        showMessage("Student added successfully", "green");
        clearForm();
        //loadStudents();
        window.location.href = "http://127.0.0.1:5500/index/index.html";
      },
      error: function (xhr, status, error) {
        showMessage("Error occurred while adding student", "red");
        console.log(error);
      },
    });
  }

  // Function to clear the form inputs
  function clearForm() {
    $("#name").val("");
    $("#email").val("");
    $("#date").val("");
    $("#time").val("");
    $("#password").val("");
  }
  //--------------------------------------------------------------------------------------

  function showMessage(message, color) {
    $("#message").text(message).css("color", color);
  }
});
