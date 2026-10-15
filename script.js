const heading = d3.select(".orchid-box h3");
const phrases = heading.text().split("|").map(d => d.trim());

heading.text(null).attr("aria-label", phrases.join(", "));

const spans = heading
    .selectAll("span")
    .data(phrases)
    .join("span")
    .style("display", "block")
    .style("opacity", 0)
    .text(d => d);

const step = 1000;
const fade = 600;
const hold = 2000;
const pause = 600;

function cycle() {
    spans
        .transition("in")
        .delay((d, i) => i * step)
        .duration(fade)
        .style("opacity", 1);

    spans
        .transition("out")
        .delay(phrases.length * step + hold)
        .duration(fade)
        .style("opacity", 0);
}

cycle();
d3.interval(cycle, phrases.length * step + hold + fade + pause);
