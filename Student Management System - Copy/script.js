/*
$(document).ready(function () {
  loadStudents();

  $("#submitButton").click(addStudent);
});

function showMessage(message, color) {
  var messageElement = $("#message");
  messageElement.text(message);
  messageElement.css("color", color);
}

function loadStudents() {
  $.ajax({
    url: "http://localhost:9090/student",
    type: "GET",
    success: function (students) {
      var tableBody = $("#studentTable tbody");
      tableBody.empty();

      students.forEach(function (student) {
        var row =
          "<tr>" +
          "<td>" +
          student.name +
          "</td>" +
          "<td>" +
          student.email +
          "</td>" +
          "<td>" +
          student.date +
          "</td>" +
          "<td>" +
          student.time +
          "</td>" +
          "<td>" +
          student.password +
          "</td>" +
          "<td>" +
          '<div class="actions">' +
          '<button class="editButton" data-id="' +
          student.id +
          '">Edit</button>' +
          '<button class="viewButton" data-id="' +
          student.id +
          '">View</button>' +
          "</div>" +
          "</td>" +
          "</tr>";
        tableBody.append(row);
      });

      // Attach event handlers to the dynamically generated buttons
      $(".editButton").click(function () {
        var studentId = $(this).data("id");
        getStudent(studentId, editStudent);
      });

      $(".viewButton").click(function () {
        var studentId = $(this).data("id");
        getStudent(studentId, viewStudent);
      });
    },
    error: function (xhr, status, error) {
      showMessage("Error occurred while loading data", "red");
      console.log(error);
    },
  });
}

function addStudent() {
  var name = $("#name").val();
  var email = $("#email").val();
  var date = $("#date").val();
  var time = $("#time").val();
  var password = $("#password").val();

  var studentData = {
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
    data: JSON.stringify(studentData),
    success: function (response) {
      showMessage("Data saved successfully", "green");
      $("#studentForm")[0].reset();
      loadStudents();
    },
    error: function (xhr, status, error) {
      showMessage("Error occurred while saving data", "red");
      console.log(error);
    },
  });
}

function deleteStudent(studentId) {
  $.ajax({
    url: "http://localhost:9090/student/" + studentId,
    type: "DELETE",
    success: function (response) {
      showMessage("Data deleted successfully", "green");
      loadStudents();
    },
    error: function (xhr, status, error) {
      showMessage("Error occurred while deleting data", "red");
      console.log(error);
    },
  });
}

function getStudent(studentId, callback) {
  $.ajax({
    url: "http://localhost:9090/student/" + studentId,
    type: "GET",
    success: function (student) {
      callback(student);
    },
    error: function (xhr, status, error) {
      showMessage("Error occurred while loading student data", "red");
      console.log(error);
    },
  });
}

// Function to handle the edit functionality
function editStudent(student) {
  $("#name").val(student.name);
  $("#email").val(student.email);

  $("#date").val(student.date);
  $("#time").val(student.time);
  $("#password").val(student.password);

  $("#submitButton").unbind("click"); // Remove existing click event handler

  $("#submitButton").click(function () {
    updateStudent(student.id);
  });

  showMessage("Edit Mode", "blue");
}

function updateStudent(studentId) {
  var name = $("#name").val();
  var email = $("#email").val();
  var date = $("#date").val();
  var time = $("#time").val();
  var password = $("#password").val();

  var studentData = {
    name: name,
    email: email,
    date: date,
    time: time,
    password: password,
  };

  $.ajax({
    url: "http://localhost:9090/student/" + studentId,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(studentData),
    success: function (response) {
      showMessage("Data updated successfully", "green");
      $("#studentForm")[0].reset();
      loadStudents();
    },
    error: function (xhr, status, error) {
      showMessage("Error occurred while updating data", "red");
      console.log(error);
    },
  });
}

function viewStudent(student) {
  $("#name").val(student.name);
  $("#email").val(student.email);
  $("#date").val(student.date);
  $("#time").val(student.time);
  $("#password").val(student.password);

  $("#submitButton").hide();

  showMessage("View Mode", "blue");
}

*/

