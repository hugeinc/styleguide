function slugfy(str) {
  str = str.replace(/^\s+|\s+$/g, '');
  str = str.toLowerCase();

  var from = "ãàáäâèéëêìíïîòóöôõùúüûñç·/_,:;";
  var to   = "aaaaaeeeeiiiiooooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return str;
}

(function($){

var sitemap = $('#sitemap');

$('.order-by').click(function(e) {
    var $this = $(this);

    e.preventDefault();

    if ($this.hasClass('asc')) {
        $this.removeClass('asc').addClass('desc');
    } else {
        $this.removeClass('desc').addClass('asc');
    }

    sortTable(sitemap.get()[0], $this.parent().index(), $this.hasClass('desc'));

    $('.order-by').not($this).removeClass('asc desc');
});

$('#sitemap-search').bind('keyup', function(e){
    var $this = $(this),
        itens = sitemap.find('tbody > tr'),
        term = slugfy($this.val().toLowerCase());

    itens.each(function(){
        var $item = $(this),
            title = slugfy($item.find('td:first').text().toLowerCase());

        if (title.indexOf(term) >= 0) {
            $item.removeClass('invisible');
        } else {
            $item.addClass('invisible');
        }
    });
});

function sortTable(table, col, reverse) {
    var tb = table.tBodies[0],
        tr = Array.prototype.slice.call(tb.rows, 0),
        i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) {
        return reverse
            * (a.cells[col].textContent.trim()
                .localeCompare(b.cells[col].textContent.trim())
               );
    });
    for(i = 0; i < tr.length; ++i) tb.appendChild(tr[i]);
}

}(jQuery));