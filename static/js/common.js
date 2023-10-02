;(function ($, win, doc, undefined) {
  'use strict';

  function ReservationUi() {
    this.popupWrap = $('#popupWrap');
    this.btnPopupClose = $('#btnPopupClose');
    this.innerPopup = $('#innerPopup');
    this.focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    this.activeElement;
    this.focusableElements;
    this.firstTabStop;
    this.lastTabStop;

  }
  const ru = ReservationUi.prototype;

  ru.init = function() {
    this.initEvent();
  }
  
  ru.initEvent = function() {
    this.innerPopup.on('keydown', this.trapTabKeyEvent);
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