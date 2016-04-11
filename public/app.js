/* global $,io*/
'use-strict';
var socket = undefined;
$(document).ready(() => {
  $('#submitBtn').click((e) => {
    e.preventDefault();
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
      if (msg.success) {
        $('#token').val(msg.token);
      } else {
          $('#token').val('Failed to Authenticate');
      }
    });
  });

  $('#startSocket').click((e) => {
    e.preventDefault();
    beginSocketConnection($('#token').val());
  });
  $('#startAPI').click((e) => {
    e.preventDefault();
    beginAPIRequest($('#token').val());
  });

  $('#socketBtn').click((e) => {
    e.preventDefault();
    var message = $('#message').val();
    if (socket) {
      console.log('trying to send message');
      socket.emit('message', message);
    } else {
      alert('No socket Connection');
    }
  });
});

function beginSocketConnection(token) {
  socket = io.connect('http://localhost:8080');
  socket.on('connect', () => {
    socket.on('authenticated', () => {
      $('#message').val('Im authenticated using jwt for socket io!. You can now type things in here and broadcast messages!!');
      console.log('authentiacted!');
    })
    socket.on('unauthorized', function (error) {
      if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
        $('#message').val('Bad Authentication for Socket IO! Wrong Token?');
        console.log("Bad Authentication for Socket IO! Wrong Token?");
      }
    })
    .emit('authenticate', { token: token }); //send the jwt
    console.log('Trying to authenticate...');
  });
}
function beginAPIRequest(token) {
  $.ajax({
    method: 'GET',
    url: '/api/',
    headers: {
      authorization: 'Bearer ' + token,
    },
  })
  .done((msg) => {
    if (msg.success) {
      $('#message').val(msg.message);
    } else {
        $('#token').val('Failed to Authenticate');
    }
  });
}
