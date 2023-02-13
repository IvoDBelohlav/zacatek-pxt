const PERIODA = 10;
const LIGHT_LIMIT = 50;

let start = false;
let done = false;
let avg = 0;

function prumer(x: number) {
    const vaha = 3;

    avg -= avg / vaha;
    avg += x;

    return (avg / vaha);
}


basic.forever(function () {
    radio.setGroup(1)
    radio.setFrequencyBand(20)
    radio.setTransmitPower(5)
    console.logValue("light level", input.lightLevel())
    console.log("\n\r")
    while (true) {
        basic.pause(PERIODA); //aby bylo definovany, jak rychle to bezi
        // mereni svetla musi byt na zacatku, aby to aktualizovalo prumer
        // i v dobe kdy to ceka na tlacitko
        let light = prumer(input.lightLevel());

        if (done === true)
            continue;

        if (start === false)
            continue;

        if (light < LIGHT_LIMIT) {
            radio.sendNumber(1);
            done = true;
        }
    }
})

input.onButtonPressed(Button.A, function () {
    
    music.playTone(Note.C, music.beat(BeatFraction.Whole))
    basic.pause(1000)
    music.playTone(Note.C, music.beat(BeatFraction.Whole))
    basic.pause(1000)
    music.playTone(Note.D, music.beat(BeatFraction.Whole))
    start = true;
})

input.onButtonPressed(Button.B, function () {
    done = false;
})
