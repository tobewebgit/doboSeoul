;(function ($, win, doc, undefined) {
  'use strict';

  function ReservationUi() {
    this.langElement = $('.lang-element');
    this.topButtonWrap = $('.top-button-wrap');
    this.popupWrap = $('#popupWrap');
    this.btnPopupClose = $('#btnPopupClose');
    this.innerPopup = $('#innerPopup');
    this.focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    this.activeElement;
    this.focusableElements;
    this.firstTabStop;
    this.lastTabStop;
    this.tourNum = $('#tourNum');
    this.itemBox = $('#itemBox');
    this.visitorsSelectButton = $('#visitorsSelectButton')

  }
  const ru = ReservationUi.prototype;

  ru.init = function() {
    this.initEvent();
  }
  
  ru.initEvent = function() {
    this.langElement.on('click', '.btn_lang', this.resLangElementEvent);
    this.topButtonWrap.on('click', 'button', this.resTopButtonEvent);
    this.innerPopup.on('keydown', this.trapTabKeyEvent);
    this.tourNum.on('click', this.tourNumEvent);
    this.visitorsSelectButton.on('click', this.visitorsSelectEvent)
  }

  ru.tourNumEvent = function() {
    RU.itemBox.addClass('active');
  }

  ru.visitorsSelectEvent = function() {
    RU.itemBox.removeClass('active');
  }

  ru.resLangElementEvent = function() {
    RU.langElement.toggleClass('active');
  }

  ru.resTopButtonEvent = function() {
    const idx = $(this).index();
    idx === 1 ? RU.topButtonWrap.addClass('res-org') : RU.topButtonWrap.removeClass('res-org');
  }
  
  ru.popupWrapOpen = function(callback) {
    this.activeElement = doc.activeElement;
    this.popupWrap.show();

    if(callback) callback();
    
    let focusableElements = this.innerPopup.get(0).querySelectorAll(this.focusableElementsString);
    focusableElements = Array.prototype.slice.call(focusableElements);
    
    this.firstTabStop = focusableElements[0];
    this.lastTabStop = focusableElements[focusableElements.length - 1];
    
    this.firstTabStop.focus();
  }

  ru.popupWrapClose = function(callback) {
    this.popupWrap.hide();
    this.activeElement.focus();

    if(callback) callback();
  }

  ru.trapTabKeyEvent = function(e) {
    if(e.keyCode === 9) {
      if(e.shiftKey) {
        if(doc.activeElement === RU.firstTabStop) {
          e.preventDefault();
          RU.lastTabStop.focus();
        }
      }else{
        if(doc.activeElement === RU.lastTabStop) {
          e.preventDefault();
          RU.firstTabStop.focus();
        }
      }
    }

    if(e.keyCode === 27) {
      RU.popupWrapClose();
    }
  }

  window.RU = new ReservationUi();
  window.RU.init();

})(jQuery, window, document);