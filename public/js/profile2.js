const newFormHandler = async (event) => {
  event.preventDefault();
  console.log("Starting profile2 - invitee newFormHandler");

  /* I'm sticking with the exact same names as the model to be safe here. */
  const first_name = document.querySelector('#guest-first').value.trim();
  const last_name = document.querySelector('#guest-last').value.trim();
  const email = document.querySelector('#guest-email').value.trim();
  // Unincluded values: accepted, plus_one, food_choice will be null  // model as of 3.7.24 allows null => unknown
  if (!event.target.hasAttribute('wedding-id')) { // must be in submit button. This is target
    console.log("Profile new invitee FormHandler. Couldnt find wedding-id in DOM");
    return; 
  }  
  const wedding_id = event.target.getAttribute('wedding-id'); 
  console.log("Wedding id is ", wedding_id);

  if (first_name && last_name && email) {
    console.log("Invitee form handler. CREATING new GUEST ", first_name, last_name, email); 
    const jsonData = {"first_name": first_name, "last_name": last_name, "email": email};
    jsonData.wedding_id = wedding_id;
    console.log("The guest json object is: " + JSON.stringify(jsonData)); 
    console.log("Calling /api/invitees POST route .............................");
    const response = await fetch("/api/invitees", {
      method: 'POST',
      body: JSON.stringify({ first_name, last_name, email, wedding_id }),
      // body: JSON.stringify(jsonData),
      headers: {'Content-Type': 'application/json',},
    });

    if (response.ok) {
      console.log("/api/invitee POST Response ok, new guest created ....... "); // shows in console
      alert("New invitee sucessfully created. "); // great to give them a msg as well. 
      document.location.replace('/profile2');
    } else {
      alert('FAILED to create guest ' + first_name);
    }
  } else {
    alert("First nane, last name and email cannot be blank.");
  }
};  // newFormHandler - works again 2:24 PM dop

const delButtonHandler = async (event) => {
    console.log("Delete guest ButtonHandler beginning ... ");
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log("Profile delButtonHandler found data-id of ", id);
        const response = await fetch(`/api/invitees/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile2');
        } else {
            alert('Failed to delete guest');
        }
    }
};

document
  .querySelector('.new-guest-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.guest-list')
  .addEventListener('click', delButtonHandler);
