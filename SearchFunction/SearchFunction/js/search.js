
(function () {
    "use strict";

    $(function () {
        var searchInput = $("#SearchInput");

        searchInput.keypress(function (event) {
            if (event.which === 13 && searchInput.val() !== "") {
                storeSearchResult();
            }
        });

        function storeSearchResult() {
            var result = {
                time: new Date().toLocaleString().slice(0, -3),
                title: searchInput.val()
            };
            $('.result-list').removeClass('hide');
            $('#SearchResultsList').append("<li class='search-item clearfix'><span class='title'>" + result.title + "</span><time>" + result.time + "</time><div class='remove'><span>x</span></div></li> ");
            searchInput.val("")
        };

        $('#SearchResultsList').on('click', '.remove', function () {
            this.parentElement.remove();
            if ($('ul#SearchResultsList').children('li').length === 0) {
                $('.result-list').addClass('hide');
            }
        });

        searchInput.autocomplete({
            source: function (request, response) {
                var value = searchInput.val();
                var url = "http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=US,CA&q=" + value;
                $.ajax({
                    url: url,
                    dataType: "json",
                    data: {
                        q: request.term
                    },
                    success: function (data) {
                        if (!data) return;
                        response(data.slice(0, 10));
                    }
                });
            },
            minLength: 3,
        });
    });
})();
