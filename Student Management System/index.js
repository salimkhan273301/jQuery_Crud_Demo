$(document).ready(function () {
  // Load students on page load
  loadStudents();

  // Submit form to create a new student
  $("#studentForm").submit(function (event) {
    event.preventDefault();

    var student = {
      name: $("#name").val(),
      email: $("#email").val(),
      password: $("#password").val(),
    };

    createStudent(student);
  });

  // Handle delete button click
  $("#studentsTable").on("click", ".delete-btn", function () {
    var studentId = $(this).data("id");
    deleteStudent(studentId);
  });
});

function loadStudents() {
  $.get("http://localhost:9090/student", function (data) {
    var studentsTable = $("#studentsTable tbody");
    studentsTable.empty();

    data.forEach(function (student) {
      var row =
        "<tr>" +
        "<td>" +
        student.id +
        "</td>" +
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
        '<td><button class="delete-btn" data-id="' +
        student.id +
        '">Delete</button></td>' +
        "</tr>";
      studentsTable.append(row);
    });
  });
}

function createStudent(student) {
  $.ajax({
    url: "http://localhost:9090/student",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(student),
    success: function (data) {
      $("#message").text("Data saved successfully.").css("color", "green");
      // Clear form fields
      $("#name").val("");
      $("#email").val("");
      $("#password").val("");

      // Reload students table
      loadStudents();
    },
    error: function () {
      $("#message")
        .text("Error occurred while saving data.")
        .css("color", "red");
    },
  });
}

function deleteStudent(studentId) {
  $.ajax({
    url: "http://localhost:9090/student/" + studentId,
    type: "DELETE",
    success: function () {
      // Reload students table
      loadStudents();
    },
  });
}
