$(function(){


  function buildMessageHTML(message) {
    var image = (message.image.url) ? `<img src=${message.image.url} class= "lower-message__image" >` : "";
    var html = `<div class="message" data-id="${message.id}"> 
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="lower-meesage">
            <p class="lower-message__content">
              ${message.content}
            </p>
            ${image}
          </div>
        </div>`
    return html;
  };

  
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
      var html = buildMessageHTML(message);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $(".form__submit").removeAttr("disabled");
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
    })
    .fail(function(){
      alert('エラー');
    })
  })

  
  function reloadMessages() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message').last().data("id");
      
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: { id: last_message_id }
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {  
          insertHTML = buildMessageHTML(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
      })
      .fail(function () {
        alert('エラー');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});