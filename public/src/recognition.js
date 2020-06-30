var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var material = [ 'libros' , 'revistas' , 'tesis', 'articulos', 'informacion', 'biblioteca', 'libro', 'bidi', 'revista', 'digital', 'electronico'];
var grammar = '#JSGF V1.0; grammar materiales; public <material> = ' + material.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'es-ES';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
var buttonSpeech = document.getElementById("speech");

recognition.onstart = function() {
  buttonSpeech.className = 'on_speech';
}

recognition.onresult = function(event) {
  buttonSpeech.className = '';
  Botkit.send(event.results[0][0].transcript, event);
}

recognition.onspeechend = function() {
  recognition.stop();
}
