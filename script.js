let containerCount = 0;

function createFlagContainer() {
    containerCount++;
    const container = document.createElement('div');
    container.className = 'flag-container';
    container.id = 'container-' + containerCount;

    container.innerHTML =
        '<div class="ai-model-label" contenteditable="true">' +
        'AI Model Name (Click to edit)' +
        '</div>' +
        '<div class="flag-display" id="display-' + containerCount + '">' +
        '<div class="placeholder-text">Paste your HTML/CSS code below and click Apply</div>' +
        '</div>' +
        '<textarea class="code-input" id="code-' + containerCount + '" placeholder="Paste your HTML and CSS code here...\nExample:\n<div style=\'width: 300px; height: 200px; background: linear-gradient(to bottom, red 33%, yellow 33% 66%, green 66%);\'></div>"></textarea>' +
        '<button class="apply-btn" onclick="applyCode(' + containerCount + ')">Apply Code</button>' +
        '<button class="remove-btn" onclick="removeContainer(' + containerCount + ')">Remove</button>';

    return container;
}

function addFlagContainer() {
    const grid = document.getElementById('flagGrid');
    const container = createFlagContainer();
    grid.appendChild(container);
}

function applyCode(id) {
    const codeInput = document.getElementById('code-' + id);
    const displayArea = document.getElementById('display-' + id);
    const code = codeInput.value.trim();

    if (code) {
        try {
            // Create a safe container for the user's code
            const wrapper = document.createElement('div');
            wrapper.innerHTML = code;

            // Clear the display area and add the new content
            displayArea.innerHTML = '';
            displayArea.appendChild(wrapper);

            // Use className instead of classList for better compatibility
            if (displayArea.className.indexOf('has-content') === -1) {
                displayArea.className += ' has-content';
            }
        } catch (error) {
            console.error('Error applying code:', error);
            displayArea.innerHTML = '<div class="placeholder-text">Error loading flag. Please check your HTML/CSS code.</div>';
        }
    } else {
        displayArea.innerHTML = '<div class="placeholder-text">Paste your HTML/CSS code above and click Apply</div>';
        displayArea.className = displayArea.className.replace(/\bhas-content\b/g, '').trim();
    }
}

function removeContainer(id) {
    const container = document.getElementById('container-' + id);
    if (container) {
        container.parentNode.removeChild(container);
    }
}

function clearAll() {
    if (confirm('Are you sure you want to remove all flag comparisons?')) {
        document.getElementById('flagGrid').innerHTML = '';
        containerCount = 0;
    }
}

function exportComparison() {
    const containers = document.querySelectorAll('.flag-container');
    var exportData = [];

    for (var i = 0; i < containers.length; i++) {
        const container = containers[i];
        const modelName = container.querySelector('.ai-model-label').textContent || container.querySelector('.ai-model-label').innerText;
        const codeInput = container.querySelector('.code-input');
        const code = codeInput ? codeInput.value : '';

        exportData.push({
            model: modelName,
            code: code
        });
    }

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    // Check if URL.createObjectURL is supported
    if (typeof URL !== 'undefined' && URL.createObjectURL) {
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'juneteenth-flags-comparison.json';
        link.click();
    } else {
        alert('Export feature not supported in this browser. Please use a modern browser.');
    }
}



// Static example containers
function createStaticContainer(modelName, flagCode) {
    const container = document.createElement('div');
    container.className = 'flag-container static-container';

    container.innerHTML =
        '<div class="ai-model-label static-label">' +
        modelName +
        '</div>' +
        '<div class="flag-display has-content">' +
        flagCode +
        '</div>';

    return container;
}

