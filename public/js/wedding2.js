// MJS 3.8.24 - wedding.handlebars js code for new/delete/update form. Note api is /api/wedding[NO S]. 
// newFormHandler for either crete or updage
const newFormHandler = async (event) => {
  event.preventDefault();
  console.log("Starting wedding2 newFormHandler");

  /* I'm sticking with the exact same names as the model to be safe here. */
  const event_title = document.querySelector('#wedding-name').value.trim();
  const date = document.querySelector('#wedding-date').value.trim();
  const time = document.querySelector('#wedding-time').value.trim();
  // unincluded values accepted, plus_one, food_choice will be null  // now allows null => unknown
  // const user_id = event.target.getAttribute('user-id'); // foreign key, wedding table pts to user table
  const user_id = 5;
  
  if (event_title && date && time) {
    console.log("Wedding2 form handler. CREATING new wedding ", event_title, date, time); 
    const jsonData = {"event_title": event_title, "date": date, "time": time};
    jsonData.user_id = user_id; 
    console.log("The wedding json object is: " + JSON.stringify(jsonData)); 

    if (!event.target.hasAttribute('submit-type')) {
        console.log("Wedding new Wedding FormHandler. Couldnot find submit-type (POST or PUT) in DOM submit button");
        return; 
    }  
    const submitType = event.target.getAttribute('submit-type'); 
    if (submitType === 'POST') {
        console.log("Calling /api/weddings POST route .............................");
        const response = await fetch("/api/weddings", {
          method: submitType,  // POST 
          body: JSON.stringify({ event_title, date, time, user_id }),
          // body: JSON.stringify(jsonData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    } // end if (submitType is post)


    if (response.ok) {
      console.log("/api/wedding POST Response ok, new wedding created ....... "); // shows in console
      alert("New wedding sucessfully created. "); // great to give them a msg as well. 
      document.location.replace('/profile2');
    } else {
      alert('FAILED to create wedding ' + event_title);
    }
  } else {
    alert("Event_title, date and time cannot be blank.")
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
