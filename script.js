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
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'juneteenth-flags-comparison.json';
            link.click();
        }

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', function() {
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
        document.addEventListener('DOMContentLoaded', function() {
            const grid = document.getElementById('flagGrid');
            
            // Add 6 static example containers
            const staticExamples = [
                {
                    name: "ChatGPT-4",
                    code: `<div style="width: 100%; height: 200px; background: linear-gradient(to bottom, #dc143c 0%, #dc143c 33%, #ffd700 33%, #ffd700 66%, #228b22 66%, #228b22 100%); border: 2px solid #000; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.7);">Sample Flag Design</div>`
                },
                {
                    name: "Claude Sonnet",
                    code: `<div style="width: 100%; height: 200px; background: radial-gradient(circle at center, #ffd700 30%, #dc143c 30%, #dc143c 70%, #228b22 70%); border: 3px solid #333; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">Sample Flag Design</div>`
                },
                {
                    name: "Gemini Pro",
                    code: `<div style="width: 100%; height: 200px; background: linear-gradient(45deg, #dc143c 25%, #ffd700 25%, #ffd700 50%, #228b22 50%, #228b22 75%, #dc143c 75%); background-size: 40px 40px; border: 2px solid #444; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; text-shadow: 1px 1px 3px rgba(0,0,0,0.9);">Sample Flag Design</div>`
                },
                {
                    name: "GPT-4 Turbo",
                    code: `<div style="width: 100%; height: 200px; background: conic-gradient(from 0deg, #dc143c 0deg 120deg, #ffd700 120deg 240deg, #228b22 240deg 360deg); border: 2px solid #000; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">Sample Flag Design</div>`
                },
                {
                    name: "Llama 3",
                    code: `<div style="width: 100%; height: 200px; background: repeating-linear-gradient(90deg, #dc143c 0px, #dc143c 20px, #ffd700 20px, #ffd700 40px, #228b22 40px, #228b22 60px); border: 3px solid #222; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.7);">Sample Flag Design</div>`
                },
                {
                    name: "Mistral AI",
                    code: `<div style="width: 100%; height: 200px; background: linear-gradient(135deg, #dc143c 0%, #dc143c 20%, #ffd700 20%, #ffd700 40%, #228b22 40%, #228b22 60%, #dc143c 60%, #dc143c 80%, #ffd700 80%, #ffd700 100%); border: 2px solid #333; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; text-shadow: 2px 2px 3px rgba(0,0,0,0.8);">Sample Flag Design</div>`
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
