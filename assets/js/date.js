// Safe Datepicker Initialization
$(document).ready(function () {
  var $from = $('.date_from');
  var $to = $('.date_to');

  // 인풋이 아예 없으면 아무 것도 하지 않음
  if ($from.length === 0 && $to.length === 0) return;

  if ($from.length) {
    $from.pickadate();
  }
  if ($to.length) {
    $to.pickadate();
  }

  var fromPicker = $from.length ? $from.pickadate('picker') : null;
  var toPicker = $to.length ? $to.pickadate('picker') : null;

  if (fromPicker && toPicker) {
    fromPicker.on('set', function (event) {
      if (event.select) { toPicker.set('min', fromPicker.get('select')); }
      if ('clear' in event) { toPicker.set('min', false); }
    });
    toPicker.on('set', function (event) {
      if (event.select) { fromPicker.set('max', toPicker.get('select')); }
      if ('clear' in event) { fromPicker.set('max', false); }
    });
  }
});
