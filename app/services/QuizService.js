'use strict';

angular.module('NGQuiz')
app.factory('QuizService', function() {

  var getBlankQuiz = function() {
    return {
      user_name: '',
      user_email: '',
      description: 'This is a science themed quiz with some rather challenging questions.',
      img: 'http://static1.squarespace.com/static/52783d80e4b0e33e3923787f/t/528a748ee4b029435a5440e9/1442253515293/?format=1500w',

      questions: [
        {
          type: 'single',
          text: 'If you were to throw a ball right up into the sky, how fast would you have to throw the ball (minimum required velocity) so that it would break free from earths gravitational pull and never return back down (i.e. escape velocity of planet earth)?',
          img: 'http://www.edb.utexas.edu/missiontomars/images/formula6.jpg',
          answers: ['400 km/h', '3200 km/h', '12400 km/h', '24800 km/h', '40270 km/h', '74900 km/h'],
          answer: '',
          correct_answer_index: 4
        },
        {
          type: 'single',
          text: 'One year is considered to be one revolution a planet makes around the sun. It should be no surprise that one earth year is 365 earth solar days. One year on mars is about 687 earth solar days. If you were 30 years old here on planet earth, how old would you then be in Mars years?',
          img: 'http://www.economylead.com/wp-content/uploads/2015/09/The-Martian.png',
          answers: ['10 years old', '14 years old', '16 years old', '20 years old', '22 years old', '32 years old', '34 years old'],
          answer: '', // (30 * 365) / 687 = 15.93
          correct_answer_index: 2
        },
        {
          type: 'single',
          text: 'What is the speed of light (c) converted to km per second?',
          img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Earth_to_Sun_-_en.png',
          answers: ['29812 km/s', '142973 km/s', '299792 km/s', '380423 km/s', '843214 km/s', '2998792 km/s'],
          answer: '',
          correct_answer_index: 2
        },
        {
          type: 'multiple',
          text: 'Check all of the following statements which are true.',
          img: 'https://upload.wikimedia.org/wikipedia/en/a/ac/The_Sun,_planets,_and_dwarf_planets_book_cover.jpg',
          answers: [
            {id: 1, text: 'Interstellar travel is realistic with current chemical rocket technology'}, // false
            {id: 2, text: 'One million Earths can fit inside the Sun'}, // true
            {id: 4, text: 'The hottest planet in our solar system is the closest planet to the Sun'}, // false
            {id: 8, text: 'The moon appears bigger on the horizon due to an optical illusion called the "Moon illusion"'}, // true
            {id: 16, text: 'In the early universe, there was pretty much nothing else other than hydrogen and helium gas'}, // true
            {id: 32, text: 'In a vacuum, a hammer and a feather fall at different rates'}, // false
            {id: 64, text: 'Every atom that your body is composed of has been created inside the nuclear furnace of stars. These atoms were / are then spread out by stars going supernova (exploding).'} // true
          ],
          // Multiple questions are implemented using bitwise operators.
          // Note that we are limited to signed 32 bits integers here (JavaScript). This gives us 31 unique flags, or 31 answer alternatives to a question.
          answer: 0,
          correct_answer_bitmask: (2 | 8 | 16 | 64) // This is the bitmask of the correct answers (answer id's)
        }
      ]
    };
  };

  return {
    onGoingQuiz: getBlankQuiz(),

    reset: function() {
      this.onGoingQuiz = getBlankQuiz();
    },
    getQuiz: function() {
      return this.onGoingQuiz || {};
    },
    setQuizValue: function(name, value) {
      this.onGoingQuiz[name] = value;
    },
    setQuizAnswer: function(index, value) {
      this.onGoingQuiz.questions[index].answer = value;
    },
    updateQuizAnswerMultiple: function(index, flag) {
      var question = this.onGoingQuiz.questions[index];
      // Test if current answer contains the provided answer flag and remove it if it does, otherwise add the flag
      var newAnswer = ((question.answer & flag) === flag ? question.answer & ~flag : question.answer | flag);
      this.setQuizAnswer(index, newAnswer);
    },
    getQuizSummary: function() {
      var summary = {
        questions: [],
        all_answered: (_.find(this.onGoingQuiz.questions, function(question) { return !question.answer; }) ? false : true),
        correctQuestionCount: 0
      };

      _.each(this.onGoingQuiz.questions, function(question, index) {
        var questionSummary = {text: question.text, answers: [], correct: true};
        _.each(question.answers, function(answer, answer_index) {

          if(question.type === 'single') {
            var correct_answer = (answer_index === question.correct_answer_index);
            var selected_answer = (answer === question.answer);
            if(correct_answer && !selected_answer) {
              questionSummary.correct = false;
            }
            questionSummary.answers.push({value: answer, correct_answer: correct_answer, selected_answer: selected_answer});
          } else if(question.type === 'multiple') {
            var correct_answer = ((question.correct_answer_bitmask & answer.id) === answer.id);
            var selected_answer = ((question.answer & answer.id) === answer.id);
            if(correct_answer && !selected_answer) {
              questionSummary.correct = false;
            }
            questionSummary.answers.push({value: answer.text, correct_answer: correct_answer, selected_answer: selected_answer});
          }
        }, this);

        summary.questions.push(questionSummary);
      }, this);


      summary.correctQuestionCount = _.reduce(summary.questions, function(counter, question) {
        return (question.correct ? counter + 1 : counter);
      }, 0);

      return summary;
    }
  }
});
