const newFormHandler = async (event) => {
  event.preventDefault();

  /* I'm sticking with the exact same names as the model to be safe here. */
  const first_name = document.querySelector('#invitee-name').value.trim();
  const last_name = document.querySelector('#invitee-last').value.trim();
  const email = document.querySelector('#invitee-email').value.trim();
  const plus_one = true; 
  const accepted = false;
  const food_choice = "Steak";  // should allow null => unknown

  if (first_name && last_name && email) {
    console.log("Creating user ", first_name, last_name, email, food_choice); 
    const response = await fetch(`/api/invitees`, {
      method: 'POST',
      body: JSON.stringify({first_name, last_name, email, plus_one, accepted, food_choice }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile2');
    } else {
      alert('Failed to create invitee2');
    }
  }
};

const delButtonHandler = async (event) => {
    console.log("Profile2 delButtonHandler beginning ... ");
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log("Profile2 delButtonHandler found data-id of ", id);
        const response = await fetch(`/api/invitees/${id}`, {
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
  .querySelector('.new-invitee-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.invitee-list')
  .addEventListener('click', delButtonHandler);
