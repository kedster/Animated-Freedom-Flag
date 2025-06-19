let containerCount = 0;

function createFlagContainer() {
    containerCount++;
    const container = document.createElement('div');
    container.className = 'flag-container';
    container.id = `container-${containerCount}`;

    container.innerHTML = `
                <div class="ai-model-label" contenteditable="true">
                    AI Model Name (Click to edit)
                </div>
                <div class="flag-display" id="display-${containerCount}">
                    <div class="placeholder-text">Paste your HTML/CSS code below and click Apply</div>
                </div>
                <textarea class="code-input" id="code-${containerCount}" placeholder="Paste your HTML and CSS code here...
Example:
<div style='width: 300px; height: 200px; background: linear-gradient(to bottom, red 33%, yellow 33% 66%, green 66%);'></div>"></textarea>
                <button class="apply-btn" onclick="applyCode(${containerCount})">Apply Code</button>
                <button class="remove-btn" onclick="removeContainer(${containerCount})">Remove</button>
            `;

    return container;
}

function addFlagContainer() {
    const grid = document.getElementById('flagGrid');
    const container = createFlagContainer();
    grid.appendChild(container);
}

function applyCode(id) {
    const codeInput = document.getElementById(`code-${id}`);
    const displayArea = document.getElementById(`display-${id}`);
    const code = codeInput.value.trim();

    if (code) {
        // Create a safe container for the user's code
        const wrapper = document.createElement('div');
        wrapper.innerHTML = code;

        // Clear the display area and add the new content
        displayArea.innerHTML = '';
        displayArea.appendChild(wrapper);
        displayArea.classList.add('has-content');
    } else {
        displayArea.innerHTML = '<div class="placeholder-text">Paste your HTML/CSS code above and click Apply</div>';
        displayArea.classList.remove('has-content');
    }
}

function removeContainer(id) {
    const container = document.getElementById(`container-${id}`);
    if (container) {
        container.remove();
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
    let exportData = [];

    containers.forEach((container, index) => {
        const modelName = container.querySelector('.ai-model-label').textContent;
        const code = container.querySelector('.code-input').value;
        exportData.push({
            model: modelName,
            code: code
        });
    });

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'juneteenth-flags-comparison.json';
    link.click();
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const containers = document.querySelectorAll('.flag-container');

    containers.forEach(container => {
        const modelName = container.querySelector('.ai-model-label').textContent.toLowerCase();
        const code = container.querySelector('.code-input').value.toLowerCase();

        if (modelName.includes(searchTerm) || code.includes(searchTerm)) {
            container.style.display = 'block';
        } else {
            container.style.display = searchTerm === '' ? 'block' : 'none';
        }
    });
});

// Static example containers
function createStaticContainer(modelName, flagCode) {
    const container = document.createElement('div');
    container.className = 'flag-container static-container';

    container.innerHTML = `
                <div class="ai-model-label static-label">
                    ${modelName}
                </div>
                <div class="flag-display has-content">
                    ${flagCode}
                </div>
            `;

    return container;
}

