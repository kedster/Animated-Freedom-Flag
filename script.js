<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI-Generated Juneteenth Flags Comparison</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #ff0000, #008000);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: linear-gradient(45deg, #ff0000, #ffff00, #008000);
            border-radius: 15px;
            color: white;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: bold;
        }

        .description {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 30px;
            border-left: 5px solid #dc3545;
        }

        .description h2 {
            color: #dc3545;
            margin-bottom: 15px;
            font-size: 1.5em;
        }

        .description p {
            font-size: 1.1em;
            line-height: 1.7;
            color: #555;
        }

        .baseline {
            background: #fff;
            padding: 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            border-left: 5px solid #007bff;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .baseline h2 {
            color: #007bff;
            margin-bottom: 20px;
            font-size: 1.5em;
        }

        .baseline-content {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }

        .prompt-section h3,
        .fairness-section h3 {
            color: #495057;
            margin-bottom: 15px;
            font-size: 1.2em;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .prompt-box {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #28a745;
            font-family: 'Georgia', serif;
            line-height: 1.6;
        }

        .prompt-box p {
            margin: 0;
            color: #333;
        }

        .fairness-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 15px;
        }

        .fairness-item {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            border: 2px solid #e9ecef;
            transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .fairness-item:hover {
            transform: translateY(-2px);
            border-color: #007bff;
        }

        .fairness-item h4 {
            color: #007bff;
            margin-bottom: 10px;
            font-size: 1.1em;
        }

        .fairness-item p {
            margin: 0;
            color: #666;
            line-height: 1.5;
            font-size: 0.95em;
        }

        .evaluation-note {
            background: linear-gradient(135deg, #ffeaa7, #fab1a0);
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #e17055;
            margin-top: 10px;
        }

        .evaluation-note p {
            margin: 0;
            color: #2d3436;
            font-style: italic;
            text-align: center;
            font-weight: 500;
        }

        .search-box {
            margin-bottom: 30px;
            padding: 20px;
            background: #fff;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .search-box input {
            width: 100%;
            padding: 15px;
            font-size: 1.1em;
            border: 2px solid #ddd;
            border-radius: 10px;
            transition: border-color 0.3s ease;
        }

        .search-box input:focus {
            outline: none;
            border-color: #dc3545;
        }

        .controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .btn {
            padding: 12px 25px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1em;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .btn-primary {
            background: linear-gradient(45deg, #dc3545, #28a745);
            color: white;
        }

        .btn-secondary {
            background: #6c757d;
            color: white;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 25px;
            margin-top: 20px;
        }

        .flag-container {
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            border: 2px solid #e9ecef;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .flag-container:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .static-container {
            background: #f8f9fa;
            border: 2px solid #28a745;
        }

        .static-label {
            background: linear-gradient(45deg, #28a745, #20c997);
            box-shadow: 0 3px 10px rgba(40, 167, 69, 0.3);
        }

        .ai-model-label {
            background: linear-gradient(45deg, #007bff, #6f42c1);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            margin-bottom: 15px;
            text-align: center;
            box-shadow: 0 3px 10px rgba(0, 123, 255, 0.3);
        }

        .flag-display {
            min-height: 300px;
            border: 2px dashed #dee2e6;
            border-radius: 10px;
            padding: 20px;
            background: #f8f9fa;
            position: relative;
            overflow: hidden;
        }

        .flag-display.has-content {
            border: 2px solid #28a745;
            background: white;
        }

        .placeholder-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #6c757d;
            font-style: italic;
            text-align: center;
            pointer-events: none;
        }

        .code-input {
            width: 100%;
            min-height: 200px;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            resize: vertical;
            margin-top: 10px;
        }

        .code-input:focus {
            outline: none;
            border-color: #007bff;
        }

        .apply-btn {
            margin-top: 10px;
            padding: 8px 20px;
            background: #28a745;
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.3s ease;
        }

        .apply-btn:hover {
            background: #218838;
        }

        .remove-btn {
            margin-top: 10px;
            margin-left: 10px;
            padding: 8px 20px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            transition: background 0.3s ease;
        }

        .remove-btn:hover {
            background: #c82333;
        }

        @media (max-width: 768px) {
            .grid-container {
                grid-template-columns: 1fr;
            }
            
            .header h1 {
                font-size: 2em;
            }
            
            .container {
                padding: 20px;
            }
        }

        .footer {
            margin-top: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #2c3e50, #34495e);
            border-radius: 15px;
            color: white;
            text-align: center;
        }

        .footer-content h3 {
            color: #ffd700;
            margin-bottom: 15px;
            font-size: 1.5em;
        }

        .footer-content p {
            margin-bottom: 15px;
            line-height: 1.6;
        }

        .footer-links {
            margin: 20px 0;
            font-size: 1.1em;
        }

        .footer-links a {
            color: #ffd700;
            text-decoration: none;
            margin: 0 10px;
            transition: color 0.3s ease;
        }

        .footer-links a:hover {
            color: #ffed4e;
            text-decoration: underline;
        }

        .footer-note {
            font-size: 0.9em;
            color: #bdc3c7;
            margin-top: 20px;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>Different AI Models Generating Juneteenth Flags</h1>
            <p>Exploring AI creativity in commemorating freedom and heritage</p>
        </header>

        <section class="description">
            <h2>About Juneteenth</h2>
            <p>
                Juneteenth, also known as Freedom Day or Emancipation Day, commemorates June 19, 1865, when enslaved African Americans in Galveston, Texas, finally learned of their freedom—two and a half years after the Emancipation Proclamation. This historic day represents the end of slavery in the United States and has become a symbol of African American freedom, resilience, and cultural heritage. Today, Juneteenth is celebrated nationwide as a federal holiday, honoring the journey toward equality and justice.
            </p>
        </section>

        <section class="baseline">
            <h2>Baseline Methodology</h2>
            <div class="baseline-content">
                <div class="prompt-section">
                    <h3>📝 Standard Prompt Used</h3>
                    <div class="prompt-box">
                        <p><strong>Prompt:</strong> "Create an HTML and CSS representation of a Juneteenth flag. Use appropriate colors, symbols, and design elements that honor the historical significance of Juneteenth - the commemoration of the end of slavery in the United States on June 19, 1865. The flag should be respectful, meaningful, and visually represent themes of freedom, heritage, and celebration."</p>
                    </div>
                </div>
                
                <div class="fairness-section">
                    <h3>⚖️ Ensuring Fair Comparison</h3>
                    <div class="fairness-grid">
                        <div class="fairness-item">
                            <h4>Identical Prompts</h4>
                            <p>Every AI model received the exact same prompt to ensure consistent testing conditions</p>
                        </div>
                        <div class="fairness-item">
                            <h4>No Leading Context</h4>
                            <p>No prior conversation or examples were provided to avoid bias toward specific design approaches</p>
                        </div>
                        <div class="fairness-item">
                            <h4>Single Attempt</h4>
                            <p>Each result represents the first response from each AI model, without cherry-picking or multiple tries</p>
                        </div>
                        <div class="fairness-item">
                            <h4>Default Settings</h4>
                            <p>All models used their standard creativity/temperature settings with no special parameters</p>
                        </div>
                    </div>
                </div>
                
                <div class="evaluation-note">
                    <p><em>This comparison aims to showcase the creative diversity in how different AI systems interpret historical significance through visual design, rather than ranking or judging the quality of responses.</em></p>
                </div>
            </div>
        </section>

        <div class="search-box">
            <input type="text" id="searchInput" placeholder="Search through AI models or flag descriptions...">
        </div>

        <div class="controls">
            <button class="btn btn-primary" onclick="addFlagContainer()">Add New AI Model Comparison</button>
            <button class="btn btn-secondary" onclick="clearAll()">Clear All</button>
            <button class="btn btn-secondary" onclick="exportComparison()">Export Comparison</button>
        </div>

        <div class="grid-container" id="flagGrid">
            <!-- Initial containers will be added here -->
        </div>

        <footer class="footer">
            <div class="footer-content">
                <h3>Celebrating Juneteenth Through AI Creativity</h3>
                <p>This comparison tool showcases how different AI models interpret and visualize the significance of Juneteenth through flag design. Each AI brings its unique perspective to honoring this important day in American history.</p>
                <div class="footer-links">
                    <span>Learn more about Juneteenth: </span>
                    <a href="https://www.juneteenth.com" target="_blank">Juneteenth.com</a> | 
                    <a href="https://nmaahc.si.edu/explore/stories/historical-legacy-juneteenth" target="_blank">National Museum of African American History</a>
                </div>
                <p class="footer-note">© 2025 AI Juneteenth Flag Comparison Tool - Created to honor freedom and heritage</p>
            </div>
        </footer>
    </div>

    <script>
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
    </script>
</body>
</html>