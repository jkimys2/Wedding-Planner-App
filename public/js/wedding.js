// MJS 3.8.24 - wedding.handlebars js code for new/delete/update form. Note api is /api/wedding[NO S]. 
// newFormHandler for either crete or update
const newFormHandler = async (event) => {
  event.preventDefault();
  console.log("Starting wedding2 newFormHandler");

  /* I'm sticking with the exact same names as the model to be safe here. */
  const event_title = document.querySelector('#wedding-name').value.trim();
  const date = document.querySelector('#wedding-date').value.trim();
  const time = document.querySelector('#wedding-time').value.trim();
  // unincluded values accepted, plus_one, food_choice will be null  // now allows null => unknown
  // const user_id = event.target.getAttribute('user-id'); // foreign key, wedding table pts to user table
  if (!event.target.hasAttribute('user-id')) { 
    console.log("Profile new invitee FormHandler. Couldnt find user-id in DOM");
    return; 
  }  
  const user_id = event.target.getAttribute('user-id'); 
  
  if (!event.target.hasAttribute('submit-verb')) { 
    console.log("WEDding2 new form handler. Couldnt find submit-verb (POST or PUT) in wedding hbs file DOM");
    return; 
  }  
  const submitVerb = event.target.getAttribute('submit-verb'); 

  if (!(event_title && date && time)) {
    alert("Event_title, date and time cannot be blank.");
    return;
  }

  console.log("Wedding2 new form handler. CREATING new wedding ", event_title, date, time); 
  let jsonData = {"event_title": event_title, "date": date, "time": time, "user_id":user_id}; 

  /* jsonData = 	{"event_title": "SB", "date": "10-26-1967", "time": "12:00:00", "user_id": 7 }; */
  console.log("The wedding json object is: " + JSON.stringify(jsonData)); 

  let response = null; // be sure to let here and non const below.
  try {
    console.log("CALLing /api/wedding:", submitVerb, ":route .............................");
    // Be sure to trim as result from DOM seems to have spaces. Arggghhh. 
    if (submitVerb.trim().toUpperCase() === 'POST') {
      console.log("Calling POST fetch ....."); 
      // Be sure not to redeclare response, and that it was defined with let above!
      response = await fetch("/api/wedding", {
        method: "POST",  // submit-verb POST 
        // body: JSON.stringify({ event_title, date, time, user_id }),
        body: JSON.stringify(jsonData),
        headers: {'Content-Type': 'application/json',}, // be sure to have both command and opening brackets!!
      });  // end fetch   */
    } else if (submitVerb.trim().toUpperCase() === 'PUT') {

    } else { 
      console.log("Create new wedding: Unexpected submitVerg: ", submitVerb); 
    } // end if-else submitVerb
    console.log("Wedding new form post feteched okay. "); 
    if (response === null) {
      console.log("Create new wedding: response is null");
    }
    else if (response.ok) {
      console.log("/api/wedding POST Response ok, new wedding created ....... "); // shows in console
      alert("New wedding sucessfully created. "); // great to give them a msg as well. 
      document.location.replace('/profile2');
    } else {
      console.log("Couldnt create wedding.");
      alert('FAILED to create wedding ' + event_title);
    }
  } catch (err) {
    console.log("Could not create new wedding. ", response);
  }
};

const delButtonHandler = async (event) => {
    console.log("Profile2 delButtonHandler beginning ... ");
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log("Profile2 delButtonHandler found data-id of ", id);
        const response = await fetch(`/api/weddings/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile2');
        } else {
            alert('Failed to delete project');
        }
    }
};

document
  .querySelector('.new-wedding-form')
  .addEventListener('submit', newFormHandler);

// document
//  .querySelector('.wedding-list')
//  .addEventListener('click', delButtonHandler);
