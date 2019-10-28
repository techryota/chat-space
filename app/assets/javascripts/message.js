$(function(){


  function buildMessage(message){
    var html =`<div class="message">
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.name}
                  </div>
                  <div class="upper-message__date">
                    ${message.data}
                  </div>
                </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                  <img src="${message.image}">
                </div>
               </div>`
    return html;
  }

  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('#message_content')[0].reset();
      $(".form__submit").removeAttr("disabled");
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
    })
    .fail(function(){
      alert('エラー');
    })
    
  })
});