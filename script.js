const patternContainer = document.getElementById('pattern-container');
        const patternTypes = ['circle', 'square', 'triangle', 'line', 'zigzag', 'stripe'];
        const patternCount = 50;
        const nextBtn = document.getElementById('next-btn');
        const welcomeText = document.getElementById('welcome');
        const dialogBox = document.getElementById('dialog');
        const finalNextBtn = document.getElementById('final-next');
        const colorDialog = document.getElementById('color-dialog');
        const submitColorBtn = document.getElementById('submit-color');
        const patternDialog = document.getElementById('pattern-dialog');
        let selectedPattern = "lines";

        for (let i = 0; i < patternCount; i++) {
            const pattern = document.createElement('div');
            const shape = patternTypes[Math.floor(Math.random() * patternTypes.length)];
            pattern.classList.add('pattern', shape);
            pattern.style.left = Math.random() * 100 + '%';
            pattern.style.top = Math.random() * 100 + '%';
            pattern.style.animationDuration = (6 + Math.random() * 6) + 's';
            pattern.style.animationDelay = (Math.random() * 5) + 's';
            pattern.style.zIndex = 0;
            patternContainer.appendChild(pattern);
        }

        nextBtn.addEventListener('click', () => {
            document.querySelectorAll('.pattern').forEach(pattern => {
                pattern.style.animationDuration = '0.8s';
            });
            welcomeText.style.display = 'none';
            dialogBox.style.display = 'block';
        });

        finalNextBtn.addEventListener('click', () => {
            dialogBox.style.display = 'none';
            colorDialog.style.display = 'block';
        });

        submitColorBtn.addEventListener('click', () => {
            colorDialog.style.display = 'none';
            patternDialog.style.display = 'block';
        });

        document.querySelectorAll('.pattern-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                selectedPattern = btn.textContent.toLowerCase();
            });
        });

        document.getElementById('submit-pattern').addEventListener('click', () => {
            patternDialog.style.display = 'none';

            const resolution = document.querySelector('#custom-input input').value.trim(); // e.g., "1920x1080"
            const color = document.querySelector('#color-input input').value.trim();
            const [width, height] = resolution.toLowerCase().split('x').map(Number);

            if (isNaN(width) || isNaN(height)) {
                alert("Invalid resolution format. Please enter like 1920x1080.");
                return;
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.style.position = 'absolute';
            canvas.style.top = '50%';
            canvas.style.left = '50%';
            canvas.style.transform = 'translate(-50%, -50%)';
            canvas.style.zIndex = 3;
            canvas.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
            document.body.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            ctx.fillStyle = color || '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const drawLines = () => {
                for (let i = 0; i < canvas.height; i += 20) {
                    ctx.beginPath();
                    ctx.moveTo(0, i);
                    ctx.lineTo(canvas.width, i);
                    ctx.stroke();
                }
            };

            const drawCircles = () => {
                for (let i = 0; i < 100; i++) {
                    ctx.beginPath();
                    const x = Math.random() * width;
                    const y = Math.random() * height;
                    const r = Math.random() * 30 + 10;
                    ctx.arc(x, y, r, 0, 2 * Math.PI);
                    ctx.stroke();
                }
            };

            const drawTriangles = () => {
                for (let i = 0; i < 50; i++) {
                    const x = Math.random() * width;
                    const y = Math.random() * height;
                    const size = 30;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + size, y);
                    ctx.lineTo(x + size / 2, y - size);
                    ctx.closePath();
                    ctx.stroke();
                }
            };

            const drawEmojis = () => {
                ctx.font = "24px Arial";
                const emojis = ["✨", "🌟", "🔥", "💫", "🌈", "🍀"];
                for (let i = 0; i < 100; i++) {
                    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                    ctx.fillText(emoji, Math.random() * width, Math.random() * height);
                }
            };

            const drawShapes = () => {
                drawLines();
                drawCircles();
                drawTriangles();
            };

            switch (selectedPattern) {
                case 'lines': drawLines(); break;
                case 'shapes': drawShapes(); break;
                case 'circles': drawCircles(); break;
                case 'triangles': drawTriangles(); break;
                case 'emojis': drawEmojis(); break;
                default: drawLines(); break;
            }
        });