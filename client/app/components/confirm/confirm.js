/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/28
 */

import html from './confirm.html';

let $html = null;
if (!$('#dialog-confirm')[0]) {
  $html = $(html);
  $('body').append($html);
}

let sureCallback, cancelCallback;

$html.find('.btn-primary').click(function () {
  $html.modal('hide');
  if ($.isFunction(sureCallback)) {
    sureCallback();
  }
});

$html.find('.btn-default').click(function () {
  if ($.isFunction(cancelCallback)) {
    cancelCallback();
  }
});

let modal = null;
let confirm = function (content, onSure, onCancel) {
  $html.find('.modal-body').html(content);
  if (modal === null) {
    $html.modal({
      backdrop: false,
      keyboard: true,
      show: true
    });
  } else {
    $html.modal('show');
    console.log('dialog-confirm show....');
  }
  sureCallback = onSure;
  cancelCallback = onCancel;
};

window.confirm = confirm;

export default confirm;
