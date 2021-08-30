/**
 * @file
 * @auth jinguangguo
 * @date 2016/10/18
 */

import './toast.less';

const TIME_HIDE = 2000;

class Toast {

    constructor(options) {
        this.options = options;
        this.initDom();
        this.initEvents();
        this.hidden = true;
    }

    show() {
        this.hidden = false;
        this.main.removeClass('hide').addClass('show');
    }

    hide() {
        this.hidden = true;
        this.main.addClass('hide').removeClass('show');
    }

    html(text) {
        this.main.html(text);
    }

    initDom() {

        var me = this;
        var main = $(''
            + '<div class="toast">'
            + '</div>'
        );

        main.addClass('toast-' + me.options.skin);

        $(document.body).append(main);

        me.main = main;

    }

    setSkin(skin) {
        this.main.addClass('toast-' + skin);
    }

    initEvents() {

    }
}

let _toast = new Toast({
    skin: 'black'
});

_toast.main.on('click', function (e) {
    _toast.hide();
});

let _toastFunc = function (text, options) {

    var _toast = this;

    options = options || {};

    _toast.html('<div class="text">' + text + '</div>');
    _toast.show();
    _toast.to && window.clearTimeout(_toast.to);
    _toast.to = setTimeout(
        function () {
            _toast.hide();
            if ($.isFunction(options.callback)) {
                options.callback();
            }
        },
        options.timeout || TIME_HIDE
    );
};

window.toast = function (text, options) {
    _toastFunc.call(_toast, text, options);
};

window.untoast = function () {
    _toast.hide();
};

let _loadingToast = new Toast({
    skin: 'black'
});

function getLoadingText(text) {
    var _loadingText = ''
        // + '<svg viewBox="0 0 64 64">'
        // +   '<g>'
        // +       '<defs>'
        // +           '<linearGradient id="sGD" gradientUnits="userSpaceOnUse" x1="55" y1="46" x2="2" y2="46">'
        // +               '<stop offset="0.1" class="stop1"></stop>'
        // +               '<stop offset="1" class="stop2"></stop>'
        // +           '</linearGradient>'
        // +       '</defs>'
        // +       '<g stroke-width="4" stroke-linecap="round" fill="none" transform="rotate(313.036 32 32)">'
        // +           '<path style="stroke:#fff" stroke="url(#sGD)" d="M4,32 c0,15,12,28,28,28c8,0,16-4,21-9"></path>'
        // +           '<path d="M60,32 C60,16,47.464,4,32,4S4,16,4,32"></path>'
        // +           '<animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform>'
        // +       '</g>'
        // +    '</g>'
        // + '</svg>'
        + '<div class="msg">' + (text || '请稍候...') + '</div>';

    return _loadingText;
}

window.loading = function (text) {
    _toastFunc.call(_loadingToast, getLoadingText(text), {
        timeout: 9999999
    });
};

window.unloading = function () {
    _loadingToast.hide();
};

export default _toast;
