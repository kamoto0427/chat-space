$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = 
        `<div class="main-chat__message-lists__box">
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
        `<div class="main-chat__message-lists__box">
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
    });
  });
});