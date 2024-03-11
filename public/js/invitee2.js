// MJS 3.9.24 - Invitee editing screen.  Update and deletes guests. 
// Currently selected guest on left. List of guests on rights. 

// MSJ 3.9.24 - Modify (or Create?) button - a guest. 
const modFormHandler = async (event) => {
  event.preventDefault();
  console.log("Starting modify invitee modFormHandler");
  console.log("Starting modify invitee modFormHandler");
  console.log("Starting modify invitee newFormHandler");
  console.log("Starting modify invitee newFormHandler");
  console.log("Starting modify invitee newFormHandler");
  console.log("Starting modify invitee modFormHandler");
  return;

  /* I'm sticking with the exact same names as the model to be safe here. */
  const first_name = document.querySelector('#invitee-name').value.trim();
  const last_name = document.querySelector('#invitee-last').value.trim();
  const email = document.querySelector('#invitee-email').value.trim();
  const accepted = document.querySelector('#invitee-accepted').value.trim();
  const plus_one = document.querySelector('#invitee-plus_one').value.trim();
  const food_choice = document.querySelector('#invitee-menu').value.trim();
  // Un-included values: accepted, plus_one, food_choice will be null  // model as of 3.7.24 allows null => unknown
  if (!event.target.hasAttribute('wedding-id')) { // must be in submit button. This is target
    console.log("Profile new invitee FormHandler. Couldnt find wedding-id in DOM");
    return; 
  }  
  const wedding_id = event.target.getAttribute('wedding-id'); 
  if (!event.target.hasAttribute('user-id')) { 
    console.log("Profile new invitee FormHandler. Couldnt find wedding-id in DOM");
    return; 
  }  
  const user_id = event.target.getAttribute('user-id'); 
  if (!event.target.hasAttribute('invitee-id')) { 
    console.log("Profile new invitee FormHandler. Couldnt find invitee-id in DOM");
    return; 
  }  
  const invitee_id = event.target.getAttribute('invitee-id');  
  // if (!event.target.hasAttribute('submit-verb')) { 
  //  console.log("Invitee2 new form handler. Couldnt find submit-verb (POST or PUT) in wedding hbs file DOM");
  //  return; 
  // }  
  const submitVerb = "PUT"; // event.target.getAttribute('submit-verb'); 

  if (!(first_name && last_name && email)) {
    console.log("Create Modify invitee: ", submitVerb, "Blank Field: Name ", first_name, last_name, " email ", email );
    alert("First name, last name and email cannot be blank.");
    return;
  }

    console.log("Invitee form handler. Modifying Guest ", first_name, " ", last_name, " email ", email); 
    let jsonData = {"first_name": first_name, "last_name": last_name, "email": email, "accepted": accepted};
    jsonData.plus_one = plus_one;
    jsonData.food_choice = food_choice;
    jsonData.wedding_id = wedding_id;  // must include fk
    console.log("The guest json object is: " + JSON.stringify(jsonData)); 
    console.log("Calling /api/invitees ", submitVerb, " route .............................");
    const response = await fetch("/api/invitees/" + invitee_id, {
      method: 'PUT',
      // body: JSON.stringify({ first_name, last_name, email, wedding_id }),
      body: JSON.stringify(jsonData),
      headers: {'Content-Type': 'application/json',},
    });

    if (response.ok) {
      console.log("/api/invitee PUT Response ok, guest ....... "); // shows in console
      alert("New invitee sucessfully created. "); // great to give them a msg as well. 
      document.location.replace('/profile2');
    } else {
      alert('FAILED to create guest ' + first_name);
    }
}; // end modFormHandler

const delButtonHandler = async (event) => {
    console.log("Profile2 delete guest ButtonHandler beginning ... ");
    if (event.target.hasAttribute('delete-id')) {
        const id = event.target.getAttribute('delete-id');
        console.log("Profile2 delete guest ButtonHandler found delete-id of ", id);
        const response = await fetch(`/api/invitees/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log("Delete sucessfull");
            document.location.replace('/profile2');
        } else {
            alert('Failed to delete guest');
        }
    // also edit button -> go to invitee/id screen
    } else if (event.target.hasAttribute('edit-id')) {
      const id = event.target.getAttribute('edit-id');
      const newRoute = '/invitee2/' + id;
      console.log("Profile2 delete-edit guest ButtonHandler found edit-id of ", id);
      console.log("Profile2 relocating to ", newRoute);
      document.location.replace(newRoute); 
  } else {
    console.log("Warning; Profile2 button pushed but no data-id or edit-id attribute .... ");
  }
}; // end del (edit) buttonHandler

/* const modForm = document.querySelector('.mod-invitee-form');
if (!modForm) {
  console.log("Could ot get querySelecotr(.mod-invitee-form');
} else {
  console.log ("Got querySelector(mod-invitee-form) ");
} */

document
  .querySelector('.mod-invitee-form')
  .addEventListener('submit', modFormHandler);

document
  .querySelector('.invitee-list')
  .addEventListener('click', delButtonHandler);
