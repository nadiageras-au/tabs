// document.addEventListener("DOMContentLoaded", function () {
//     debugger;
//     let data = {};
//
//     const tagColors = [
//         { name: 'Raw Water', color: 'green' },
//         { name: 'Potable Water', color: 'blue' },
//         { name: 'Recycled Water', color: 'purple' },
//         { name: 'Sea Water', color: 'purple' },
//         { name: 'Pressute Sewage and Sludges', color: 'lightgreen' },
//         { name: 'Storm Water', color: 'darkgrey' },
//         { name: 'Sand Gravel and Slurries', color: 'darkgrey' },
//         { name: 'Medium Pressure Gas', color: 'yellow' },
//         { name: 'Low Pressure Gas', color: 'yellow' },
//         { name: 'Electrical Cables', color: 'orange' },
//         { name: 'Telecommunications Cables', color: 'lightgrey' },
//         { name: 'Cathodic Protection', color: 'lightgrey' },
//         { name: 'Earthing Cables', color: 'lightgrey' },
//         { name: 'Ground Dewatering', color: 'darkgrey' },
//         { name: 'Ethanol and Biofuels', color: 'yellow' },
//         { name: 'Hydrogen Compounds', color: 'yellow' },
//         { name: 'Hydrogen', color: 'yellow' },
//         { name: 'Fuel/Gasoline', color: 'yellow' },
//         { name: 'Diesel', color: 'yellow' },
//         { name: 'Jet fuel', color: 'yellow' },
//         { name: 'High/Transmission Pressure Gas', color: 'yellow' },
//         { name: 'Gravity Sewage and Sludges', color: 'grey' },
//         { name: 'Sleeve Enveloper or Casing Pipe', color: 'grey' }
//     ];
//
//     function parseCSV(text) {
//         const rows = text.trim().split("\n");
//         const headers = rows[0].split(",");
//         for (let i = 1; i < rows.length; i++) {
//             const cells = rows[i].split(",");
//             const sleeve = cells[0];
//             const pipe = cells[1];
//             const setup = cells[2];
//             const tag = cells[3];
//
//             if (!data[sleeve]) {
//                 data[sleeve] = {
//                     pipeMaterials: {}
//                 };
//             }
//
//             if (!data[sleeve].pipeMaterials[pipe]) {
//                 data[sleeve].pipeMaterials[pipe] = {
//                     setups: [],
//                     tags: []
//                 };
//             }
//
//             if (!data[sleeve].pipeMaterials[pipe].setups.some(s => s.name === setup)) {
//                 data[sleeve].pipeMaterials[pipe].setups.push({ name: setup, tags: [] });
//             }
//
//             const setupObject = data[sleeve].pipeMaterials[pipe].setups.find(s => s.name === setup);
//             if (!setupObject.tags.includes(tag)) {
//                 setupObject.tags.push(tag);
//             }
//
//             if (!data[sleeve].pipeMaterials[pipe].tags.includes(tag)) {
//                 data[sleeve].pipeMaterials[pipe].tags.push(tag);
//             }
//         }
//     }
//
//     fetch("./filters-pipes.csv")
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.text();
//         })
//         .then(csv => {
//             parseCSV(csv);
//
//             const tabs = document.querySelector('.filter-pipes-widget__tabs');
//             const pipeButtons = document.querySelector('.filter-pipes-widget__pipe-buttons');
//             const setupCards = document.querySelector('.filter-pipes-widget__setup-cards');
//             const tagsColumn = document.querySelector(".filter-pipes-widget__tags");
//
//             const sleeveOrder = ["No Sleeve", "Steel", "HDPE", "Jacking Pipe"];
//             sleeveOrder.forEach(sleeve => {
//                 if (data[sleeve]) {
//                     const tab = document.createElement('div');
//                     tab.classList.add('filter-pipes-widget__tab');
//                     tab.textContent = sleeve;
//                     tab.addEventListener('click', function () {
//                         document.querySelectorAll('.filter-pipes-widget__tab').forEach(t => t.classList.remove('active'));
//                         tab.classList.add('active');
//                         updatePipeButtons();
//                         updateTags();
//                         updateSetupCards();
//                     });
//                     tabs.appendChild(tab);
//                 }
//             });
//
//             function updatePipeButtons() {
//                 pipeButtons.innerHTML = '';
//                 const activeSleeve = document.querySelector('.filter-pipes-widget__tab.active').textContent;
//                 const pipes = Object.keys(data[activeSleeve].pipeMaterials);
//                 const isSmallContainer = document.querySelector('.filter-pipes-widget__container').offsetWidth < 500;
//
//                 pipes.forEach((pipe, index) => {
//                     const btn = document.createElement('div');
//                     btn.classList.add('filter-pipes-widget__pipe-button');
//                     let displayText = pipe;
//
//                     if (isSmallContainer && pipe.length > 7 && pipe !== "Drill pipe") {
// // 						debugger;
//                         displayText = pipe.substring(0, 7);
//                     }
//
//                     btn.textContent = displayText;
//                     btn.addEventListener('click', function () {
//
//                         document.querySelectorAll('.filter-pipes-widget__pipe-button').forEach(b => b.classList.remove('active'));
//                         btn.classList.add('active');
//                         updateTags();
//                         updateSetupCards();
//                     });
//                     pipeButtons.appendChild(btn);
//                     if (index === 0) {
//                         btn.click();
//                     }
//                 });
//             }
//
//             function updateSetupCards() {
//                 setupCards.innerHTML = '';
//                 const activeSleeve = document.querySelector('.filter-pipes-widget__tab.active').textContent;
//                 //change the code for pipeNames
//                 let pipeName = document.querySelector('.filter-pipes-widget__pipe-button.active').textContent;
//
//                 switch (pipeName) {
//                     case "Steel C":
//                         pipeName = "Steel Coated";
//                         break;
//                     case "Steel B"	:
//                         pipeName= "Steel Bare";
//                         break;
//                     default:
//                         break;
//                 }
//
//                 const activePipe = document.querySelector('.filter-pipes-widget__pipe-button.active') ? pipeName : null;
//                 //end the code changing for pipeNames
//                 if (!activePipe) return;
//
//                 const setups = data[activeSleeve].pipeMaterials[activePipe].setups;
//                 setups.forEach(setup => {
//                     const cardBgSrc = `https://dev.borely.com/wp-content/uploads/2024/07/${(activeSleeve.split(' ').join('_')).toLowerCase()}_${(activePipe.split(' ').join('_')).toLowerCase()}_${(setup.name.split(' ').join('_')).toLowerCase()}.png`;
//                     const card = document.createElement('div');
//                     card.classList.add('filter-pipes-widget__setup-card');
//
//                     card.style.backgroundImage = 'url("' + cardBgSrc + '")';
//                     card.style.backgroundSize = 'cover'; // Ensures the background covers the entire div
//                     card.style.backgroundPosition = 'center';
//                     card.addEventListener('click', function () {
//                         document.querySelectorAll('.filter-pipes-widget__setup-card').forEach(card => {
//                             card.classList.remove('selected');
//                         });
//                         this.classList.add('selected');
//                         updateTagsForSetup(setup.tags);
//                     });
//
//                     const title = document.createElement('div');
//                     title.textContent = `${setup.name}`;
//                     card.appendChild(title);
//
//                     setupCards.appendChild(card);
//                 });
//             }
//
//
//             function getColorForTag(tagName) {
//                 const tag = tagColors.find(t => t.name == tagName);
//                 return tag ? tag.color : null;
//             }
//
//             function updateTags() {
//
//                 const activeSleeve = document.querySelector('.filter-pipes-widget__tab.active').textContent;
//                 //change the code for pipeNames
//                 let pipeName = document.querySelector('.filter-pipes-widget__pipe-button.active').textContent;
//
//                 switch (pipeName) {
//                     case "Steel C":
//                         pipeName = "Steel Coated";
//                         break;
//                     case "Steel B"	:
//                         pipeName= "Steel Bare";
//                         break;
//                     default:
//                         break;
//                 }
//
//                 const activePipe = document.querySelector('.filter-pipes-widget__pipe-button.active') ? pipeName : null;
//                 //end the code changing for pipeNames
//                 if (!activePipe) return;
//                 const pipeTags = data[activeSleeve].pipeMaterials[activePipe].tags;
//                 updateTagsForSetup(pipeTags);
//             }
//
//             function updateTagsForSetup(tags) {
//                 tagsColumn.innerHTML = '';
//                 tags.forEach(tagName => {
//                     const tagElem = document.createElement('div');
//                     tagElem.classList.add('filter-pipes-widget__tag');
//                     tagElem.textContent = tagName.split(/\r\n|\n|\r/).join('');
//
//                     const tagColor = getColorForTag(tagName.split(/\r\n|\n|\r/).join(''));
//                     if (tagColor) {
//                         tagElem.classList.add(`filter-pipes-widget__tag--${tagColor}`);
//                     }
//
//                     tagsColumn.appendChild(tagElem);
//                 });
//                 applyTagStyles();
//             }
//
//             document.querySelector('.filter-pipes-widget__tab').click();
//
//
//             // ResizeObserver to handle container resize
//             const container = document.querySelector('.filter-pipes-widget__container');
//             const resizeObserver = new ResizeObserver(() => {
//                 updatePipeButtons();
//             });
//             resizeObserver.observe(container);
//         })
//         // .catch(error => {
//         //     console.error('There was a problem with the fetch operation:', error);
//         // });
//
// // 	to get tag width in pixel for responsiveness
//     function getTextWidth(text, font) {
//         const canvas = document.createElement('canvas');
//         const context = canvas.getContext('2d');
//         context.font = font;
//         return context.measureText(text).width;
//     }
//
//     function applyTagStyles() {
//         const tags = document.querySelectorAll('.filter-pipes-widget__tag');
//         const isSmallScreen = window.innerWidth < 577;
//         tags.forEach((tag) => {
//             const style = getComputedStyle(tag);
//             const font = `${style.fontSize} ${style.fontFamily}`;
//             const textWidth = getTextWidth(tag.textContent, font);
//             const minWidth = textWidth + (isSmallScreen ? 12 : 16); // Adjusting based on screen size
//             const maxWidth = textWidth + 132;
//
//             tag.style.minWidth = `${minWidth}px`;
//             tag.style.maxWidth = `${maxWidth}px`;
//         });
//     }
//
//     window.addEventListener('resize', applyTagStyles);
// });


