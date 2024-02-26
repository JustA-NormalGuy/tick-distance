input.onButtonPressed(Button.A, function () {
    heading = input.compassHeading()
    serial.writeLine("" + (heading))
    serial.writeLine("A Pressed")
})
pins.onPulsed(DigitalPin.P8, PulseValue.Low, function () {
    basic.showLeds(`
        . # . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
input.onButtonPressed(Button.AB, function () {
    motobit.enable(MotorPower.Off)
})
input.onButtonPressed(Button.B, function () {
    motobit.enable(MotorPower.On)
    pins.servoWritePin(AnalogPin.P15, 90 - servoOffset)
    basic.pause(1000)
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 84)
    while (true) {
        current_heading = input.compassHeading()
        serial.writeLine("" + (current_heading))
        if (current_heading > heading && current_heading < heading + 20) {
            pins.servoWritePin(AnalogPin.P15, 82 - servoOffset)
        } else if (current_heading < heading && current_heading > heading - 20) {
            pins.servoWritePin(AnalogPin.P15, 98 - servoOffset)
        } else {
        	
        }
    }
})
pins.onPulsed(DigitalPin.P8, PulseValue.High, function () {
    distance += 1
    serial.writeLine("" + (distance))
    basic.showLeds(`
        # . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
let distance = 0
let current_heading = 0
let heading = 0
let servoOffset = 0
servoOffset = 1
let forward_steer = 90 - servoOffset
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
serial.writeLine("world")
