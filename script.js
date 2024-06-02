var myGame = new WizardOrpheus('', `
You are an employee at the Capybara Cafe, a place rumored to use capybaras in its beverages. While the public face of the cafe is that of a charming spot offering coffee and tea, there are secrets about the ingredients used that must be kept from prying eyes, especially investigators who might disguise themselves as customers to unearth the truth.
`);

// Create a user action for sending messages
myGame.createUserAction({
  name: 'message',
  parameters: ['Message from user to game'],
  howBotShouldHandle: 'Respond to the user'
});

// Event listener for input field to handle 'Enter' key press
document.getElementById('input').addEventListener('keyup', function(e) {
  if (e.code === 'Enter') { // if the user presses enter
    let userInput = document.getElementById('input').value;
    myGame.message(userInput);

    // Append user input to the conversation
    document.getElementById('conversation').innerHTML += '<p>' + userInput + '</p>';

    // Clear the input field
    document.getElementById('input').value = '';
  }
});

// Define game variables
myGame.variable('score', 'Current score. Changes (positive and negatively) as the user does things.', 0);
myGame.variable('scaredLevel', 'How scared the user is. This changes quickly. From 0 (not scared) to 50 (very scared).', 0);

// Bot action to respond to user messages and update score and scaredLevel
myGame.botAction('respond', 'Send a text response to the user', { message: 'What you want to say to the user' }, data => {
  // Add the bot's response to the conversation
  document.getElementById('conversation').innerHTML += '<p>' + data.message + '</p>';

  // Update the score display
  if (data.currentVariables && data.currentVariables.score) {
    document.getElementById('score').innerHTML = data.currentVariables.score.value;
  }

  // Update the background color based on scaredLevel
  if (data.currentVariables && data.currentVariables.scaredLevel) {
    document.body.style.backgroundColor = `rgba(0, 0, 0, ${data.currentVariables.scaredLevel.value / 50})`;
  }
});