//--------------------------------------------------------------------------------------------------------
/*
function deleteStudent(studentId) {
  if (confirm("Are you sure you want to delete this student?")) {
    $.ajax({
      url: "http://localhost:9090/student/" + studentId,
      type: "DELETE",
      success: function (response) {
        showMessage("Data deleted successfully", "green");
        loadStudents();
      },
      error: function (xhr, status, error) {
        showMessage("Error occurred while deleting data", "red");
        console.log(error);
      },
    });
  }
}

function editStudent(student) {
  $("#name").val(student.name);
  $("#email").val(student.email);
  $("#date").val(student.date);
  $("#time").val(student.time);
  $("#password").val(student.password);

  $("#submitButton").unbind("click"); // Remove existing click event handler

  $("#submitButton").click(function () {
    updateStudent(student.id);
  });

  showMessage("Edit Mode", "blue");
}

function viewStudent(student) {
  $("#name").val(student.name);
  $("#email").val(student.email);
  $("#date").val(student.date);
  $("#time").val(student.time);
  $("#password").val(student.password);

  $("#submitButton").hide();

  showMessage("View Mode", "blue");
}

function loadStudents() {
  $.ajax({
    url: "http://localhost:9090/student",
    type: "GET",
    success: function (response) {
      var students = response;
      var tableBody = $("#studentTableBody");
      tableBody.empty();

      for (var i = 0; i < students.length; i++) {
        var student = students[i];

        var row = $("<tr>");
        row.append($("<td>").text(student.id));
        row.append($("<td>").text(student.name));
        row.append($("<td>").text(student.email));
        row.append($("<td>").text(student.date));
        row.append($("<td>").text(student.time));
        row.append($("<td>").text(student.password));

        var actions = $("<td>");
        actions.append(
          $("<button>")
            .text("View")
            .addClass("btn btn-primary btn-sm")
            .click(function () {
              viewStudent(student);
            })
        );
        actions.append(
          $("<button>")
            .text("Edit")
            .addClass("btn btn-info btn-sm")
            .click(function () {
              editStudent(student);
            })
        );
        actions.append(
          $("<button>")
            .text("Delete")
            .addClass("btn btn-danger btn-sm")
            .click(function () {
              deleteStudent(student.id);
            })
        );

        row.append(actions);
        tableBody.append(row);
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
}

$(document).ready(function () {
  loadStudents();
});
*/

//--------------------------------------------------------------------------------------

