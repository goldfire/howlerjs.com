var modal = document.querySelector('.modal');
var modalFrame = document.querySelector('.modal-frame');
var modalClose = document.querySelector('.modal-close');
var modalTitle = document.querySelector('.modal-title');

// Get Stargazers count from GitHub.
(function() {
  var counter = document.querySelector('.stargazers');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.github.com/repos/goldfire/howler.js', true);
  xhr.onload = function() {
    var res = xhr.response;
    var count = 0;
    
    try {
      count = JSON.parse(xhr.response).stargazers_count;
    } catch (e) {}

    counter.innerText = (count ? count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '14,000+') + ' stars';
  };
  xhr.onerror = function() {
    counter.innerText = '15,000+ stars';
  };
  xhr.send();
})();

// Setup a basic modal window launcher to display the demos in.
function showDemo(id) {
  // If this is the demo code link, just send them to the repo.
  if (id === 6) {
    window.location = 'https://github.com/goldfire/howler.js/tree/master/examples';
    return;
  }

  // Determine which iframe to load.
  var uri = '/assets/howler.js/examples/';
  if (id === 1) {
    uri += 'player/';
    modalTitle.innerText = 'Music Player';
  } else if (id === 2) {
    uri += 'radio/';
    modalTitle.innerText = 'Live Radio';
  } else if (id === 3) {
    uri += 'sprite/';
    modalTitle.innerText = 'Audio Sprites';
  } else if (id === 4) {
    uri += '3d/';
    modalTitle.innerText = 'Spatial Audio';
  } else if (id === 5) {
    uri = '/assets/howler.js/tests/';
    modalTitle.innerText = 'Basic Functions';
  }

  // Fade in the modal.
  modal.className = 'modal fadein';
  modal.style.display = '-webkit-box';
  modal.style.display = '-webkit-flex';
  modal.style.display = '-ms-flexbox';
  modal.style.display = 'flex';

  // Create the iframe and begin loading the demo.
  var iframe = document.createElement('iframe');
  iframe.src = uri;
  modalFrame.appendChild(iframe);
  iframe.focus();
}

// Setup events on the demo buttons.
(function() {
  var demos = ['player', 'radio', 'sprite', 'spatial', 'basic', 'code'];
  demos.forEach(function(selector, index) {
    var demo = document.querySelector('.' + selector);
    if (demo) {
      demo.addEventListener('click', function() {
        showDemo(index + 1);
      });
    }
  });

  if (modalClose) {
    modalClose.addEventListener('click', function() {
      modal.className = 'modal fadeout';
      setTimeout(function() {
        var iframe = document.querySelector('.modal iframe');
        modal.style.display = 'none';
        iframe.src = 'about:blank';
        modalFrame.removeChild(iframe);

        // Remove the hash from the URL.
        if (window.location.hash && window.location.hash !== '' && window.history && window.history.pushState) {
          window.history.pushState(null, null, '.');
        }
      }, 500);
    });
  }

  // If there is a hash on the window location, send them to that demo.
  var hash = (window.location.hash + '').replace('#', '');
  if (hash && hash.match(/player|radio|sprite|spatial|basic/)) {
    showDemo(demos.indexOf(hash) + 1);
  }
})();