// Initialize static examples and interactive containers
document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('flagGrid');

    // Add 6 static example containers
    const staticExamples = [
        {
            name: "ChatGPT-4",
            code: `<div style="width: 100%; max-width: 400px; height: 240px; background: linear-gradient(to bottom, #0033a0 0% 50%, #d52b1e 50% 100%); border: 2px solid #000; border-radius: 8px; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 45%; left: -10%; width: 120%; height: 200%; background: white; border-radius: 50%; z-index: 1;"></div>
      <div style="position: absolute; top: 50%; left: 50%; width: 80px; height: 80px; transform: translate(-50%, -50%); z-index: 2;">
        <div style="position: absolute; width: 100%; height: 100%; background: white; border-radius: 50%; clip-path: polygon(50% 0%, 58% 38%, 95% 38%, 63% 59%, 75% 100%, 50% 75%, 25% 100%, 37% 59%, 5% 38%, 42% 38%); opacity: 0.6;"></div>
        <div style="position: absolute; width: 100%; height: 100%; background: white; border-radius: 50%; clip-path: polygon(50% 0%, 58% 38%, 95% 38%, 63% 59%, 75% 100%, 50% 75%, 25% 100%, 37% 59%, 5% 38%, 42% 38%);"></div>
      </div>
      <div style="position: absolute; top: 50%; left: 50%; width: 30px; height: 30px; background: white; transform: translate(-50%, -50%); clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); z-index: 3;"></div>
    </div>`
        },
        {
            name: "Claude Sonnet",
            code: `<div style="width:100%;max-width:400px;height:240px;position:relative;border:2px solid #333;box-shadow:0 4px 8px rgba(0,0,0,0.2);overflow:hidden;background:linear-gradient(to bottom,#DC143C 0%,#DC143C 33.33%,#FFFFFF 33.33%,#FFFFFF 66.66%,#1E3A8A 66.66%,#1E3A8A 100%)"><svg style="position:absolute;left:20%;top:50%;transform:translateY(-50%);width:40px;height:40px;fill:#FFFFFF" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:120px;height:120px;border:4px solid #FFFFFF;border-radius:50%;background:transparent"></div></div>`
        },
        {
            name: "Gemini Pro",
            code: `<div style="position: relative; width: 100%; max-width: 400px; height: 240px; overflow: hidden; margin: 20px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">

  <!-- Top Red Half -->
  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 50%; background-color: #C8102E;"></div>

  <!-- Bottom Blue Half -->
  <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 50%; background-color: #002868;"></div>

  <!-- Curved Arc Container (clips the arc shape) -->
  <div style="position: absolute; width: 100%; height: 70px; left: 0; top: calc(50% - 35px); z-index: 5; overflow: hidden;">
    <!-- The Arc Shape (created from the top of a large, clipped oval) -->
    <div style="position: absolute; width: 140%; height: 200px; left: -20%; top: 0; border-radius: 50%; background-color: white;"></div>
  </div>

  <!-- Starburst Container -->
  <div style="position: absolute; top: 50%; left: 50%; width: 120px; height: 120px; transform: translate(-50%, -50%); z-index: 10;">
    <!-- Starburst Rays (created by rotating thin divs) -->
    <div style="position: absolute; width: 100%; height: 8px; top: calc(50% - 4px); left: 0; background-color: white; transform: rotate(0deg);"></div>
    <div style="position: absolute; width: 100%; height: 8px; top: calc(50% - 4px); left: 0; background-color: white; transform: rotate(30deg);"></div>
    <div style="position: absolute; width: 100%; height: 8px; top: calc(50% - 4px); left: 0; background-color: white; transform: rotate(60deg);"></div>
    <div style="position: absolute; width: 100%; height: 8px; top: calc(50% - 4px); left: 0; background-color: white; transform: rotate(90deg);"></div>
    <div style="position: absolute; width: 100%; height: 8px; top: calc(50% - 4px); left: 0; background-color: white; transform: rotate(120deg);"></div>
    <div style="position: absolute; width: 100%; height: 8px; top: calc(50% - 4px); left: 0; background-color: white; transform: rotate(150deg);"></div>
  </div>

</div>
`
        },
        {
            name: "GPT-4 Turbo",
            code: `<div style="width: 100%; height: 200px; background: conic-gradient(from 0deg, #dc143c 0deg 120deg, #ffd700 120deg 240deg, #228b22 240deg 360deg); border: 2px solid #000; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">Sample Flag Design</div>`
        },
        {
            name: "Llama 3",
            code: `<div style="position: relative; width: 100%; max-width: 400px; height: 240px; display: flex; flex-direction: column;">
  <!-- Red, white, and blue horizontal stripes -->
  <div style="background-color: #FF0000; flex: 1;"></div>
  <div style="background-color: #FFFFFF; flex: 1;"></div>
  <div style="background-color: #0000FF; flex: 1;"></div>
  
  <!-- White starburst in center -->
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
    <svg width="100" height="100" viewBox="0 0 100 100">
      <polygon points="50,0 61.8,37.5 100,37.5 70.9,61.1 82.5,100 50,80.9 17.5,100 29.1,61.1 0,37.5 38.2,37.5" fill="#FFFFFF"/>
    </svg>
  </div>
  
  <!-- White curved arc spanning the width -->
  <div style="position: absolute; top: 50%; left: 0; width: 100%; height: 20px; border-radius: 50%; border-top: 5px solid #FFFFFF;"></div>
</div>`
        },
        {
            name: "Mistral AI",
            code: `    <div style="
        width: 100%;
        max-width: 400px;
        height: 240px;
        position: relative;
        overflow: hidden;
        border: 1px solid #000;
    ">
        <div style="
            width: 100%;
            height: 33.33%;
            background-color: red;
        "></div>
        <div style="
            width: 100%;
            height: 33.33%;
            background-color: white;
            position: relative;
        ">
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 60px;
                height: 60px;
                background-color: white;
                clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            "></div>
            <div style="
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 20px;
                background-color: white;
                border-radius: 50%;
                transform: translateY(-50%);
            "></div>
        </div>
        <div style="
            width: 100%;
            height: 33.33%;
            background-color: blue;
        "></div>
    </div>`
        }
    ];

    // Add static examples first
    staticExamples.forEach(example => {
        const container = createStaticContainer(example.name, example.code);
        grid.appendChild(container);
    });

    // Add one interactive container
    addFlagContainer();
});
