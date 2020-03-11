

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


        function stopPropagation(evt) {
            if (evt.stopPropagation !== undefined) {
                evt.stopPropagation();
            } else {
                evt.cancelBubble = true;
            }
        }

        var ac = $(document).on('click', '#autocomplete', function (e) {
           // e.preventDefault();
//e.stopPropagation();
           // onkeyup(search);
        })
        .on('focus keyup', '#autocomplete',  search)
          .on('click','#autocomplete', onKeyDown);



            var wrap = $('<div>')
              .addClass('autocomplete-wrapper')
              .insertBefore(document.getElementById("autocomplete"))
              .append(document.getElementById("autocomplete"));

            var list = $('<div>')
              .addClass('autocomplete-results')
              .on('click', '.autocomplete-result', function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  selectIndex($(this).data('index'));
              })
              .appendTo(wrap);

            $(document)
              .on('mouseover', '.autocomplete-result', function (e) {
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
                     //document.getElementById('autocomplete').textContent=results[index].iata;
                     var city=results[index].city;
                     var cuntry=results[index].country;
                     var AirCode=results[index].iata;
                     var address=city +" "+ "("+AirCode +")";
                 
                     document.getElementById("Origin").value=AirCode;
                     
                     document.getElementsByTagName("input")[0].value=address;
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

                if (document.getElementById("autocomplete").value.length > 0) {
                    results = _.take(fuse.search(document.getElementById("autocomplete").value), 7);
                    numResults = results.length;
                    var divs = results.map(function (r, i) {
                     
                        return '<div  class="autocomplete-result" data-index="' + i + '">'
                             + '<div><b>' + r.iata + '</b> - ' + r.name + '</div>'
                             + '<div class="autocomplete-location" >' + r.city + ', ' + r.country + '</div>'
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