function createChart(e) {
    const months = document.querySelectorAll(".chart-values li");
    const tasks = document.querySelectorAll(".chart-bars li");
    const tooltip = document.querySelector(".tooltip");
    const monthsArray = [...months];

    tasks.forEach(el => {
        const duration = el.dataset.duration.split("-");
        const startMonth = duration[0];
        const endMonth = duration[1];
        let left = 0, width = 0;

        if (startMonth.endsWith("½")) {
            const filteredArray = monthsArray.filter(month => month.textContent == startMonth.slice(0, -1));
            left = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2;
        } else {
            const filteredArray = monthsArray.filter(month => month.textContent == startMonth);
            left = filteredArray[0].offsetLeft;
        }

        if (endMonth.endsWith("½")) {
            const filteredArray = monthsArray.filter(month => month.textContent == endMonth.slice(0, -1));
            width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth / 2 - left;
        } else {
            const filteredArray = monthsArray.filter(month => month.textContent == endMonth);
            width = filteredArray[0].offsetLeft + filteredArray[0].offsetWidth - left;
        }

        // Apply styles
        el.style.left = `${left}px`;
        el.style.width = `${width}px`;
        if (e.type == "load") {
            el.style.backgroundColor = el.dataset.color;
            el.style.opacity = 1;
        }

        // Add hover event for tooltip
        el.addEventListener("mouseenter", () => {
            tooltip.textContent = el.dataset.period;
            tooltip.style.left = `${left + width / 2}px`;
            tooltip.style.top = `${el.offsetTop - 25}px`;
            tooltip.style.opacity = 1;
            tooltip.style.visibility = "visible";
        });

        el.addEventListener("mouseleave", () => {
            tooltip.style.opacity = 0;
            tooltip.style.visibility = "hidden";
        });
    });
}

window.addEventListener("load", createChart);
window.addEventListener("resize", createChart);
