# udemy-javascriptfull
Tasks from course https://www.udemy.com/course/javascript_full/

Student: Viktor Kulygin

| Task                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|---------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [practice1](https://github.com/astonone/udemy-javascriptfull/tree/master/practice1)   | /* Assignment for the lesson:<br>1) Create a variable numberOfFilms and place in it the answer from the user to the question:<br>How many movies have you watched?<br><br>2) Create a personalMovieDB object and place the following properties in it:<br>count - the answer to the first question will be passed here<br>movies - put an empty object here<br>actors - put an empty object here too<br>genres - put an empty array here<br>private - put boolean (boolean) value false in this property<br><br>3) Ask the user two questions each:<br>One of the last movies you watched?<br>How much would you rate it?<br>  The answers should be put in separate variables<br>  Write the answers into a movies object in the format:<br>  movies: {<br>  'logan': '8.1'<br> }<br><br>Make sure everything works without errors in the console */                                                    |
| [practice2](https://github.com/astonone/udemy-javascriptfull/tree/master/practice2)   | /* Assignment for the lesson:<br>1) Automate questions to the user about films using a loop<br><br>2) Make it so that the user cannot leave the answer as an empty string,<br>cancel the answer or enter a movie title longer than 50 characters. If this happens<br>return the user to the questions again<br><br>3) Use conditions to check personalMovieDB.count, and if it's less than 10 - print a message<br>"You've seen quite few movies", if it's between 10 and 30 - "You're a classic viewer", and if it's more -<br>"You're a film buff." And if it doesn't match any of the options - "There's been an error".<br><br>4) Practice and rewrite the loop in two other ways<br><br>Take the code from the previous homework assignment */                                                                                                                                                      |
| [practice3](https://github.com/astonone/udemy-javascriptfull/tree/master/practice3)   | /* Assignment for the lesson:<br>1) Repeat the first part of the assignment from the lesson<br><br>2) Create a function showMyDB that will check the private property. If it is set to false - outputs the main object of the programme to the page<br><br>3) Create a function writeYourGenres in which the user will answer the question 3 times "Your favourite genre is number ${number in order}". Each answer is written to the data array genres */                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [practice4](https://github.com/astonone/udemy-javascriptfull/tree/master/practice4)   | /* Assignment for the lesson:<br>1) We already have a working application consisting of individual functions. Imagine that you have a task to rewrite it so that all functions become methods of the personalMovieDB object. This happens in real products when you change technologies or approach to programme architecture<br><br>2) Create a method toggleVisibleMyDB, which will check the privat property when called. If it is false - it switches it to true, if true - switches it to false. Test it together with showMyDB.<br><br>3) In the writeYourGenres method, forbid the user to click the "cancel" button or leave an empty string.<br>If he did - return him to the same question. After all genres are entered -<br>using the forEach method, output messages to the console in the following form:<br>"Favourite genre #(number in order starting from 1) is (name from array) "*/. |
| [practice5](https://github.com/astonone/udemy-javascriptfull/tree/master/practice5)   | /* Assignment for the lesson:<br>1) Remove all adverts from the page (right side of the site)<br>2) Change the genre of the film, change "comedy" to "drama"<br>3) Change the background with the film poster to the image "bg.jpg". It is in the img folder. Implement only with JS.<br>4) Generate a list of films on the page based on the data from this JS file. Sort them alphabetically.<br>5) Add numbering of the displayed films */                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [practice6](https://github.com/astonone/udemy-javascriptfull/tree/master/practice6)   | /* Assignment for the lesson:<br>1) Implement the functionality that after filling out the form and clicking "Confirm" - the new film is added to the list. The page should not be reloaded.<br>The new film should be added to movieDB.movies.<br>To access the value of input - access it as input.value;<br>P.S. There are several variants of solving the problem here, any but a working one is accepted.<br><br>2) If the name of the film is more than 21 characters - cut it off and add three dots.<br><br>3) When clicking on the bin - the item will be removed from the list (difficult)<br><br>4) If "Make favourite" is ticked in the form - display a message in the console:"Adding a favourite film"<br><br>5) Films should be sorted alphabetically */                                                                                                                                 |
| [practice7](https://github.com/astonone/udemy-javascriptfull/tree/master/practice7)   | Implement tabs changing                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| [practice8](https://github.com/astonone/udemy-javascriptfull/tree/master/practice8)   | Implement timer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [practice9](https://github.com/astonone/udemy-javascriptfull/tree/master/practice9)   | Implement modal window                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [practice10](https://github.com/astonone/udemy-javascriptfull/tree/master/practice10) | Use classes for creating of menu cards                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [practice11](https://github.com/astonone/udemy-javascriptfull/tree/master/practice11) | Use AJAX requests for sending data to server                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [practice12](https://github.com/astonone/udemy-javascriptfull/tree/master/practice12) | Implement user-friendly notification for modal window                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| [practice13](https://github.com/astonone/udemy-javascriptfull/tree/master/practice13) | Use FetchAPI instead of XMLHttpRequest                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| [practice14](https://github.com/astonone/udemy-javascriptfull/tree/master/practice14) | npm, async/await load menu cards from server                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [practice15](https://github.com/astonone/udemy-javascriptfull/tree/master/practice15) | Implement slider                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [practice16](https://github.com/astonone/udemy-javascriptfull/tree/master/practice16) | Implement slider, option 2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

