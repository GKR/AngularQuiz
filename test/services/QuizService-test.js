describe('QuizService tests', function (){
  var QuizService;

  beforeEach(function (){
    module('NGQuiz');

    inject(function(_QuizService_) {
      QuizService = _QuizService_;
    });
  });

  it('should have a reset function', function () {
    expect(angular.isFunction(QuizService.reset)).toBe(true);
  });

  it('should set values on quiz object correctly', function () {
    var quiz = QuizService.getQuiz();
    expect(quiz.user_name).toBe('');
    expect(quiz.user_email).toBe('');

    QuizService.setQuizValue('user_name', 'Test User');
    QuizService.setQuizValue('user_email', 'test.user@testemail.com');

    expect(quiz.user_name).toBe('Test User');
    expect(quiz.user_email).toBe('test.user@testemail.com');
  });

  it('should reset the values on quiz object correctly', function () {
    var quiz = QuizService.getQuiz();
    expect(quiz.user_name).toBe('');
    expect(quiz.user_email).toBe('');

    QuizService.setQuizValue('user_name', 'Test User');
    QuizService.setQuizValue('user_email', 'test.user@testemail.com');

    expect(quiz.user_name).toBe('Test User');
    expect(quiz.user_email).toBe('test.user@testemail.com');

    QuizService.reset();

    quiz = QuizService.getQuiz();
    expect(quiz.user_name).toBe('');
    expect(quiz.user_email).toBe('');
  });

  it('should set the quiz answer correctly (single)', function () {
    var quiz = QuizService.getQuiz();
    expect(quiz.questions[0].answer).toBe('');

    QuizService.setQuizAnswer(0, 'answer_01');
    expect(quiz.questions[0].answer).toBe('answer_01');
  });

  it('should set the quiz answer correctly (multiple)', function () {
    var qIndex = 3;
    var quiz = QuizService.getQuiz();
    expect(quiz.questions[qIndex].answer).toBe(0);

    QuizService.updateQuizAnswerMultiple(qIndex, 2);
    QuizService.updateQuizAnswerMultiple(qIndex, 4);

    expect(quiz.questions[qIndex].answer).toBe(2 | 4);
  });

  it('should set return the correct quiz answer summary, if all correctly checked (multiple)', function () {
    var qIndex = 3;
    var quiz = QuizService.getQuiz();
    expect(quiz.questions[qIndex].answer).toBe(0);

    QuizService.updateQuizAnswerMultiple(qIndex, 2);
    QuizService.updateQuizAnswerMultiple(qIndex, 8);
    QuizService.updateQuizAnswerMultiple(qIndex, 16);
    QuizService.updateQuizAnswerMultiple(qIndex, 64);

    var summary = QuizService.getQuizSummary();
    expect(summary.correctQuestionCount).toBe(1);
  });

  it('should set return the correct quiz answer summary, if all correctly checked, but some incorrectly checked too (multiple)', function () {
    var qIndex = 3;
    var quiz = QuizService.getQuiz();
    expect(quiz.questions[qIndex].answer).toBe(0);

    QuizService.updateQuizAnswerMultiple(qIndex, 1);
    QuizService.updateQuizAnswerMultiple(qIndex, 2);
    QuizService.updateQuizAnswerMultiple(qIndex, 8);
    QuizService.updateQuizAnswerMultiple(qIndex, 16);
    QuizService.updateQuizAnswerMultiple(qIndex, 64);

    var summary = QuizService.getQuizSummary();
    expect(summary.correctQuestionCount).toBe(0);
  });

  it('should set and unset the quiz answer correctly (multiple)', function () {
    var qIndex = 3;
    var quiz = QuizService.getQuiz();
    expect(quiz.questions[qIndex].answer).toBe(0);

    // Set answers
    QuizService.updateQuizAnswerMultiple(qIndex, 2);
    QuizService.updateQuizAnswerMultiple(qIndex, 4);

    // Toggle answers (unset)
    QuizService.updateQuizAnswerMultiple(qIndex, 2);
    QuizService.updateQuizAnswerMultiple(qIndex, 4);

    expect(quiz.questions[qIndex].answer).toBe(0);
  });
});
