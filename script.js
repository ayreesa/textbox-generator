function saveAsImage() {
  const outputDiv = document.getElementById('output'); // The textbox container

  html2canvas(outputDiv).then((canvas) => {
    // Convert the canvas to an image
    const image = canvas.toDataURL('image/png');

    // Create a link element
    const link = document.createElement('a');
    link.href = image;
    link.download = 'gd_textbox.png'; // Filename for the image

    // Trigger the download
    link.click();
  });
}
function generateTextbox() {
  // Get the input text
  const inputText = document.getElementById('gd-text').value;

  // Get the selected icon
  const selectedIcon = document.getElementById('icon-select').value;

  // Reference the output div
  const outputDiv = document.getElementById('output');

  // Clear previous content
  outputDiv.innerHTML = '';

  // Create a new textbox
  const textbox = document.createElement('div');
  textbox.className = 'gd-textbox';
  textbox.textContent = inputText;

  // Create an image for the icon
  const icon = document.createElement('img');
  icon.className = 'gd-icon';
  icon.src = `icons/${selectedIcon}.png`; // Icons should be in a folder named "icons"
  icon.alt = selectedIcon;

  // Append the icon and textbox to the output div
  outputDiv.appendChild(icon);
  outputDiv.appendChild(textbox);
}
function generateTextbox() {
  // Get the input text
  const inputText = document.getElementById('gd-text').value;

  // Get the selected icon from the dropdown
  const selectedIcon = document.getElementById('icon-select').value;

  // Get the uploaded file
  const iconUpload = document.getElementById('icon-upload').files[0];

  // Reference the output div
  const outputDiv = document.getElementById('output');

  // Clear previous content
  outputDiv.innerHTML = '';

  // Create a new textbox
  const textbox = document.createElement('div');
  textbox.className = 'gd-textbox';
  textbox.textContent = inputText;

  // Create an image for the icon
  const icon = document.createElement('img');
  icon.className = 'gd-icon';

  if (iconUpload) {
    // Use uploaded file
    const reader = new FileReader();
    reader.onload = function (event) {
      icon.src = event.target.result; // Set the uploaded image as the source
      outputDiv.appendChild(icon);
      outputDiv.appendChild(textbox);
    };
    reader.readAsDataURL(iconUpload);
  } else {
    // Use the selected dropdown icon
    icon.src = `icons/${selectedIcon}.png`; // Path to predefined icons
    icon.alt = selectedIcon;

    // Append the icon and textbox
    outputDiv.appendChild(icon);
    outputDiv.appendChild(textbox);
  }
}
function shareToTwitter() {
  const tweetText = encodeURIComponent("Check out my Geometry Dash Textbox creation!");
  const url = encodeURIComponent(window.location.href); // Use current page URL
  const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${url}`;
  window.open(twitterUrl, '_blank');
}
function shareToFacebook() {
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
  window.open(fbUrl, '_blank');
}
function shareWithWebAPI() {
  const shareData = {
    title: 'My GD Textbox Creation',
    text: 'Check out my Geometry Dash Textbox creation!',
    url: window.location.href,
  };

  if (navigator.share) {
    navigator.share(shareData).then(() => {
      alert('Shared successfully!');
    }).catch((err) => {
      console.error('Sharing failed:', err);
    });
  } else {
    alert('Web Share API not supported in this browser.');
  }
}
let undoStack = [];
let redoStack = [];
function saveCurrentState() {
  const outputDiv = document.getElementById('output');
  undoStack.push(outputDiv.innerHTML); // Save the current HTML
  redoStack = []; // Clear the redo stack after a new action
}

function generateTextbox() {
  // Save the current state before making changes
  saveCurrentState();

  // Get the input text
  const inputText = document.getElementById('gd-text').value;

  // Get the selected icon
  const selectedIcon = document.getElementById('icon-select').value;

  // Get the uploaded file
  const iconUpload = document.getElementById('icon-upload').files[0];

  // Reference the output div
  const outputDiv = document.getElementById('output');

  // Clear previous content
  outputDiv.innerHTML = '';

  // Create a new textbox
  const textbox = document.createElement('div');
  textbox.className = 'gd-textbox';
  textbox.textContent = inputText;

  // Create an image for the icon
  const icon = document.createElement('img');
  icon.className = 'gd-icon';

  if (iconUpload) {
    const reader = new FileReader();
    reader.onload = function (event) {
      icon.src = event.target.result;
      outputDiv.appendChild(icon);
      outputDiv.appendChild(textbox);
    };
    reader.readAsDataURL(iconUpload);
  } else {
    icon.src = `icons/${selectedIcon}.png`;
    icon.alt = selectedIcon;

    // Append the icon and textbox
    outputDiv.appendChild(icon);
    outputDiv.appendChild(textbox);
  }
}
function undo() {
  if (undoStack.length > 0) {
    const outputDiv = document.getElementById('output');
    redoStack.push(outputDiv.innerHTML); // Save current state to redoStack
    const previousState = undoStack.pop(); // Restore the last state
    outputDiv.innerHTML = previousState;
  } else {
    alert("Nothing to undo!");
  }
}

function redo() {
  if (redoStack.length > 0) {
    const outputDiv = document.getElementById('output');
    undoStack.push(outputDiv.innerHTML); // Save current state to undoStack
    const nextState = redoStack.pop(); // Restore the next state
    outputDiv.innerHTML = nextState;
  } else {
    alert("Nothing to redo!");
  }
}
