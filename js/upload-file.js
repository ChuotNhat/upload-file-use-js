/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
    'use strict';
  
    var pluginName = 'upload-field';
  
    function UploadField(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
      this.init();
    }
  
    UploadField.prototype = {
      init: function() {
        var that = this,
            el = that.element,
            avatarFrame = el.parents('[attr-avatar]').find('.avatar-frame'),
            defaultAvatar = avatarFrame.data('default-thumb') || 'a.png',
            extension = el.data('parsley-file-extension') || 'jpg,jpeg,png,svg',
            isMultiple = el.get(0).multiple;
  
        extension = extension.trim().split(',');
  
        if(el.val() === '') {
          avatarFrame.css('background-image','url(' + defaultAvatar + ')');
        }
  
        el.on('change.' + pluginName, function() {
          var selfSelector = $(this),
              self = selfSelector.get(0),
              files = self.files;
  
          if(isMultiple) {
            var fileGroup = $('.file-group');
            if(fileGroup.length) {
              fileGroup.html('');
            } else {
              fileGroup = $('<div class="file-group"></div>');
            }
  
            for(var i=0; i<files.length; i++) {
              fileGroup.append('<div class="file-item">' + files[i].name + '</div>');
            }
  
            var uploadedGroup = el.parents('.custom-input').next('[data-uploaded-files-group]');
            if(uploadedGroup.length) {
              fileGroup.insertAfter(uploadedGroup);
            } else {
              fileGroup.insertAfter(selfSelector.parents('.custom-input'));
            }
          } else {
            if(self.files[0]) {
              var fileType = self.files[0].name.split('.').pop(),
                result = files.length !== 1 || $.inArray(fileType, extension) !== -1;
              var result1 = $.inArray(fileType, extension);
              if(result1 === -1) {
                alert('You selected the wrong file format. You are only selected .jpg,.jpeg, .png, .svg')
              }
              if(result && self.files[0]) {
                var reader = new FileReader();
    
                reader.onload = function(e) {
                  avatarFrame.css('background-image','url(' + e.target.result + ')');
                };
    
                reader.readAsDataURL(self.files[0]);
              } else {
                avatarFrame.css('background-image','url(' + defaultAvatar + ')');
              }

            }
            if(self.files[0] == undefined) {
              alert('You have not selected a file yet');
            }
          }
        });
  
        // initialize
        // add events
      },
      destroy: function() {
        // remove events
        // deinitialize
        $.removeData(this.element[0], pluginName);
      }
    };
  
    $.fn[pluginName] = function(options, params) {
      return this.each(function() {
        var instance = $.data(this, pluginName);
        if (!instance) {
          $.data(this, pluginName, new UploadField(this, options));
        } else if (instance[options]) {
          instance[options](params);
        }
      });
    };
  
    $.fn[pluginName].defaults = {
  
    };
  
    $(function() {
      // $('[data-' + pluginName + ']').on('customEvent', function() {
      //   // to do
      // });
  
      $('[data-' + pluginName + ']')[pluginName]({
  
      });
    });
  
  }(jQuery, window));
  