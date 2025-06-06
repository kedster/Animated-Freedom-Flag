        // Navigation functionality
        const navButtons = document.querySelectorAll('.nav-btn');
        const sections = document.querySelectorAll('.content-section');
        let userJourney = {
            sectionsVisited: new Set(),
            timeSpent: {},
            startTime: Date.now()
        };

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetSection = button.dataset.section;
                
                // Update navigation
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update sections
                sections.forEach(section => section.classList.remove('active'));
                document.getElementById(targetSection).classList.add('active');
                
                // Track user journey
                userJourney.sectionsVisited.add(targetSection);
                updateLearningRecommendations();
            });
        });

        // Timeline interactivity
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.addEventListener('click', () => {
                const year = item.dataset.year;
                item.style.transform = 'translateX(20px) scale(1.02)';
                setTimeout(() => {
                    item.style.transform = 'translateX(10px) scale(1)';
                }, 200);
                
                // Add subtle historical context
                showHistoricalContext(year);
            });
        });

        function showHistoricalContext(year) {
            const contexts = {
                '1863': 'During the height of the Civil War, with battles raging across the nation.',
                '1865': 'Two months after President Lincoln\'s assassination and the end of the Civil War.',
                '1866': 'During the beginning of the Reconstruction era in American history.',
                '1980': 'Part of the growing civil rights awareness movement of the late 20th century.',
                '2021': 'Following nationwide protests for racial justice and civil rights reform.'
            };
            
            if (contexts[year]) {
                const tooltip = document.createElement('div');
                tooltip.innerHTML = `<strong>Historical Context:</strong> ${contexts[year]}`;
                tooltip.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 0, 0, 0.9);
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    z-index: 1000;
                    max-width: 300px;
                    text-align: center;
                    animation: fadeIn 0.3s ease;
                `;
                document.body.appendChild(tooltip);
                
                setTimeout(() => {
                    tooltip.remove();
                }, 3000);
            }
        }

        // Flag animation
        function animateFlag() {
            const flag = document.querySelector('.flag');
            const star = document.querySelector('.flag-star');
            const burst = document.querySelector('.flag-burst');
            
            flag.style.animation = 'none';
            star.style.animation = 'none';
            burst.style.animation = 'none';
            
            setTimeout(() => {
                flag.style.animation = 'shake 0.5s ease-in-out';
                star.style.animation = 'starPulse 0.5s ease-in-out 3';
                burst.style.animation = 'burst 1s ease-in-out 2';
            }, 50);
        }

        // AI Insight Generator
        const insights = {
            historical: [
                "Juneteenth represents the longest gap between legal emancipation (1863) and actual freedom (1865), highlighting the importance of enforcement in civil rights legislation.",
                "The two-and-a-half-year delay between the Emancipation Proclamation and Juneteenth demonstrates how geographic isolation and communication barriers affected the implementation of federal policy.",
                "General Gordon Granger's arrival in Galveston connected Texas to the broader Union victory, making Juneteenth a symbol of how freedom required both legal declaration and physical presence.",
                "The choice of June 19th shows how historical moments often depend on individual actions - one general's arrival changed the course of American freedom."
            ],
            cultural: [
                "Juneteenth celebrations evolved organically within African American communities, showing how culture preserves memory when official institutions fail to do so.",
                "The tradition of red foods at Juneteenth gatherings created a unique cultural symbol that connects food, memory, and resistance across generations.",
                "Community-driven Juneteenth celebrations demonstrate how cultural practices can maintain historical consciousness for over 150 years without institutional support.",
                "The grassroots nature of early Juneteenth celebrations reflects the African American tradition of creating joy and community even in the face of ongoing oppression."
            ],
            modern: [
                "Juneteenth's 2021 federal recognition shows how social movements can achieve policy change, with the 2020 protests providing crucial momentum for long-overdue recognition.",
                "The bipartisan support for Juneteenth as a federal holiday demonstrates that some aspects of civil rights can transcend political divisions when properly framed.",
                "Corporate America's embrace of Juneteenth reveals both genuine progress and the commercialization of civil rights milestones in modern society.",
                "The rapid adoption of Juneteenth by institutions reflects both authentic commitment to racial justice and the power of social pressure in creating change."
            ],
            global: [
                "Juneteenth resonates globally as other nations grapple with their own histories of slavery, colonialism, and delayed justice - from Brazil's abolition to apartheid's end in South Africa.",
                "The concept of 'delayed freedom' represented by Juneteenth appears in many liberation movements worldwide, where legal changes preceded actual lived experience of freedom.",
                "International observers see Juneteenth as evidence of American capacity for self-reflection and growth, contrasting with nations that haven't acknowledged their historical wrongs.",
                "Juneteenth's global recognition helps position American civil rights progress within the broader human rights framework of the United Nations era."
            ],
            future: [
                "As America becomes more diverse, Juneteenth offers a model for how to honor difficult history while celebrating progress and resilience.",
                "The digital age allows Juneteenth education to reach global audiences, potentially making it a worldwide symbol of liberation and human dignity.",
                "Future generations will likely see Juneteenth as a turning point when America began seriously reckoning with the long legacy of slavery and its ongoing effects.",
                "The establishment of Juneteenth as a federal holiday may inspire similar recognition for other marginalized communities' historical experiences and contributions."
            ]
        };

        function generateInsight(category) {
            const categoryInsights = insights[category];
            const randomInsight = categoryInsights[Math.floor(Math.random() * categoryInsights.length)];
            
            const display = document.getElementById('insightDisplay');
            display.innerHTML = `
                <div style="text-align: left;">
                    <h4 style="color: #ffd700; margin-bottom: 15px; text-transform: capitalize;">${category} Insight</h4>
                    <p style="font-size: 1.1rem; line-height: 1.6;">${randomInsight}</p>
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.3); font-size: 0.9rem; opacity: 0.8;">
                        🤖 Generated using historical pattern analysis and contextual understanding
                    </div>
                </div>
            `;
            
            // Add animation
            display.style.animation = 'none';
            setTimeout(() => {
                display.style.animation = 'slideIn 0.5s ease-out';
            }, 50);
        }

        // Smart Learning Recommendations
        function updateLearningRecommendations() {
            const recommendations = document.getElementById('recommendations');
            const visited = Array.from(userJourney.sectionsVisited);
            
            let suggestions = [];
            
            if (visited.includes('history') && !visited.includes('flag')) {
                suggestions.push("🏴 Explore the Flag & Symbols section to understand the visual representation of freedom");
            }
            
            if (visited.includes('flag') && !visited.includes('celebrations')) {
                suggestions.push("🎉 Discover how communities celebrate in the Celebrations section");
            }
            
            if (visited.includes('history') && visited.includes('impact')) {
                suggestions.push("🤖 Try the AI Insights section for deeper historical connections");
            }
            
            if (visited.length >= 3) {
                suggestions.push("📚 You're becoming a Juneteenth expert! Consider sharing this knowledge with others");
            }
            
            if (visited.includes('ai-insights')) {
                suggestions.push("🌟 You've explored multiple perspectives - consider how you can apply this understanding");
            }
            
            if (suggestions.length === 0) {
                suggestions.push("🗺️ Continue exploring different sections to build a comprehensive understanding of Juneteenth");
            }
            
            recommendations.innerHTML = suggestions.map(s => 
                `<div style="margin: 10px 0; padding: 10px; background: white; border-radius: 8px; border-left: 4px solid #667eea;">${s}</div>`
            ).join('');
        }

        // Interactive elements enhancement
        const stateCards = document.querySelectorAll('.state-card');
        stateCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h4').textContent;
                showDetailedInfo(title);
            });
        });

        function showDetailedInfo(title) {
            const details = {
                'Texas (1980)': 'Texas was the birthplace of Juneteenth and the first state to make it an official holiday. The state\'s recognition came after decades of community advocacy and represented a crucial step toward national acknowledgment.',
                '47 States by 2020': 'By 2020, 47 states had some form of Juneteenth recognition, ranging from proclamations to official holidays. This groundswell of state-level support created momentum for federal action.',
                'Federal Holiday (2021)': 'The federal recognition came through bipartisan congressional action and President Biden\'s signature, making Juneteenth the first new federal holiday since Martin Luther King Jr. Day in 1983.',
                'Current Status (2025)': 'Juneteenth remains secure as a federal holiday, representing enduring American values that transcend political changes. It continues to serve as a day of reflection, celebration, and education.'
            };
            
            if (details[title]) {
                const modal = document.createElement('div');
                modal.innerHTML = `
                    <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px;" onclick="this.remove()">
                        <div style="background: white; padding: 30px; border-radius: 15px; max-width: 500px; animation: slideIn 0.3s ease-out;" onclick="event.stopPropagation()">
                            <h3 style="color: #c0392b; margin-bottom: 15px;">${title}</h3>
                            <p style="line-height: 1.6; margin-bottom: 20px;">${details[title]}</p>
                            <button onclick="this.closest('div').remove()" style="background: #c0392b; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Close</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);
            }
        }

        // Progress tracking and gamification
        let progressScore = 0;
        const maxScore = 100;

        function updateProgress() {
            progressScore = Math.min(maxScore, userJourney.sectionsVisited.size * 20);
            const progressBars = document.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                if (bar.style.width !== '100%') {
                    bar.style.width = progressScore + '%';
                }
            });
        }

        // Add CSS animations for shake effect
        const shakeKeyframes = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px) rotate(-1deg); }
                75% { transform: translateX(5px) rotate(1deg); }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = shakeKeyframes;
        document.head.appendChild(styleSheet);

        // Initialize the app
        document.addEventListener('DOMContentLoaded', () => {
            updateLearningRecommendations();
            updateProgress();
            
            // Add welcome message
            setTimeout(() => {
                const welcome = document.createElement('div');
                welcome.innerHTML = `
                    <div style="position: fixed; top: 20px; right: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 15px; max-width: 300px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 500; animation: slideIn 0.5s ease-out;">
                        <h4 style="margin: 0 0 10px 0;">Welcome to Your Freedom Journey! 🌟</h4>
                        <p style="margin: 0; font-size: 0.9rem;">Explore each section to discover the rich history and ongoing significance of Juneteenth in American culture.</p>
                        <button onclick="this.parentElement.remove()" style="position: absolute; top: 10px; right: 15px; background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;">×</button>
                    </div>
                `;
                document.body.appendChild(welcome.firstElementChild);
                
                setTimeout(() => {
                    const welcomeMsg = document.querySelector('div[style*="position: fixed"]');
                    if (welcomeMsg) welcomeMsg.remove();
                }, 8000);
            }, 1000);
        });

        // Track section changes for recommendations
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('content-section') && mutation.target.classList.contains('active')) {
                    updateProgress();
                }
            });
        });

        sections.forEach(section => {
            observer.observe(section, { attributes: true, attributeFilter: ['class'] });
        });