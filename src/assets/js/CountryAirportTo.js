var options = {
    shouldSort: true,
    threshold: 0.4,
    maxPatternLength: 32,
    keys: [{
        name: 'iata',
        weight: 0.5
    }, {
        name: 'name',
        weight: 0.3
    }, {
        name: 'city',
        weight: 0.2
    }]
};

var fuse = new Fuse(airports, options)
debugger;

function stopPropagation(evt) {
    if (evt.stopPropagation !== undefined) {
        evt.stopPropagation();
    } else {
        evt.cancelBubble = true;
    }
}

var ac = $(document).on('click', '#autocompleteTo', function (e) {
    debugger;
   // e.preventDefault();
    e.stopPropagation();
   // onkeyup(search);
})
  .on('focus keyup', search)
  .on('keydown', onKeyDown);



   

    var wrap = $('<div>')
      .addClass('autocompleteTo-wrapper')
      .insertBefore(document.getElementById("autocompleteTo"))
      .append(document.getElementById("autocompleteTo"));

    var list = $('<div>')
      .addClass('autocompleteTo-results')
      .on('click', '.autocompleteTo-result', function (e) {
          e.preventDefault();
          e.stopPropagation();
          selectIndex($(this).data('index'));
      })
      .appendTo(wrap);

    $(document)
      .on('mouseover', '.autocompleteTo-result', function (e) {
          var index = parseInt($(this).data('index'), 10);
          if (!isNaN(index)) {
              list.attr('data-highlight', index);
          }
      })
      .on('click', clearResults);

    function clearResults() {
        results = [];
        numResults = 0;
        list.empty();
    }

    function selectIndex(index) {
        if (results.length >= index + 1) {
            document.getElementById("autocompleteTo").value(results[index].iata);
            clearResults();
        }
    }

    var results = [];
    var numResults = 0;
    var selectedIndex = -1;
    


    function search(e) {
        if (e.which === 38 || e.which === 13 || e.which === 40) {
            return;
        }

        if (document.getElementById("autocompleteTo").value.length > 0) {
            results = _.take(fuse.search(document.getElementById("autocompleteTo").value), 7);
            numResults = results.length;

            var divs = results.map(function (r, i) {
                return '<div class="autocompleteTo-result" data-index="' + i + '">'
                     + '<div><b>' + r.iata + '</b> - ' + r.name + '</div>'
                     + '<div class="autocompleteTo-location">' + r.city + ', ' + r.country + '</div>'
                     + '</div>';
            });

            selectedIndex = -1;
            list.html(divs.join(''))
              .attr('data-highlight', selectedIndex);

        } else {
            numResults = 0;
            list.empty();
        }
    }

    function onKeyDown(e) {
        switch (e.which) {
            case 38: // up
                selectedIndex--;
                if (selectedIndex <= -1) {
                    selectedIndex = -1;
                }
                list.attr('data-highlight', selectedIndex);
                break;
            case 13: // enter
                selectIndex(selectedIndex);
                break;
            case 9: // enter
                selectIndex(selectedIndex);
                e.stopPropagation();
                return;
            case 40: // down
                selectedIndex++;
                if (selectedIndex >= numResults) {
                    selectedIndex = numResults - 1;
                }
                list.attr('data-highlight', selectedIndex);
                break;

            default: return; // exit this handler for other keys
        }
        e.stopPropagation();
        e.preventDefault(); // prevent the default action (scroll / move caret)
    }