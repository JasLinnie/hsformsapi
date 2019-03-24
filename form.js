var getCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hubspotutk\s*\=\s*([^;]*).*$)|^.*$/, "$1");

function formv3(){
    // Create the new request
    var xhr = new XMLHttpRequest();
    var url = 'https://api.hsforms.com/submissions/v3/integration/submit/3787161/b7a1efb4-9ca1-4694-b1ea-08ffede9fb35'

    // Example request JSON:
    var data = {
    //  "submittedAt": "1517927174000",
      "fields": [
        {
          "name": "email",
          "value": document.getElementById("email").value
        },
        {
          "name": "firstname",
          "value": document.getElementById("firstname").value
        }
      ],
      "context": {
        "hutk": getCookie, // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
        "pageUri": "www.example.com/page",
        "pageName": "Example page"
      }
    }

    var final_data = JSON.stringify(data)

    xhr.open('POST', url);
    // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText); // Returns a 200 response if the submission is successful.
        } else if (xhr.readyState == 4 && xhr.status == 400){
            alert(xhr.responseText); // Returns a 400 error the submission is rejected.
        } else if (xhr.readyState == 4 && xhr.status == 403){
            alert(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.
        } else if (xhr.readyState == 4 && xhr.status == 404){
            alert(xhr.responseText); //Returns a 404 error if the formGuid isn't found
        }
       }


    // Sends the request

    xhr.send(final_data);
    setTimeout(function() {
      document.getElementById('myform').submit();
    }, 3000);

 }
