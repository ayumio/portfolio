$(function() {

  $('#contactForm input,#contactForm textarea').jqBootstrapValidation({
    preventSubmit: true,
    submitError: function() {
      // additional error messages or events
    },
    submitSuccess: $('#contactForm').submit(function(event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $('input#name').val()
      var email = $('input#email').val()
      var message = $('input#message').val()
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ')
      }
      // if (name && email && message) {
        var $this = $('#sendMessageButton')
        var $form = $(this)
        $this.prop('disabled', true)
        $.post($form.attr('action'), $form.serialize()).then(function(){
          $('#success').html("<div class='alert alert-success'>")
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append('</button>')
          $('#success > .alert-success')
            .append($('<strong>').text('Thank you, ' + firstName + '!<br>Your message has been sent.'))
          $('#success > .alert-success')
            .append('</div>')
          //clear all fields
          $('#contactForm').trigger('reset')
        })
        .then(setTimeout(function() {
          $this.prop('disabled', false) // Re-enable submit button when AJAX call is complete
        }), 1000)
        .then(function() {
          return $(this).is(':visible')
        })
      // }
    })
  })
  $('a[data-toggle="tab"]').click(function(e) {
    e.preventDefault()
    $(this).tab('show')
  })
})

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('')
})
