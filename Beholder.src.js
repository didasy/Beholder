(function( $ ) {
  $.fn.Beholder = function(buttonElement) {
  /*arguments default to:
      
    buttonElement = {
      el : 'div',
      className : 'BeholderButton',
      html : '+'
    }

  */
    
    var obsEl = this,
        butEl,
        modalEl,
        imgEl,
        imgLinkEl,
        closerEl,
        viewButton = [];
    
    
    buttonElement = buttonElement || { el : 'div', className : 'beholderButton', html : '+' };
    
     //now generate button element from buttonElement argument object
    butEl = document.createElement(buttonElement.el);
    butEl.className = buttonElement.className;
    butEl.insertAdjacentHTML('beforeend', buttonElement.html);

    $(document).on('finishedObserved', function() {

      //We then set the onclick event listener on the buttons to call modalbox
      $('.' + buttonElement.className).on('click', function(e) {
        
        //call the modal box if the button got clicked

        //let's create the modal box
        modalEl = document.createElement('div');
        modalEl.className = 'beholderModalBox';

        //and create the image
        imgEl = document.createElement('img');
        //take the src from data-url
        imgEl.src = this.getAttribute('data-url');
        //now append the image to modalEl the modal box
        modalEl.appendChild(imgEl);
        //setting done

        //create the a for image link
        imgLinkEl = document.createElement('a');
        imgLinkEl.setAttribute('href', this.getAttribute('data-url'));
        //put some text
        imgLinkEl.textContent = 'Click here for the original source!';
        //append it into the modal box
        modalEl.appendChild(imgLinkEl);

        imgEl.onload = function() {

          var prefWindowWidth = $(window).width() - 120,
              prefWindowHeight = $(window).height() - 120,
              trueWindowWidth = $(window).width(),
              trueWindowHeight = $(window).height();

          if(imgEl.width >= trueWindowWidth) {
            imgEl.style.width = prefWindowWidth + 'px';
            imgEl.style.height = 'auto'
          }

          if(imgEl.height >= trueWindowHeight) {
            imgEl.style.height = prefWindowHeight + 'px';
            imgEl.style.width = 'auto';
          }

        };

        $('body').append(modalEl).css('display', 'none').fadeIn(300, 'linear', function() {

          //now if the image is larger than the width and height of the window, resize it
          

          $(modalEl).on('click', function() {
            $(modalEl).fadeOut(300, 'linear');
            $(modalEl).remove();
          });

        });
        
      });
      
    });

    var len = obsEl.find('a').length,
        checkURLArr = [],
        matcher;
    
    //don't forget to get all the links on the obsEl to linksArr
    obsEl.find('a').each(function(i, el) {

      //now we reject the non image by checking the url's tail
      checkURLArr = el.getAttribute('href').split('.');
      matcher = checkURLArr.pop();

      if(matcher === 'png' || matcher === 'jpg' || matcher === 'jpeg' || matcher === 'gif') {

        //apply the data-url attr to each button
        //but first, we must clone the button
        viewButton[i-1] = butEl.cloneNode(true);
        //now set the data-url
        viewButton[i-1].setAttribute( 'data-url', el.getAttribute('href') );
        //nice, now put the button just next to it's respective a element
        //$(el).after(viewButton[i]);
        el.insertAdjacentHTML('afterend', viewButton[i-1].outerHTML);

      }
      //this is lame, I know. If you got better method, just fork it and send me a pull request
      
      

      
      //then trigger an event, so the buttons will be listened on click
      if(i == len - 1) {
        $(document).trigger('finishedObserved');
      }
      
    });
    
    return this;

  };
})( jQuery );