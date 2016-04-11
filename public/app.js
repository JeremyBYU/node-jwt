/* global $,var2*/
'use-strict';
$(document).ready(() => {
  $('#submitBtn').click(() => {
    var firstName = $('#firstName').val();
    var password = $('#password').val();
    $.ajax({
      method: 'POST',
      url: "/authenticate",
      data: {
        firstName: firstName,
        password: password,
      }
    })
    .done((msg) => {
      alert("Data Saved: " + JSON.stringify(msg));
      if (msg.success) {
        $('#token').val(msg.token);
      } else {
          $('#token').val('Failed to Authenticate');
      }
    });
  });
});
