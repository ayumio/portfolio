// $('#contactForm input, #contactForm textarea').submit(function(event) {
//   event.preventDefault()

//   var $form = $(this)
//   $.post($form.attr('action'), $form.serialize()).then(function() {
//     $('#success').html("<div class='alert alert-success'>")
//     $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
//       .append('</button>')
//     $('#success > .alert-success')
//       .append('<strong>Thank you! Your message has been sent.</strong>')
//     $('#success > .alert-success')
//       .append('</div>')
//     //clear all fields
//     $('#contactForm').trigger('reset');
//   })
// })


$(function() {

  $('#contactForm input,#contactForm textarea').jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: $('#contactForm').submit(function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $('input#name').val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ')
      }
      $this = $('#sendMessageButton')
      $this.prop('disabled', true)
      $form = $(this)
      $.post($form.attr('action'), $form.serialize()).then(function(){
        $('#success').html("<div class='alert alert-success'>")
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append('</button>')
        $('#success > .alert-success')
          .append('<strong>Your message has been sent. </strong>')
        $('#success > .alert-success')
          .append('</div>')
        //clear all fields
        $('#contactForm').trigger('reset')
      }).then(setTimeout(function() {
        $this.prop('disabled', false) // Re-enable submit button when AJAX call is complete
      }), 1000)
    })
  })
  .then(function() {
      return $(this).is(':visible')
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
