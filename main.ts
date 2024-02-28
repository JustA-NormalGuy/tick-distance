function InchesToTick (inches: number) {
    return Math.round(inches * 1.98)
}
input.onButtonPressed(Button.A, function () {
    heading = input.compassHeading()
    serial.writeLine("" + (heading))
    serial.writeLine("A Pressed")
})
pins.onPulsed(DigitalPin.P8, PulseValue.Low, function () {
    TickCount += 1
    value += 1
})
input.onButtonPressed(Button.AB, function () {
    motobit.enable(MotorPower.Off)
    control.reset()
})
input.onButtonPressed(Button.B, function () {
    motobit.enable(MotorPower.On)
    pins.servoWritePin(AnalogPin.P15, 90 - servoOffset)
    basic.pause(1000)
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 100)
    while (true) {
        current_heading = input.compassHeading()
        serial.writeLine("" + (current_heading))
        if (current_heading > heading && current_heading < heading + 10) {
            pins.servoWritePin(AnalogPin.P15, 82 - servoOffset)
            basic.showLeds(`
                . . . . .
                . # . . .
                # # # # #
                . # . . .
                . . . . .
                `)
        } else if (current_heading < heading && current_heading > heading - 10) {
            pins.servoWritePin(AnalogPin.P15, 98 - servoOffset)
            basic.showLeds(`
                . . . . .
                . . . # .
                # # # # #
                . . . # .
                . . . . .
                `)
        } else {
            pins.servoWritePin(AnalogPin.P15, 90 - servoOffset)
        }
    }
})
radio.onReceivedValue(function (name, value) {
    serial.writeString("ticks = ")
    serial.writeNumber(value)
    serial.writeLine("1")
})
let current_heading = 0
let value = 0
let heading = 0
let servoOffset = 0
let inchestotravel = 20
let TickCount = 0
let numTickstoTravel = InchesToTick(inchestotravel)
servoOffset = 1
let forward_steer = 90 - servoOffset
pins.setPull(DigitalPin.P8, PinPullMode.PullUp)
serial.writeLine("world")
radio.setGroup(1)
serial.writeLine("Receiver is working")
basic.forever(function () {
    if (TickCount >= numTickstoTravel) {
        motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 0)
        motobit.enable(MotorPower.Off)
    }
    radio.sendValue("ticks", TickCount)
})
