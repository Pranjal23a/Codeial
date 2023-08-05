class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://3.83.91.116:5000');


        if (this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        this.socket.on('connect', () => {
            console.log('Connection Established using Sockets...!!');

            this.socket.emit('join_room', {
                user_Email: this.userEmail,
                chatroom: 'Codeial'
            });
            this.socket.on('user_joined', function (data) {
                console.log('A user joined', data);
            });
        })

        $('#send-message').click(() => {
            let msg = $('#chat-message-input').val();
            if (msg != '') {
                this.socket.emit('send_message', {
                    message: msg,
                    user_Email: this.userEmail,
                    chatroom: 'Codeial'
                });
            }
            $('#chat-message-input').val('');
        })

        this.socket.on('receive_message', (data) => {
            console.log('Message Received', data.message);

            let newMessage = $('<li>');
            let messageType = 'other-message';
            if (data.user_Email == this.userEmail) {
                messageType = 'self-message';
            }
            newMessage.append($('<span>', {
                'html': data.message
            }));
            newMessage.append($('<sub>', {
                'html': data.user_Email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}