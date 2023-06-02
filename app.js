const displayElement = document.querySelector(".display")
const secondsInput = document.getElementById("seconds-input")
const minutesInput = document.getElementById("minutes-input")

let isPaused = true;
let interval;

const activate = () => {
  secondsInput.readOnly = isPaused
  minutesInput.readOnly = isPaused

  if (isPaused) {
    isPaused = false

    const mins = minutesInput.value
    const secs = secondsInput.value
    const duration = (mins * 60) + parseInt(secs)

    startTimer(duration)
  } else {
    isPaused = true

    clearInterval(interval)
    displayElement.classList.remove("active")
  }
}

const convertTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time - (minutes * 60)
  return { minutes, seconds }
}

const startTimer = (duration) => {
  if (isPaused) return;
  const startTime = Math.round(Date.now() / 1000)

  interval = setInterval(() => {
    const secondsDifference = (Math.round(Date.now() / 1000) - startTime)
    const remainingTime = duration - secondsDifference
    displayElement.classList.add("active")

    const { minutes, seconds } = convertTime(remainingTime)
    minutesInput.value = String(minutes).padStart(2, '0')
    secondsInput.value = String(seconds).padStart(2, '0')
  }, 1000)
}

document.addEventListener('keypress', event => {
  if (event.key == " ") {
    activate()
  } else if (event.key == "r") {
    minutesInput.value = "25"
    secondsInput.value = "00"
  } else if (event.key == "b") {
    minutesInput.value = "05"
    secondsInput.value = "00"
  } 
})