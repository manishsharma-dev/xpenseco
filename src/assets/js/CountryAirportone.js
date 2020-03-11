
function stopPropagation(evt) {
    if (evt.stopPropagation !== undefined) {
        evt.stopPropagation();
    } else {
        evt.cancelBubble = true;
    }
}

var ac = $(document).on('click', '#autocompleted', function (e) {
   // e.preventDefault();
    //e.stopPropagation();
   // onkeyup(search);
})
  .on('focus keyup', '#autocompleted',  search)
  .on('click',  '#autocompleted', onKeyDown);



    var wrapa = $('<div>')
      .addClass('autocompleted-wrapper')
      .insertBefore(document.getElementById("autocompleted"))
      .append(document.getElementById("autocompleted"));

    var lista = $('<div>')
      .addClass('autocompleted-results')
      .on('click', '.autocompleted-result', function (e) {
         
          e.stopPropagation();
          selectaIndex($(this).data('index'));
      })
      .appendTo(wrapa);

    $(document)
      .on('mouseover', '.autocompleted-result', function (e) {
          var index = parseInt($(this).data('index'), 10);
          if (!isNaN(index)) {
              lista.attr('data-highlight', index);
          }
      })
      .on('click', clearResultss);

    function clearResultss() {
        resultss = [];
        numResultss = 0;
        lista.empty();
    }

    function selectaIndex(index) {
        if (resultss.length >= index + 1) {
          debugger;

            var citye=resultss[index].city;
            var cuntry=resultss[index].country;
            var AirCode=resultss[index].iata;
            var addresss=citye +" "+ "("+AirCode +")";
        
            document.getElementById("Destination").value=AirCode;

            var des =document.getElementById("Destination").value;

            var orgn = document.getElementById("Origin").value;

            if(orgn == des)
            {
                alert("Destination will be different");
                clearResultss();
                return;
            }
            
            document.getElementById('autocompleted').value=addresss;

            clearResultss();
               
           // document.getElementById('autocompleted').value=resultss[index].iata;


           //
             //document.getElementById('txtsecond').value;
            // document.getElementsByTagName("input")[1].value=resultss[index].iata;
            
        }
    }

    //   function selectaIndex(index) {
    //     if (results.length >= index + 1) {
    //         debugger;
    //         document.getElementsByClassName('autocomplete').textContent=results[index].iata;
    //         document.getElementsByTagName("input")[0].value=results[index].city;
    //         clearResults();
    //     }
    // }

    var resultss = [];
    var numResultss = 0;
    var selectedIndexone = -1;
    


    function search(e) {
        if (e.which === 38 || e.which === 13 || e.which === 40) {
            return;
        }

        if (document.getElementById("autocompleted").value.length > 0) {
            resultss = _.take(fuse.search(document.getElementById("autocompleted").value), 7);
            numResultss = resultss.length;
            var divs = resultss.map(function (r, i) {
                return '<div id="txtsecond" class="autocompleted-result" data-index="' + i + '">'
                     + '<div ><b>' + r.iata + '</b> - ' + r.name + '</div>'
                     + '<div class="autocompleted-location" >' + r.city + ', ' + r.country + '</div>'
                     + '</div>';
            });

            selectedIndexone = -1;
            lista.html(divs.join(''))
              .attr('data-highlight', selectedIndexone);

        } else {
            numResultss = 0;
            lista.empty();
        }
    }

   

    //(keyup.enter)="onEnter(box.value)

    function onKeyDown(e) {
        switch (e.which) {
            case 38: // up
                selectedIndexone--;
                if (selectedIndexone <= -1) {
                    selectedIndexone = -1;
                }
                lista.attr('data-highlight', selectedIndexone);
                break;
            case 13: // enter
                selectaIndex(selectedIndexone);
                break;
            case 9: // enter
                selectaIndex(selectedIndexone);
                //e.stopPropagation();
                return;
            case 40: // down
                selectedIndexone++;
                if (selectedIndexone >= numResultss) {
                    selectedIndexone = numResultss - 1;
                }
                lista.attr('data-highlight', selectedIndexone);
                break;

            default: return; // exit this handler for other keys
        }
        e.stopPropagation();
        e.preventDefault(); // prevent the default action (scroll / move caret)
    }




        