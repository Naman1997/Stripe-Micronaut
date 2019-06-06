'use strict';
//const axios = require(['axios']);
var stripe = Stripe('pk_test_TkCBcbENF2NoZrtbWgEoZ9Iw00GmkgzlI2');
var exampleName = 'example3';
var tokenda = '';
//#########################################################################
//
//var webSocket = new WebSocket("ws://" + location.hostname + ":" + location.port + "/charge");
//webSocket.onmessage = function (msg) { updateChat(msg); };
//
////Send a message if it's not empty, then clear the input field
//function sendMessage(message) {
//    if (message !== "") {
//        webSocket.send(message);
//    }
//}
//
////Update the chat-panel, and the list of connected users
//function updateChat(msg) {
//    insert("chat", msg.data);
//}
//
////Helper function for selecting element by id
//function id(id) {
//    return document.getElementById(id);
//}

//#########################################################################

function registerElements(elements, exampleName) {
  var formClass = '.' + exampleName;
  var example = document.querySelector(formClass);

  var form = example.querySelector('form');
  var resetButton = example.querySelector('a.reset');
  var error = form.querySelector('.error');
  var errorMessage = error.querySelector('.message');

  function enableInputs() {
    Array.prototype.forEach.call(
      form.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function(input) {
        input.removeAttribute('disabled');
      }
    );
  }

  function disableInputs() {
    Array.prototype.forEach.call(
      form.querySelectorAll(
        "input[type='text'], input[type='email'], input[type='tel']"
      ),
      function(input) {
        input.setAttribute('disabled', 'true');
      }
    );
  }

  function triggerBrowserValidation() {
    // The only way to trigger HTML5 form validation UI is to fake a user submit
    // event.
    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.style.display = 'none';
    form.appendChild(submit);
    submit.click();
    submit.remove();
  }

  // Listen for errors from each Element, and show error messages in the UI.
  var savedErrors = {};
  elements.forEach(function(element, idx) {
    element.on('change', function(event) {
      if (event.error) {
        error.classList.add('visible');
        savedErrors[idx] = event.error.message;
        errorMessage.innerText = event.error.message;
      } else {
        savedErrors[idx] = null;

        // Loop over the saved errors and find the first one, if any.
        var nextError = Object.keys(savedErrors)
          .sort()
          .reduce(function(maybeFoundError, key) {
            return maybeFoundError || savedErrors[key];
          }, null);

        if (nextError) {
          // Now that they've fixed the current error, show another one.
          errorMessage.innerText = nextError;
        } else {
          // The user fixed the last error; no more errors.
          error.classList.remove('visible');
        }
      }
    });
  });

  // Listen on the form's 'submit' handler...
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Trigger HTML5 validation UI on the form if any of the inputs fail
    // validation.
    var plainInputsValid = true;
    Array.prototype.forEach.call(form.querySelectorAll('input'), function(
      input
    ) {
      if (input.checkValidity && !input.checkValidity()) {
        plainInputsValid = false;
        return;
      }
    });
    if (!plainInputsValid) {
      triggerBrowserValidation();
      return;
    }

    // Show a loading screen...
    example.classList.add('submitting');

    // Disable all inputs.
    disableInputs();

    // Gather additional customer data we may have collected in our form.
    var name = form.querySelector('#' + exampleName + '-name');
    var emailid = form.querySelector('#' + exampleName + '-email');
    var phoneno = form.querySelector('#' + exampleName + '-phone');

    var additionalData = {
      name: name ? name.value : undefined,
      email: String(emailid.value),
      //phone: phoneno.value,
    };

    // Use Stripe.js to create a token. We only need to pass in one Element
    // from the Element group in order to create a token. We can also pass
    // in the additional customer data we collected in our form.
    stripe.createToken(elements[0], additionalData).then(function(result) {
      // Stop loading!
      example.classList.remove('submitting');

      if (result.token) {
        // If we received a token, show the token ID.
        example.querySelector('.token').innerText = result.token.id;
        example.classList.add('submitted');
//#################################################################
//        sendMessage(result.token.id);
          stripeTokenHandler(result.token);
//          tokenda = result.token;
//#################################################################

      } else {
        // Otherwise, un-disable inputs.
        enableInputs();
      }
    });
  });

  resetButton.addEventListener('click', function(e) {
    e.preventDefault();
    // Resetting the form (instead of setting the value to `''` for each input)
    // helps us clear webkit autofill styles.
    form.reset();

    // Clear each Element.
    elements.forEach(function(element) {
      element.clear();
    });

    // Reset error state as well.
    error.classList.remove('visible');

    // Resetting the form does not un-disable inputs, so we need to do it separately:
    enableInputs();
    example.classList.remove('submitted');
  });

  function stripeTokenHandler(token){
    axios.post('/charges', {
            tokendata: token.id
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
  }
//  function stripeTokenHandler(token) {
//    // Insert the token ID into the form so it gets submitted to the server
//    var form = document.getElementById('payment-form');
//    var hiddenInput = document.createElement('input');
//    hiddenInput.setAttribute('type', 'hidden');
//    hiddenInput.setAttribute('name', 'stripeToken');
//    hiddenInput.setAttribute('value', token.id);
//    console.log(token.id);
//    form.appendChild(hiddenInput);
//
//    // Submit the form
//    form.submit();
//    token.id='';
//  }
//
//  function stripeTokenHandler(token) {
//
//    );
}