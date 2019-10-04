var check=0;
var check2=1;
  $(document).ready(function() {
      function getNewQuote() {
          $.ajax({
              url: 'https://api.forismatic.com/api/1.0/',
              jsonp: 'jsonp',
              dataType: 'jsonp',
              data: {
                  method: 'getQuote',
                  lang: 'en',
                  format: 'jsonp'
              },
              success: function(response) {
                  if (response.quoteAuthor == "") {
                      getNewQuote();
                  } else {
                      document.getElementById("quote").textContent = "";
                      document.getElementById('name').innerHTML = "";

                      var i = 0;
                      var flag = 0;
                      var txt = response.quoteText; /* The quote text */
                      var speed = 25; /* The speed/duration of the effect in milliseconds */
                      function typeWriter() {

                          if (i < txt.length) {

                              document.getElementById("quote").innerHTML += txt.charAt(i);

                              i++;
                              setTimeout(typeWriter, speed);
                              if (i == txt.length) {
                                  flag = 1;

                              }
                          }
                          if (flag == 1) {

                              document.getElementById('name').innerHTML = "- " + response.quoteAuthor;
                              flag = 0;
                              check=1;
                              console.log(check);

                          }

                      }
                      typeWriter();



                      $(".twitter-share-button").attr("href", "https://twitter.com/intent/tweet?text=" + response.quoteText + "- " + response.quoteAuthor);
                  }
              }


          });
      }
      document.getElementById('nextq').addEventListener('click', function() {
          if(check==1 || check2==1)
          { check=0;
            getNewQuote();
            check2=0;
          }

      });

  });
