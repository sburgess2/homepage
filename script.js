const heading = d3.select(".orchid-box h3");
const phrases = heading.text().split("|").map(d => d.trim());

heading.text(null).attr("aria-label", phrases.join(", "));

const spans = heading
    .selectAll("span")
    .data(phrases)
    .join("span")
    .style("display", "inline-block")
    .style("margin-right", "24px")
    .style("opacity", 0)
    .text(d => d);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const step = 2000;
const fade = 1200;
const hold = 3000;
const pause = 2000;

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

if (reducedMotion) {
    spans.style("opacity", 1);
} else {
    cycle();
    d3.interval(cycle, phrases.length * step + hold + fade + pause);
}
