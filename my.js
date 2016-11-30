var users = [];
var session =0;
var borrowed =[];

//===================START==========FUNCTION TO CREATE NEW USER========================
function signup() {
    var signup_name = document.getElementById('signup_name').value.trim();
    var signup_email = document.getElementById('signup_email').value.trim();
    var signup_password = document.getElementById('signup_password').value.trim();
    if (signup_name == '') {
        shownoti('Please enter name', 'error');
        return;
    }
    else if (signup_email == '') {
        shownoti('Please enter email', 'error');
        return;
    }
    else if (!isValidEmailAddress(signup_email)) {
        shownoti('Enter valid email address', 'error');
        return;
    }
    else if (signup_password == '') {
        shownoti('Please enter password', 'error');
        return;
    }
    else if (signup_password.length < 7) {
        shownoti('Password is too short', 'error');
        return;
    }
    else {
        if (userExists(document.getElementById('signup_email').value) == true) {
            shownoti('This email is already registered', 'error');
            return;
        }
        else {
            users.push({ name: signup_name, email: signup_email, password: signup_password });
            shownoti('User created successfully', 'success');
            document.getElementById('signup_name').value = '';
            document.getElementById('signup_email').value = '';
            document.getElementById('signup_password').value = '';
            showDiv('login');

        }
    }


}
//===================END==========FUNCTION TO CREATE NEW USER========================



//=====================START=======FUNCTION TO LOGIN=====================================
function login() {
    var login_email = document.getElementById('login_email').value.trim();
    var login_password = document.getElementById('login_password').value.trim();
    if (login_email == '') {
        shownoti('Enter email', 'error');
    }
    else if (login_password == '') {
        shownoti('Enter password', 'error');
    }
    else {
        var obj = users.filter(function (obj) {
            return obj.email === login_email && obj.password === login_password;
        })[0];
        if (obj) {
            document.getElementById('books_borrowed').innerHTML ='';
            shownoti('Login successfull', 'success');
            document.getElementById('login_email').value = '';
            document.getElementById('login_password').value = '';
            document.getElementById('profile_name').innerHTML = obj.name;
            document.getElementById('profile_email').innerHTML = obj.email;
            showDiv('profile');
            session =1;
            hideAllBooks('result');

            var obj1 = borrowed.filter(function (obj1) {
                return obj1.email === login_email;
            })[0];
            if (obj1){
                document.getElementById('books_borrowed').innerHTML =document.getElementById('books_borrowed').innerHTML + '<p><span> Title: '+ obj1.title + '</span><span> By: ' + obj1.author + '</span><span> Due Date: ' + obj1.duedate +'</span></p>';
                document.getElementById('books_borrowed').style.display= 'block';
            }

        }
        else {
            shownoti('Login Failed', 'error');
        }
    }
};
//=====================END==========FUNCTION TO LOGIN======================================

//======================START=============FUNCTION LOGOUT==================================
function logout(){
    session=0;
    hideAllBooks('result');
}
//======================END=============FUNCTION LOGOUT==================================


//=====================START============FUNCTION TO BORROW=====================================
function borrow(book){  
   
    var today=new Date();
    var requiredDate=new Date(today.getFullYear(),today.getMonth(),today.getDate()+7)    
    var dueDate= requiredDate.getDate() + '/' + (requiredDate.getMonth() + 1) + '/' +  requiredDate.getFullYear();
    var booktitle = book.getAttribute('alt');
    var obj = books.filter(function (obj) {
        return obj.title === booktitle;
    })[0];
    if (obj)
    {
        if(obj.copies<1){
            shownoti('Sorry all copies are borrowed','error');
        }
        else
        {
            obj.copies = obj.copies - 1;  
            borrowed.push({ name: document.getElementById('profile_name').innerHTML, email: document.getElementById('profile_email').innerHTML, title: booktitle, duedate:dueDate,author: obj.author });
            shownoti('Book borrowed successfully, due date is: ' + dueDate ,'success');
            hideAllBooks('result');
            document.getElementById('books_borrowed').innerHTML =document.getElementById('books_borrowed').innerHTML + '<p><span> Title: '+ booktitle + '</span><span> By: ' + obj.author + '</span><span> Due Date: ' + dueDate +'</span></p>';
            document.getElementById('books_borrowed').style.display= 'block';
        }
    }
}

