class Event {
    time = 0;
    name = "";
    
    constructor(time, name) {
        this.time = time;
        this.name = name;
    }
}

function draw(event) {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(255 255 255)";
        ctx.fillRect(0, 0, 600, 300);
        
        currentPosition = Math.min(Math.max(0, currentPosition + event.deltaY * -0.1), maxPosition);
        console.log(currentPosition);

        flipped = true;
        
        x1 = 0;
        y1 = 150;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        
        for (let i = 0; i < events.length; i++) {
            y2 = 100;

            if (flipped) {
                y2 = 200;
            } else {
                y2 = 100;
            }

            if (events[i].time > currentPosition && events[i].time - currentPosition < 600) {
                x2 = events[i].time - currentPosition;

                
                

                ctx.font = "48px serif mono";
                const text = ctx.measureText(events[i].name);                
                ctx.textBaseline = "middle";
                if (flipped) {
                    ctx.fillStyle = "rgb(0 0 0)";
                    ctx.fillRect(x2 - text.width * 0.5, y2, text.width, 24);
                    ctx.fillStyle = "rgb(255 255 255)";
                    ctx.fillText(events[i].name, x2 - text.width * 0.5, y2 + 12);
                } else {
                    ctx.fillStyle = "rgb(0 0 0)";
                    ctx.fillRect(x2 - text.width * 0.5, y2 - 24, text.width, 24);
                    ctx.fillStyle = "rgb(255 255 255)";
                    ctx.fillText(events[i].name, x2 - text.width * 0.5, y2 - 12);
                }
                
                
                ctx.lineTo(x2, 150);
                ctx.lineTo(x2, y2);
                ctx.lineTo(x2, 150);

                flipped = !flipped;
            }
        }
        
        ctx.lineTo(600, y1);
        
        ctx.stroke();
    }
}
let currentPosition = 0;
const maxPosition = 600;

const events = [new Event(0, "Start")];

document.getElementById("timeline_canvas").addEventListener("wheel", draw);
