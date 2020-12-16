var synth = window.speechSynthesis;

var voice;
var queue = [];

function getVoice() {
  voice = synth.getVoices().find(v => v.lang === 'es-US');
}

getVoice();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = getVoice;
}

var count = 0;

function speak(text) {
  /*

  if (text) {
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.onend = function (event) {
      if (queue.length) {
        var text = queue.shift();
        synth.speak(text);
      }
    }

    utterThis.voice = voice;

    utterThis.rate = 1.2;
    if (!synth.speaking) {
      synth.speak(utterThis);
    } else {
      queue.push(utterThis);
    }
  }*/
}

window.onbeforeunload = function () {
  queue = [];
  synth.cancel();
};