const config = {
    apiKey: "AIzaSyB-oV124RJktJyRryhCbZQmgdc7Bf2n_CI",
    authDomain: "fun-stuff-8c913.firebaseapp.com",
    databaseURL: "https://fun-stuff-8c913.firebaseio.com",
    storageBucket: "fun-stuff-8c913.appspot.com",
};

firebase.initializeApp(config);

const db = firebase.database();

const commentsRef = db.ref('/comments')

const newComments = data => {
    const newCommentKey = firebase.database().ref().child('comments').push().key;
    const updates = {};

    updates['/comments/' + newCommentKey] = data;

    return firebase.database().ref().update(updates);
}

commentsRef.on('value', snapshot => {
    const commentUpdate = snapshot.val()
    for (const property in commentUpdate) {
        $('#people-comments').append(`<h2>${commentUpdate[property].name}</h2>`)
        $('#people-comments').append(`<p id="comment">${commentUpdate[property].comment}</p>`)
    }
})

$('#welcome').on('click', () => {
    $('h1').css('color', '#' + Math.floor(Math.random() * 16777215).toString(16))
})

$('#submit-button').on('click', (event) => {
    event.preventDefault();

    const data = {
        name: event.target.form.elements[0].value,
        comment: event.target.form.elements[1].value
    }

    newComments(data)
    $('#text-area').val('')
})