//=====================END============FUNCTION TO BORROW=====================================



//================START===========FUNCTION TO CREATE NOTIFICATION================================
function shownoti(message, type) {
    document.getElementById('noti_message').innerHTML = message;
    var notification = document.getElementById('notification');
    var noti_icon_error = document.getElementById('noti_icon_error');
    var noti_icon_success = document.getElementById('noti_icon_success');
    if (type == 'error') {
        noti_icon_error.style.display = 'inline';
        noti_icon_success.style.display = 'none';
        try {
            notification.classList.remove('success');
            notification.classList.add('error');
        }
        catch (e) {
        }
    }
    else if (type == 'success') {
        noti_icon_error.style.display = 'none';
        noti_icon_success.style.display = 'inline';
        try {
            notification.classList.remove('error');
            notification.classList.add('success');
        }
        catch (e) {
        }
    }
    else {
    }
    try {
        notification.classList.remove('slideOutUp');
        notification.classList.remove('slideInDown');
    }
    catch (e) {
        
    }
    notification.classList.add('slideInDown');
    notification.style.display = 'block';
    setTimeout(function () {
        notification.classList.add('slideOutUp');
    }, 3000);
}
//================END===========FUNCTION TO CREATE NOTIFICATION================================



//================START===========FUNCTION TO CHECK USER ALREADY EXISTS================================
function userExists(email) {
    return users.some(function (el) {
        return el.email === email;
    });
}
//================END===========FUNCTION TO CHECK USER ALREADY EXISTS================================



//----------------Function to check valid email address----------Start--------------
function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};
//----------------Function to check valid email address----------END--------------



//=========START==========FUNCTION TO SHOW/HIDE DIV======================================
function showDiv(div) {
    document.getElementById('sign_up').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('profile').style.display = 'none';

    document.getElementById(div).style.display = 'block';

    var allInput = document.getElementsByTagName('input');
    for (var i = 0; i < allInput.length; i++) {
        allInput[i].value = '';
    }
}
//===========END========FUNCTION TO SHOW/HIDE DIV======================================
 


//=================START=========================== APP.JS CODE===================================
var books = [
  { author: 'Thomas Pynchon', title: 'Bleeding Edge', genre: 'fiction', copies: 2 },
  { author: 'Haruki Murakami', title: 'Bolo Tara Ra Ra', genre: 'fiction', copies: 2 },
  { author: 'John D MacDonald', title: 'Nightmare in Pink', genre: 'mystery', copies: 1 },
  { author: 'Ncholas Zakas', title: 'Understanding Ecmascript 6', genre: 'javascript', copies: 1 },
  { author: 'Thomas Phillips', title: 'Long Slow Distance', genre: 'fiction', copies: 1 }
]
function authSearch () {
    var aName = document.getElementById('authorSearch').value.toUpperCase()
    var name = books.filter((x) => x.author.toUpperCase().indexOf(aName) !== -1 || x.title.toUpperCase().indexOf(aName) !== -1 || x.genre.toUpperCase().indexOf(aName) !== -1)
    if (name.length > 0) {
        hideAllBooks('result')
        name.forEach((x) => {
            var listItem = document.createElement('li')
            if(session==1){
                listItem.classList.add('borrow');
                listItem.setAttribute('title','Click to borrow');
                listItem.setAttribute('onclick','borrow(this)');
                listItem.setAttribute('alt',x.title);
        }

            let textnode = document.createTextNode(`${x.title} by ${x.author} in ${x.genre} [${x.copies} Copies Available]`)
      listItem.appendChild(textnode)
      document.getElementById('result').appendChild(listItem)
      if(session==1){
          shownoti('Click on searched book to borrow it','success');
      }
})
} else {
    hideAllBooks('result')
    shownoti('Sorry, no books found','error');
}
}
// event listeners
document.getElementById('autSearch').addEventListener('click', authSearch)

function hideAllBooks (id) {
    document.getElementById(id).innerHTML = ''
}
//=================END=========================== APP.JS CODE===================================

