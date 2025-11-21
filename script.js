        const badwords = ["mikzal", "frygtelig", "forfærdelig", "ussel", "elendigt"];
        const goodwords = ["fantastisk", "vidunderlig", "fremragende", "suveræn", "skøn"];
        let score = 0;

        function updateScoreboard(points) {
            score += points;
            document.getElementById('scoreboard').innerText = `Score: ${score}`;
        }

        function createWord() {
            const isGood = Math.random() < 0.5;
            const text = isGood
                ? goodwords[Math.floor(Math.random() * goodwords.length)]
                : badwords[Math.floor(Math.random() * badwords.length)];

            const wordDiv = document.createElement('div');
            wordDiv.className = `word ${isGood ? 'good' : 'bad'}`;
            wordDiv.innerText = text;

            const left = Math.random() * Math.max(0, window.innerWidth - 120);
            wordDiv.style.left = `${left}px`;
            wordDiv.style.top = `-50px`;
            document.body.appendChild(wordDiv);

            const speed = 1 + Math.random() * 2;
            const fallInterval = setInterval(() => {
                const currentTop = parseFloat(wordDiv.style.top) || 0;
                if (currentTop > window.innerHeight) {
                    clearInterval(fallInterval);
                    if (wordDiv.parentNode) wordDiv.parentNode.removeChild(wordDiv);
                } else {
                    wordDiv.style.top = `${currentTop + speed}px`;
                }
            }, 20);

            wordDiv.addEventListener('click', () => {
                updateScoreboard(isGood ? 67 : -67);
                clearInterval(fallInterval);
                if (wordDiv.parentNode) wordDiv.parentNode.removeChild(wordDiv);
            });
        }

        const spawner = setInterval(createWord, 1000);

        window.addEventListener('resize', () => {
            document.querySelectorAll('.word').forEach(w => {
                const left = parseFloat(w.style.left) || 0;
                if (left > window.innerWidth - 50) w.style.left = `${Math.max(0, window.innerWidth - 120)}px`;
            });
        });