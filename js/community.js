function submitPost() {
    var postContent = document.getElementById('postContent').value;
    if (postContent.trim() !== '') {
        var postList = document.getElementById('postList');
        var postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = '<p>' + postContent + '</p>';
        postList.appendChild(postDiv);
        document.getElementById('postContent').value = '';
    }
}