// Initialize static examples and interactive containers
function initializePage() {
    const grid = document.getElementById('flagGrid');
    if (!grid) {
        console.error('Flag grid not found');
        return;
    }

    // Add 6 static example containers
    const staticExamples = [
        {
            name: "ChatGPT-4",
            code: '<div style="width: 100%; max-width: 400px; height: 240px; background: linear-gradient(to bottom, #0033a0 0%, #0033a0 50%, #d52b1e 50%, #d52b1e 100%); border: 2px solid #000; border-radius: 8px; position: relative; overflow: hidden;">' +
                '<div style="position: absolute; top: 45%; left: -10%; width: 120%; height: 200%; background: white; border-radius: 50%; z-index: 1;"></div>' +
                '<div style="position: absolute; top: 50%; left: 50%; width: 80px; height: 80px; transform: translate(-50%, -50%); z-index: 2;">' +
                '<div style="position: absolute; width: 100%; height: 100%; background: white; border-radius: 50%; opacity: 0.6;"></div>' +
                '<div style="position: absolute; width: 100%; height: 100%; background: white; border-radius: 50%;"></div>' +
                '</div>' +
                '<div style="position: absolute; top: 50%; left: 50%; width: 30px; height: 30px; background: white; transform: translate(-50%, -50%); z-index: 3;"></div>' +
                '</div>'
        },
        {
            name: "Claude Sonnet",
            code: '<div style="width:100%;max-width:400px;height:240px;position:relative;border:2px solid #333;box-shadow:0 4px 8px rgba(0,0,0,0.2);overflow:hidden;background:linear-gradient(to bottom,#DC143C 0%,#DC143C 33.33%,#FFFFFF 33.33%,#FFFFFF 66.66%,#1E3A8A 66.66%,#1E3A8A 100%)">' +
                '<svg style="position:absolute;left:20%;top:50%;transform:translateY(-50%);width:40px;height:40px;fill:#FFFFFF" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' +
                '<div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:120px;height:120px;border:4px solid #FFFFFF;border-radius:50%;background:transparent"></div>' +
                '</div>'
        },
        {
            name: "Gemini Pro",
            code: '<div style="position: relative; width: 100%; max-width: 400px; height: 240px; overflow: hidden; margin: 20px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">' +
                '<div style="position: absolute; top: 0; left: 0; width: 100%; height: 50%; background-color: #C8102E;"></div>' +
                '<div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background-color: #002868;"></div>' +
                '<div style="position: absolute; width: 100%; height: 70px; left: 0; top: calc(50% - 35px); z-index: 5; overflow: hidden;">' +
                '<div style="position: absolute; width: 140%; height: 200px; left: -20%; top: 0; border-radius: 50%; background-color: white;"></div>' +
                '</div>' +
                '<div style="position: absolute; top: 50%; left: 50%; width: 120px; height: 120px; transform: translate(-50%, -50%); z-index: 10;">' +
                '<div style="position: absolute; width: 100%; height: 8px; top: calc(50% - 4px); left: 0; background-color: white; transform: rotate(0deg);"></div>' +
                '<div style="position: absolute; width: 100%; height: 8px; top: calc(50% - 4px); left: 0; background-color: white; transform: rotate(30deg);"></div>' +
                '<div style="position: absolute; width: 100%; height: 8px; top: calc(50% - 4px); left: 0; background-color: white; transform: rotate(60deg);"></div>' +
                '<div style="position: absolute; width: 100%; height: 8px; top: calc(50% - 4px); left: 0; background-color: white; transform: rotate(90deg);"></div>' +
                '<div style="position: absolute; width: 100%; height: 8px; top: calc(50% - 4px); left: 0; background-color: white; transform: rotate(120deg);"></div>' +
                '<div style="position: absolute; width: 100%; height: 8px; top: calc(50% - 4px); left: 0; background-color: white; transform: rotate(150deg);"></div>' +
                '</div>' +
                '</div>'
        },
        {
            name: "GPT-4 Turbo",
            code: '<div style="width: 100%; max-width: 400px; height: 240px; position: relative; border: 1px solid #000;">' +
                '<div style="background: #e4002b; height: 33.33%; width: 100%;"></div>' +
                '<div style="background: #ffffff; height: 33.33%; width: 100%;"></div>' +
                '<div style="background: #002868; height: 33.34%; width: 100%;"></div>' +
                '<svg viewBox="0 0 500 300" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">' +
                '<path d="M0,180 Q250,60 500,180" fill="none" stroke="white" stroke-width="6" />' +
                '</svg>' +
                '<svg viewBox="0 0 100 100" style="position: absolute; top: 50%; left: 50%; width: 60px; height: 60px; transform: translate(-50%, -50%);">' +
                '<g fill="white">' +
                '<circle cx="50" cy="50" r="6" />' +
                '<g stroke="white" stroke-width="2">' +
                '<line x1="50" y1="20" x2="50" y2="0" />' +
                '<line x1="50" y1="80" x2="50" y2="100" />' +
                '<line x1="20" y1="50" x2="0" y2="50" />' +
                '<line x1="80" y1="50" x2="100" y2="50" />' +
                '<line x1="30" y1="30" x2="15" y2="15" />' +
                '<line x1="70" y1="30" x2="85" y2="15" />' +
                '<line x1="30" y1="70" x2="15" y2="85" />' +
                '<line x1="70" y1="70" x2="85" y2="85" />' +
                '</g>' +
                '</g>' +
                '</svg>' +
                '</div>'
        },
        {
            name: "Llama 3",
            code: '<div style="position: relative; width: 100%; max-width: 400px; height: 240px; display: flex; flex-direction: column;">' +
                '<div style="background-color: #FF0000; flex: 1;"></div>' +
                '<div style="background-color: #FFFFFF; flex: 1;"></div>' +
                '<div style="background-color: #0000FF; flex: 1;"></div>' +
                '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">' +
                '<svg width="100" height="100" viewBox="0 0 100 100">' +
                '<polygon points="50,0 61.8,37.5 100,37.5 70.9,61.1 82.5,100 50,80.9 17.5,100 29.1,61.1 0,37.5 38.2,37.5" fill="#FFFFFF"/>' +
                '</svg>' +
                '</div>' +
                '<div style="position: absolute; top: 50%; left: 0; width: 100%; height: 20px; border-radius: 50%; border-top: 5px solid #FFFFFF;"></div>' +
                '</div>'
        },
        {
            name: "Mistral AI",
            code: '<div style="width: 100%; max-width: 400px; height: 240px; position: relative; overflow: hidden; border: 1px solid #000;">' +
                '<div style="width: 100%; height: 33.33%; background-color: red;"></div>' +
                '<div style="width: 100%; height: 33.33%; background-color: white; position: relative;">' +
                '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60px; height: 60px; background-color: white;"></div>' +
                '<div style="position: absolute; top: 50%; left: 0; width: 100%; height: 20px; background-color: white; border-radius: 50%; transform: translateY(-50%);"></div>' +
                '</div>' +
                '<div style="width: 100%; height: 33.33%; background-color: blue;"></div>' +
                '</div>'
        },
        {
            name: "Juneteenth Flag",
            code: `<a href="juneteenth-flag-full-small.png" target="_blank" rel="noopener noreferrer">
                    <img 
                        src="juneteenth-flag-full-small.png" 
                        alt="Juneteenth Flag" 
                        style="width:100%; max-width:400px; height:240px; display:block; border:1px solid #000;" />
                    </a>`
        }
    ];

    // Add static examples first
    for (var i = 0; i < staticExamples.length; i++) {
        const example = staticExamples[i];
        const container = createStaticContainer(example.name, example.code);
        grid.appendChild(container);
    }

    // Add one interactive container
    addFlagContainer();

    // Initialize search functionality
    initializeSearch();
}

// Use both DOMContentLoaded and window.onload for maximum compatibility
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

// Fallback for older browsers
window.onload = function () {
    // Only initialize if not already done
    if (document.getElementById('flagGrid').children.length === 0) {
        initializePage();
    }
};