$(document).ready(function () {
  // Load students on page load
  loadStudents();

  $("#submitButton").click(addStudent);
  function showMessage(message, color) {
    $("#message").text(message).css("color", color);
  }

  /*function createStudent() {
  var student = {
    name: $("#name").val(),
    email: $("#email").val(),
    date: $("#date").val(),
    time: $("#time").val(),
    password: $("#password").val(),
  };

  $.ajax({
    url: "http://localhost:9090/student",
    type: "POST",
    data: JSON.stringify(student),
    contentType: "application/json",
    success: function (response) {
      showMessage("Data saved successfully", "green");
      loadStudents();
    },
    error: function (xhr, status, error) {
      showMessage("Error occurred while saving data", "red");
      console.log(error);
    },
  });
}*/

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
        // window.location.href = "http://127.0.0.1:5500/index/index.html";
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

  function updateStudent(studentId) {
    var student = {
      id: studentId,
      name: $("#name").val(),
      email: $("#email").val(),
      date: $("#date").val(),
      time: $("#time").val(),
      password: $("#password").val(),
    };

    $.ajax({
      url: "http://localhost:9090/student/" + studentId,
      type: "PUT",
      data: JSON.stringify(student),
      contentType: "application/json",
      success: function (response) {
        showMessage("Data updated successfully", "green");
        loadStudents();
      },
      error: function (xhr, status, error) {
        showMessage("Error occurred while updating data", "red");
        console.log(error);
      },
    });
  }

  function deleteStudent(studentId) {
    if (confirm("Are you sure you want to delete this student?")) {
      $.ajax({
        url: "http://localhost:9090/student/" + studentId,
        type: "DELETE",
        success: function (response) {
          showMessage("Data deleted successfully", "green");
          loadStudents();
        },
        error: function (xhr, status, error) {
          showMessage("Error occurred while deleting data", "red");
          console.log(error);
        },
      });
    }
  }

  function editStudent(student) {
    // Hide the table
    $(".table-container").hide();
    $("#editContainer").show();

    // Load the edit page
    $("#editContainer").load("student.html", function () {
      $("#name").val(student.name).attr("readonly", false);
      $("#email").val(student.email).attr("readonly", false);
      $("#dob").val(student.date).attr("readonly", false);
      $("#time").val(student.time).attr("readonly", false);
      $(".password").val(student.password).attr("readonly", false);

      $("#submitButton").unbind("click"); // Remove existing click event handler

      $("#submitButton").click(function () {
        updateStudent(student.id);
      });
    });

    showMessage("Edit Mode", "blue");
  }

  function viewStudent(student) {
    // Hide the table
    $(".table-container").hide();

    $("#editContainer").show();

    // $("#editContainer").addClass("edit").css("display", "block");

    // Load the edit page
    $("#editContainer").load("/studentdata/student.html", function () {
      $("#name").val(student.name).attr("readonly", true);
      $("#email").val(student.email).attr("readonly", true);
      $("#dob").val(student.date).attr("readonly", true);
      $("#time").val(student.time).attr("readonly", true);
      $(".password").val(student.password).attr("readonly", true);

      $("#submitButton").hide();
    });

    showMessage("View Mode", "blue");
  }

  // function loadStudents() {
  //   $.ajax({
  //     url: "http://localhost:9090/student",
  //     type: "GET",
  //     success: function (response) {
  //       var students = response;

  //       var tableBody = $("#studentTable tbody");
  //       tableBody.empty();

  //       for (var i = 0; i < students.length; i++) {
  //         var student = students[i];

  //         var row = $("<tr>");
  //         row.append($("<td>").text(student.id).addClass("id"));
  //         row.append($("<td>").text(student.name).addClass("name"));
  //         row.append($("<td>").text(student.email).addClass("email"));
  //         row.append($("<td>").text(student.date).addClass("date"));
  //         row.append($("<td>").text(student.time).addClass("time"));
  //         row.append($("<td>").text(student.password).addClass("password"));

  //         var actions = $("<td>");
  //         // Edit button
  //         var editButton = $("<button>")
  //           .text("Edit")
  //           .addClass("btn btn-primary btn-sm mx-2")
  //           .click(function () {
  //             var Id = $(this).closest("tr").find(".id").text();
  //             var Name = $(this).closest("tr").find(".name").text();
  //             var Email = $(this).closest("tr").find(".email").text();
  //             var Date = $(this).closest("tr").find(".date").text();
  //             var Time = $(this).closest("tr").find(".time").text();
  //             var Password = $(this).closest("tr").find(".password").text();

  //             var student = {
  //               id: Id,
  //               name: Name,
  //               email: Email,
  //               date: Date,
  //               time: Time,
  //               password: Password,
  //             };

  //             editStudent(student);
  //           });

  //         // View button
  //         var viewButton = $("<button>")
  //           .text("View")
  //           .addClass("btn btn-info btn-sm mx-2")
  //           .click(function () {
  //             var Id = $(this).closest("tr").find(".id").text();
  //             var Name = $(this).closest("tr").find(".name").text();
  //             var Email = $(this).closest("tr").find(".email").text();
  //             var Date = $(this).closest("tr").find(".date").text();
  //             var Time = $(this).closest("tr").find(".time").text();
  //             var Password = $(this).closest("tr").find(".password").text();

  //             var student = {
  //               id: Id,
  //               name: Name,
  //               email: Email,
  //               date: Date,
  //               time: Time,
  //               password: Password,
  //             };

  //             viewStudent(student);
  //           });

  //         // Delete button
  //         var deleteButton = $("<button>")
  //           .text("Delete")
  //           .addClass("btn btn-danger btn-sm mx-2")
  //           .click(function () {
  //             var studentId = $(this).closest("tr").find(".id").text();
  //             deleteStudent(studentId);
  //           });

  //         actions.append(editButton, viewButton, deleteButton);

  //         row.append(actions);

  //         tableBody.append(row);
  //       }
  //     },
  //     error: function (xhr, status, error) {
  //       showMessage("Error occurred while loading data", "red");
  //       console.log(error);
  //     },
  //   });
  // }

  //--------------------------------------------------------------------------------------------------

  // Variables to track pagination
  var currentPage = 1;
  var rowsPerPage = 7;

  // Function to display students for a specific page
  function displayStudents(students) {
    var startIndex = (currentPage - 1) * rowsPerPage;
    var endIndex = startIndex + rowsPerPage;
    var studentsToShow = students.slice(startIndex, endIndex);

    // Clear the table body
    // $("#studentTableBody").empty();

    var tableBody = $("#studentTable tbody");
    tableBody.empty();

    // Loop through the students to display
    for (var i = 0; i < studentsToShow.length; i++) {
      var student = studentsToShow[i];

      var row = $("<tr>");
      row.append($("<td>").text(student.id).addClass("id"));
      row.append($("<td>").text(student.name).addClass("name"));
      row.append($("<td>").text(student.email).addClass("email"));
      row.append($("<td>").text(student.date).addClass("date"));
      row.append($("<td>").text(student.time).addClass("time"));
      row.append($("<td>").text(student.password).addClass("password"));

      var actions = $("<td>");
      // Edit button
      var editButton = $("<button>")
        .text("Edit")
        .addClass("btn btn-primary btn-sm mx-2")
        .click(function () {
          var Id = $(this).closest("tr").find(".id").text();
          var Name = $(this).closest("tr").find(".name").text();
          var Email = $(this).closest("tr").find(".email").text();
          var Date = $(this).closest("tr").find(".date").text();
          var Time = $(this).closest("tr").find(".time").text();
          var Password = $(this).closest("tr").find(".password").text();

          var student = {
            id: Id,
            name: Name,
            email: Email,
            date: Date,
            time: Time,
            password: Password,
          };

          editStudent(student);
        });

      // View button
      var viewButton = $("<button>")
        .text("View")
        .addClass("btn btn-info btn-sm mx-2")
        .click(function () {
          var Id = $(this).closest("tr").find(".id").text();
          var Name = $(this).closest("tr").find(".name").text();
          var Email = $(this).closest("tr").find(".email").text();
          var Date = $(this).closest("tr").find(".date").text();
          var Time = $(this).closest("tr").find(".time").text();
          var Password = $(this).closest("tr").find(".password").text();

          var student = {
            id: Id,
            name: Name,
            email: Email,
            date: Date,
            time: Time,
            password: Password,
          };

          viewStudent(student);
        });

      // Delete button
      var deleteButton = $("<button>")
        .text("Delete")
        .addClass("btn btn-danger btn-sm mx-2")
        .click(function () {
          var studentId = $(this).closest("tr").find(".id").text();
          deleteStudent(studentId);
        });

      actions.append(editButton, viewButton, deleteButton);

      row.append(actions);

      tableBody.append(row);
    }
  }

  // Function to handle next page button click
  $("#nextButton").click(function () {
    currentPage++;
    loadStudents();
  });

  // Function to handle previous page button click
  $("#prevButton").click(function () {
    if (currentPage > 1) {
      currentPage--;
      loadStudents();
    }
  });

  // Function to load student data from the Spring Boot controller
  function loadStudents() {
    $.ajax({
      url: "http://localhost:9090/student",
      type: "GET",
      success: function (response) {
        // var tableBody = $("#studentTable tbody");
        // tableBody.empty();

        var students = response;
        displayStudents(students);
      },
      error: function (xhr, status, error) {
        showMessage("Error occurred while loading data", "red");
        console.log(error);
      },
    });
  }

  // Initial display
  loadStudents();
});
