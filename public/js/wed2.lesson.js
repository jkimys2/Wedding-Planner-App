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
  let jsonData = {"event_title": event_title, "date": date, "time": time};
  jsonData.user_id = user_id; 

  jsonData = 	{ 
    "event_title": "SB",
    "date": "10-26-1967",
    "time": "12:00:00", 
    "user_id": 4, 
    "username": "Bob", 
    "password": "ffffjjj", 
    "first_name": "Us9",
    "last_name": "WedID1",
    "email": "us9@g.com",
    "plus_one": false,
    "accepted": false, 
    "food_choice": null
    }; 
  console.log("The wedding json object is: " + JSON.stringify(jsonData)); 

  const response = null; 
  try {
    console.log("Calling /api/wedding ", submitVerb, " route .............................");
    // if (submitType === 'POST') {
    // It seems that the const is 100% MANDATORY in the following line. Cant be decleared above. INCREDIBLY poor. 
    /* const response = await fetch("/api/wedding", {
      method: 'POST',
      // body: JSON.stringify({ first_name, last_name, email, wedding_id }),
      body: JSON.stringify(jsonData),
      headers: {'Content-Type': 'application/json',},
    }); */

    const response = await fetch("/api/wedding", {
          method: "POST",  // submit-verb POST 
          // body: JSON.stringify({ event_title, date, time, user_id }),
          body: JSON.stringify(jsonData),
          headers: {'Content-Type': 'application/json',}, // be sure to have both command and opening brackets!!
        });  // end if (submitType is post), 
    // }  */
    console.log("Wedding new form post feteched okay. "); 

    if (response.ok) {
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