document.addEventListener("DOMContentLoaded", function () {
    debugger;
    let data = {};

    const tagColors = [
        { name: 'Raw Water', color: 'green' },
        { name: 'Potable Water', color: 'blue' },
        { name: 'Recycled Water', color: 'purple' },
        { name: 'Sea Water', color: 'purple' },
        { name: 'Pressute Sewage and Sludges', color: 'lightgreen' },
        { name: 'Storm Water', color: 'darkgrey' },
        { name: 'Sand Gravel and Slurries', color: 'darkgrey' },
        { name: 'Medium Pressure Gas', color: 'yellow' },
        { name: 'Low Pressure Gas', color: 'yellow' },
        { name: 'Electrical Cables', color: 'orange' },
        { name: 'Telecommunications Cables', color: 'lightgrey' },
        { name: 'Cathodic Protection', color: 'lightgrey' },
        { name: 'Earthing Cables', color: 'lightgrey' },
        { name: 'Ground Dewatering', color: 'darkgrey' },
        { name: 'Ethanol and Biofuels', color: 'yellow' },
        { name: 'Hydrogen Compounds', color: 'yellow' },
        { name: 'Hydrogen', color: 'yellow' },
        { name: 'Fuel/Gasoline', color: 'yellow' },
        { name: 'Diesel', color: 'yellow' },
        { name: 'Jet fuel', color: 'yellow' },
        { name: 'High/Transmission Pressure Gas', color: 'yellow' },
        { name: 'Gravity Sewage and Sludges', color: 'grey' },
        { name: 'Sleeve Enveloper or Casing Pipe', color: 'grey' }
    ];

    function parseCSV(text) {
        const rows = text.trim().split("\n");
        const headers = rows[0].split(",");
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].split(",");
            const sleeve = cells[0];
            const pipe = cells[1];
            const setup = cells[2];
            const tag = cells[3];

            if (!data[sleeve]) {
                data[sleeve] = {
                    pipeMaterials: {}
                };
            }

            if (!data[sleeve].pipeMaterials[pipe]) {
                data[sleeve].pipeMaterials[pipe] = {
                    setups: [],
                    tags: []
                };
            }

            if (!data[sleeve].pipeMaterials[pipe].setups.some(s => s.name === setup)) {
                data[sleeve].pipeMaterials[pipe].setups.push({ name: setup, tags: [] });
            }

            const setupObject = data[sleeve].pipeMaterials[pipe].setups.find(s => s.name === setup);
            if (!setupObject.tags.includes(tag)) {
                setupObject.tags.push(tag);
            }

            if (!data[sleeve].pipeMaterials[pipe].tags.includes(tag)) {
                data[sleeve].pipeMaterials[pipe].tags.push(tag);
            }
        }
    }

    fetch("./filters-pipes.csv")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(csv => {
            parseCSV(csv);

            const tabs = document.querySelector('.filter-pipes-widget__tabs');
            const pipeButtons = document.querySelector('.filter-pipes-widget__pipe-buttons');
            const setupCards = document.querySelector('.filter-pipes-widget__setup-cards');
            const tagsColumn = document.querySelector(".filter-pipes-widget__tags");

            const sleeveOrder = ["No Sleeve", "Steel", "HDPE", "Jacking Pipe"];
            sleeveOrder.forEach(sleeve => {
                if (data[sleeve]) {
                    const tab = document.createElement('div');
                    tab.classList.add('filter-pipes-widget__tab');
                    tab.textContent = sleeve;
                    tab.addEventListener('click', function () {
                        document.querySelectorAll('.filter-pipes-widget__tab').forEach(t => t.classList.remove('active'));
                        tab.classList.add('active');
                        updatePipeButtons();
                        updateTags();
                        updateSetupCards();
                    });
                    tabs.appendChild(tab);
                }
            });

            function updatePipeButtons() {
                pipeButtons.innerHTML = '';
                const activeSleeve = document.querySelector('.filter-pipes-widget__tab.active').textContent;
                const pipes = Object.keys(data[activeSleeve].pipeMaterials);
                const isSmallContainer = document.querySelector('.filter-pipes-widget__container').offsetWidth < 500;

                pipes.forEach((pipe, index) => {
                    const btn = document.createElement('div');
                    btn.classList.add('filter-pipes-widget__pipe-button');
                    let displayText = pipe;

                    if (isSmallContainer && pipe.length > 7 && pipe !== "Drill pipe") {
                        displayText = pipe.substring(0, 7);
                    }

                    btn.textContent = displayText;
                    btn.addEventListener('click', function () {
                        document.querySelectorAll('.filter-pipes-widget__pipe-button').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        updateTags();
                        updateSetupCards();
                    });
                    pipeButtons.appendChild(btn);
                    if (index === 0) {
                        btn.click();
                    }
                });
            }

            function updateSetupCards() {
                setupCards.innerHTML = '';
                const activeSleeve = document.querySelector('.filter-pipes-widget__tab.active').textContent;
                let pipeName = document.querySelector('.filter-pipes-widget__pipe-button.active').textContent;

                switch (pipeName) {
                    case "Steel C":
                        pipeName = "Steel Coated";
                        break;
                    case "Steel B":
                        pipeName = "Steel Bare";
                        break;
                    default:
                        break;
                }

                const activePipe = document.querySelector('.filter-pipes-widget__pipe-button.active') ? pipeName : null;
                if (!activePipe) return;

                const setups = data[activeSleeve].pipeMaterials[activePipe].setups;
                setups.forEach(setup => {
                    const cardBgSrc = `https://dev.borely.com/wp-content/uploads/2024/07/${(activeSleeve.split(' ').join('_')).toLowerCase()}_${(activePipe.split(' ').join('_')).toLowerCase()}_${(setup.name.split(' ').join('_')).toLowerCase()}.png`;
    const card = document.createElement('div');
card.classList.add('filter-pipes-widget__setup-card');

card.style.backgroundImage = 'url("' + cardBgSrc + '")';
card.style.backgroundSize = 'cover';
card.style.backgroundPosition = 'center';
card.addEventListener('click', function () {
    document.querySelectorAll('.filter-pipes-widget__setup-card').forEach(card => {
        card.classList.remove('selected');
    });
    this.classList.add('selected');
    updateTagsForSetup(setup.tags);
});

const title = document.createElement('div');
title.textContent = `${setup.name}`;
card.appendChild(title);

setupCards.appendChild(card);
});
}

function getColorForTag(tagName) {
    const tag = tagColors.find(t => t.name == tagName);
    return tag ? tag.color : null;
}

function updateTags() {
    const activeSleeve = document.querySelector('.filter-pipes-widget__tab.active').textContent;
    let pipeName = document.querySelector('.filter-pipes-widget__pipe-button.active').textContent;

    switch (pipeName) {
        case "Steel C":
            pipeName = "Steel Coated";
            break;
        case "Steel B":
            pipeName = "Steel Bare";
            break;
        default:
            break;
    }

    const activePipe = document.querySelector('.filter-pipes-widget__pipe-button.active') ? pipeName : null;
    if (!activePipe) return;
    const pipeTags = data[activeSleeve].pipeMaterials[activePipe].tags;
    updateTagsForSetup(pipeTags);
}

function updateTagsForSetup(tags) {
    tagsColumn.innerHTML = '';
    tags.forEach(tagName => {
        const tagElem = document.createElement('div');
        tagElem.classList.add('filter-pipes-widget__tag');
        tagElem.textContent = tagName.split(/\r\n|\n|\r/).join('');

        const tagColor = getColorForTag(tagName.split(/\r\n|\n|\r/).join(''));
        if (tagColor) {
            tagElem.classList.add(`filter-pipes-widget__tag--${tagColor}`);
        }

        tagsColumn.appendChild(tagElem);
    });
    applyTagStyles();
}

document.querySelector('.filter-pipes-widget__tab').click();

const container = document.querySelector('.filter-pipes-widget__container');
const resizeObserver = new ResizeObserver(() => {
    updatePipeButtons();
});
resizeObserver.observe(container);
});

function getTextWidth(text, font) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    return context.measureText(text).width;
}

function applyTagStyles() {
    const tags = document.querySelectorAll('.filter-pipes-widget__tag');
    const isSmallScreen = window.innerWidth < 577;
    tags.forEach((tag) => {
        const style = getComputedStyle(tag);
        const font = `${style.fontSize} ${style.fontFamily}`;
        const textWidth = getTextWidth(tag.textContent, font);
        const minWidth = textWidth + (isSmallScreen ? 12 : 16);
        const maxWidth = textWidth + 132;

        tag.style.minWidth = `${minWidth}px`;
        tag.style.maxWidth = `${maxWidth}px`;
    });
}

window.addEventListener('resize', applyTagStyles);
});
