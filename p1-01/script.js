Vue.component('round-detail', {
  data: function () {
    return {
      deleted: false,
      getResult: function(){
        return this.success;
      }
    }
  },
  props: {
    // `number` has an expected data type of Number, and it defaults to 0
    count:0,
    original:String,
    guessString:String,
    score: 0,
    success:false,
  },
  template: '#round-detail',
  methods: {

  },
  computed:{

  }
})


let app = new Vue({
  el: '#app',
  data: {
    //challengeCount: 0,
    numbersShown: [],
    numbersGuessed: [],
    currentNumber: '',
    canShow: false,
    countdown: 5,
    timing: null,
    guessString: '',
    timesUp: false,
    correct: false,
    feedback: '',
    totalScore:  0,
    attempts:[],
    selectionLevel:1,
    cards:[
      '\u{1F0A0}',
      '\u{1F0A1}',
      '\u{1F0A2}',
      '\u{1F0A3}',
      '\u{1F0A4}',
      '\u{1F0A5}',
      '\u{1F0A6}',
      '\u{1F0A7}',
      '\u{1F0A8}',
      '\u{1F0A9}',
      '\u{1F0AA}',
      '\u{1F0AB}',
      '\u{1F0AC}',
      '\u{1F0AD}',
      '\u{1F0AE}',
    ]
  },
  computed: {
    newGame: function(){
      return (this.numbersShown.length > 0 && this.canShow);
    },
    feedBackObject: function () {
      return {
        'bg-danger': !this.correct,
        'bg-success': this.correct,
        'text-light': true
      }
    },
    challengeCount: function(){
      return this.selectionLevel*2 + 2;
    }
  },
  methods: {
    restartGame: function(){
      //this.challengeCount = 0;
      this.numbersShown= [];
      this.numbersGuessed= [];
      this.currentNumber= ''
      this.canShow= false;
      this.countdown= 5;
      this.timing=null;
      this.guessString= '';
      this.timesUp=false;
      this.correct= false;
      this.feedback= '';
    } ,
    resetScores: function(){
      this.attempts =[];
      this.totalScore=0;
    },
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    },
    submitNumber: function (event) {
      console.log(event);
      this.numbersGuessed.push(currentNumber);
    },
    getChallengeNumbers: function () {
      //first empty the previous array
      this.numbersShown = [];
      if (this.challengeCount > 0) {
        for (let i = 0; i < this.challengeCount; i++) {
          let rDigit = this.getRandomIntInclusive(0, 9);
          this.numbersShown.push(rDigit);
        }
        this.canShow = true;
        this.countDownNumbers();
      }
    },
    checkEntry: function () {
      //console.log(this.numbersShown.toString());
      let attempt = {}
      attempt.count= this.attempts.length+1;
      const reducer = (acc, curr) => acc.toString()+curr.toString();
      let strValue = this.numbersShown.reduce(reducer);
      //console.log('String is '+strValue)
      if (strValue == this.guessString){
        this.correct = true;
        this.feedback = 'You remembered everything! Awesome!!'
        console.log('guess is correct')
      }
      else {
        this.correct = false;
        this.feedback = 'Thats incorrect - but its a minor setback! Please try again';
        console.log('guess is incorrect')

      }
      attempt.score = this.correct? this.selectionLevel: 0;
      attempt.original= strValue.slice();
      attempt.guessString = this.guessString.slice();
      attempt.success = this.correct;
      this.totalScore += attempt.score;
      this.attempts.push(attempt);

    },
    canShowNumbers: function () {
      return (this.numbersShown.length > 0 && this.canShow);
    },
    getResult: function(correct)
    {
      return 'success';
      //return correct?'<i class="fa fa-check"></i>':'<i class="fa fa-times-circle"></i>';
    },
    countDownNumbers: function () {
      // Set the date we're counting down to
      var startTime = new Date().getTime();
      var currSeconds = 0;

      // Update the count down every 1 second
      var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = now - startTime;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element
        let elapsed = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
        currSeconds++;
        console.log(currSeconds);
        app.timing = currSeconds;

        // If the count down is finished, write some text
        if (currSeconds >= 5) {
          console.log("done");
          app.canShow = false;
          app.timesUp = true;
          clearInterval(x);
        }
      }, 1000);
    }
  }
})
