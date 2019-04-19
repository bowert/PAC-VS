//Set setPac and setGhost Buttons
document.querySelector('#setPac').onclick = function(e) {
    role = "Pacman";
    document.querySelector('#pac_role').innerHTML = role;
}

document.querySelector('#setGhost').onclick = function() {
    role = "Ghosts";
    document.querySelector('#pac_role').innerHTML = role;
}



var roomName = {{ room_name_json }};
document.onkeydown = keyPress;
var role

var pacSocket = new WebSocket(
    'ws://' + window.location.host +
    '/ws/pac_test/' + roomName + '/');

//What happens when a message from another server comes in
pacSocket.onmessage = function(e) {
    var data = JSON.parse(e.data);
    var message = data['pac_message'];

    if (message == "setPac") {
        role = "setGhost"
        document.querySelector('#pac_role').innerHTML = role
    }
    else if (message == "setGhost") {
        role = "setPac"
        document.querySelector('#pac_role').innerHTML = role
    }

    //document.write("In Message:", message)
    document.querySelector('#pac_position').value = message;
};

pacSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

//document.querySelector('#chat-message-input').focus();

//Submits when enter is pressed
document.querySelector('#pac_position_input').onkeyup = function(e) {
    if (e.keyCode === 13) {  // enter, return
        document.querySelector('#pac_position_input').click();
    }
};

//Key is Pressed
function keyPress(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        sendData(e, "up");
    }
    else if (e.keyCode == '40') {
        // down arrow
        sendData(e, "down");
    }
    else if (e.keyCode == '37') {
        // left arrow
        sendData(e, "left");
    }
    else if (e.keyCode == '39') {
        // right arrow
        sendData(e, "right");
    }
}

//Sends data
document.querySelector('#pac_position_submit').onclick = function(e) {
    var messageInputDom = document.querySelector('#pac_position_input');
    var message = messageInputDom.value;
    //document.write("Out Message:", message)

    //Sends to other person
    pacSocket.send(JSON.stringify({
        'pac_message': message
    }));

    messageInputDom.value = '';
};

//Send Data by Variable
function sendData(e, message) {
    //document.write(message);
    pacSocket.send(JSON.stringify({
        'pac_message': message
    }));        
}