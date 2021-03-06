$(".body-div").hide();

$(document).ready(() => {
  let mainUrl = "https://www.omdbapi.com/?apikey=647b7461";

  // Elements

  let $srchBtn = $(".btn-search");
  let $titleOfMovie = $("#titleOfMovie");

  // Function for getting API

  $titleOfMovie.keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
    }
  });

  $srchBtn.on("click", () => {
    function getMovieByTitle(url, title) {
      $(".poster-img").empty();
      $("#imdbRating").empty();
      $("#metascoreRating").empty();
      $(".info").empty();

      let resultUrl = `${url}&t=${title}`;
      fetch(resultUrl)
        .then((response) => response.json())
        .then((data) => DataOfMovie(data));
    }

    getMovieByTitle(mainUrl, $titleOfMovie.val());

    function DataOfMovie(data) {
      for (let value in data) {
        if (value === "Title") {
          $(".title-of-movie").append(`${data["Title"]}`);
        } else if (value === "Genre") {
          $(".genre-of-movie").append(data["Genre"]);
        } else if (value === "imdbRating") {
          $(".rating-of-movie").append(
            `${data["imdbRating"]} | ${data["Runtime"]}`
          );
          $("#imdbRating").append(data["imdbRating"]);
        } else if (value === "Metascore") {
          $("#metascoreRating").append(data["Metascore"]);
        } else if (value === "Plot") {
          $(".plot-of-movie").append(data["Plot"]);
        } else if (value === "Released") {
          $("#release-date").append(`Release date : ${data["Released"]}`);
        } else if (value === "Director") {
          $("#director").append(`Director : ${data["Director"]}`);
        } else if (value === "BoxOffice") {
          $("#box-office").append(`Box office : ${data["BoxOffice"]}`);
        } else if (value === "Rated") {
          $("#rated").append(`Rated : ${data["Rated"]}`);
        } else if (value === "Actors") {
          $("#cast").append(`Cast : ${data["Actors"]}`);
        } else if (value === "Poster") {
          let str = data["Poster"];
          let n = str.search("300");
          str = setCharAt(str, n, "10");

          function setCharAt(str, index, chr) {
            if (index > str.length - 1) return str;
            return str.substr(0, index) + chr + str.substr(index + 1);
          }

          $(".poster-img").append(`<img src="${str}">`);
        }
        value = [];
      }
    }

    $(".body-div").show();

    $titleOfMovie.val("");
  });
});
