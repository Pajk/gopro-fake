var
MODES = { VIDEO: 0, PHOTO: 1, BURST: 2, MENU: 7 }
recordingSeconds = 0,
recordingInterval = null,

currentState = {
  currentMode: MODES.VIDEO,
  currentPhotoMode: 0,
  currentVideoMode: 0,
  recordingMinutes: 0,
  recordingSeconds: 0,
  recording: 0
},

stateBytes = {
  currentMode: 1,
  currentPhotoMode: 8,
  currentVideoMode: 9,
  recordingMinutes: 13,
  recordingSeconds: 14,
  recording: 29
},

shutterStart = function shutterStart() {
  currentState.recording = 1
  recordingInterval = setInterval(function() {
    recordingSeconds++
    currentState.recordingMinutes = Math.floor(recordingSeconds/60)
    currentState.recordingSeconds = recordingSeconds%60
    console.log(currentState.recordingMinutes + ':' + currentState.recordingSeconds)
    if (currentState.currentMode !== MODES.VIDEO && recordingSeconds > 2) {
      shutterStop()
    }
  }, 1000)
},

shutterStop = function shutterStop() {
  if (recordingInterval) {
    clearInterval(recordingInterval)
    recordingInterval = null
  }
  currentState.recording = 0
  recordingSeconds = 0
  currentState.recordingMinutes = 0
  currentState.recordingSeconds = 0
},

binaryState = function binaryState() {
  var buff = new Buffer(31)
  for (var i = 0; i < buff.length; i++) {
    buff[i] = 0
  }
  for (var param in stateBytes) {
    if (currentState.hasOwnProperty(param)) {
      buff[stateBytes[param]] = currentState[param]
    }
  }
  return buff
},

setCameraMode = function setCameraMode(mode) {
  currentState.currentMode = mode
  shutterStop()
}

module.exports = {
  binaryState: binaryState,
  modes: MODES,
  shutterStart: shutterStart,
  shutterStop: shutterStop,
  setCameraMode: setCameraMode
}
