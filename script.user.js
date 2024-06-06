// ==UserScript==
// @name         Wizard101 Trivia Answer Highlighter
// @namespace    https://github.com/Jan-Fcloud/W101-TriviaAnswers
// @version      1.0
// @description  Highlight the correct answer in the Wizard101 Trivia game
// @author       Jan-FCloud
// @match        https://www.wizard101.com/quiz/trivia/game*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// ==/UserScript==

(function () {
    'use strict';

    // Fetch and Parse the JSON from https://raw.githubusercontent.com/Jan-Fcloud/W101-TriviaAnswers/main/answers.json

    $.getJSON("https://raw.githubusercontent.com/Jan-Fcloud/W101-TriviaAnswers/main/answers.json", function (data) {
        console.log(data);
        // Next get the Quiz title from the website url which is after "https://www.wizard101.com/quiz/trivia/game/"
        let quizTitle = window.location.href.split("https://www.wizard101.com/quiz/trivia/game/")[1];

        // remove every minus sign from the quiz title
        quizTitle = quizTitle.replace(/-/g, " ");

        // remove the word trivia from the quiz title
        quizTitle = quizTitle.replace("trivia", "");

        // Change all starts of words in title to uppercase
        quizTitle = quizTitle.replace(/\b\w/g, l => l.toUpperCase());

        // Remove any spaces at the end of the quiz title
        quizTitle = quizTitle.trim();

        // Get the trivia question from the div .quizQuestion
        let question = $(".quizQuestion").text();

        // Find the question in the quizData
        data[quizTitle].forEach(qElement => {
            if (qElement[0].toUpperCase() === question.toUpperCase() || qElement[0].toUpperCase() === question.toUpperCase() + "?"){
                console.log(qElement);

                // Find the found answer in the answers on the website
                let answers = $(".answerText");

                answers.each(function (index, element) {
                    var elementText = $(element).text().trim();
                    if (elementText === qElement[1].trim()) {
                        $(element).css("background-color", "green");

                        return true;
                    }
                });

            }
        });
    });


})();
