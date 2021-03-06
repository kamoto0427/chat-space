$(function(){
 
  function buildHTML(message){
    if (message.image) {
      var html = 
        `<div class="message" data-message-id=${message.id}>
          <div class="main-chat__message-lists__box">
              <div class="main-chat__message-lists__box__name-date">
                <div class="main-chat__message-lists__box__name-date__name">
                  ${message.user_name}
                </div>
                <div class="main-chat__message-lists__box__name-date__date">
                  ${message.created_at}
                </div>
              </div>
              <div class="main-chat__message-lists__box__text">
                <p class="main-chat__message-lists__box__text__content">
                  ${message.content}
                </p>
              </div>
              <img src=${message.image}>
            </div>
          </div>`
      return html;
    } else {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="main-chat__message-lists__box">
              <div class="main-chat__message-lists__box__name-date">
                <div class="main-chat__message-lists__box__name-date__name">
                  ${message.user_name}
                </div>
                <div class="main-chat__message-lists__box__name-date__date">
                  ${message.created_at}
                </div>
              </div>
              <div class="main-chat__message-lists__box__text">
                <p class="main-chat__message-lists__box__text__content">
                  ${message.content}
                </p>
              </div>
            </div>
          </div>`
      return html
    };
  }

  $('#new_message').on('submit', function(e) {
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
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-lists').append(html);
      $('.main-chat__message-lists').animate({ scrollTop: $('.main-chat__message-lists')[0].scrollHeight});
      $('.new_message')[0].reset();
      $('.send-btn').prop('disabled', false)
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.send-btn').prop('disabled', false)
    });
  });
    var reloadMessages = function() {
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataTyape: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.main-chat__message-lists').append(insertHTML);
          $('.main-chat__message-lists').animate({ scrollTop: $('.main-chat__message-lists')[0].scrollHeight});
        }
      })
        .fail(function() {
          alert('error');
        });
      };
      if (document.location.href.match(/\/groups\/\d+\/messages/)) {
        setInterval(reloadMessages, 7000);
      }
  });
