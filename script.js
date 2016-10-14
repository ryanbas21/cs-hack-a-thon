function searchByUserName(username) {
    const self = this;
    const userData = {};
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: "https://api.github.com/users/" + username,
        headers: {
            "Authorization": "token " <---insert token key here
        }
    }).success((data) => {
        console.log(data);
        userData.username = data.login;
        userData.name = data.name;
        userData.followers = data.followers;
        userData.public_repos = data.public_repos;
        userData.repos_url = data.repos_url;
        userData.url = data.url;
        return renderData(userData)
    });
}
function renderData(obj) {
    $('.results').empty();
    let url = 'http://www.github.com/' + obj['username'];
    let repos = url + '?tab=repositories';
    $('.results').append(`<div>Name: ${obj['name']} </div>`);
    $('.results').append(`<div>Followers: ${obj['followers']} </div>`);
    $('.results').append(`<div>Number Of Public Repos: ${obj['public_repos']} </div>`);
    $('.results').append(`<div><a target='_self' href="${url}">GitHub URL</a></div>`);
    $('.results').append(`<div><a target='_self' href="${repos}">Repo Link</a></div>`);
}

function checkSelected() {
    console.log('test');
    const value = document.getElementById("input").value
    if (document.getElementById('username').selected) {
        return searchByUserName(value)
    }
}
$(document).ready(function() {
    $('body').on('click', 'a', function() {
        chrome.tabs.create({url: $(this).attr('href')});
        return false;
    });
});
document.getElementById('input').addEventListener('keypress', function(e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        checkSelected();
    }
});
