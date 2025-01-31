/**
 * VocabApp - Application d'apprentissage de vocabulaire multilingue
 * Permet l'apprentissage, le quiz et la prononciation des mots dans différentes langues
 */
class VocabApp {
    /**
     * Initialise l'application et ses composants
     */ 
    constructor() {
        // Configuration initiale
        this.currentLanguage = 'fr';
        this.currentCardIndex = 0;
        this.score = 0;
        this.questionsCount = 0;
        this.attempts = 0;
        this.speechAttempts = 0;
        this.currentQuizWord = null;
        this.currentQuizWords = [];
        this.shuffledWords = [];
        this.speakWords = [];
        this.synthesis = window.speechSynthesis;
        this.timeLimit = 10000;
        this.timer = null;
        this.timerBar = null;
        this.timerInterval = null;
        this.recognition = null;
        this.currentSpeakWord = null;
        this.usedHint = false;
        this.currentScreen = 'homeScreen';

        // Initialisation des composants
        this.initializeProgressBar();
        this.initializeTransitionScreen();
        this.initializeApp();
    }

    /**
     * Initialise l'application et les écouteurs d'événements
     */
    initializeApp() {
        this.initializeEventListeners();
        this.showScreen('homeScreen');
    }

    /**
     * Initialise les écouteurs d'événements pour les boutons et les éléments interactifs
     */
    initializeEventListeners() {
        document.querySelectorAll('.flag-button').forEach(button => {
            button.addEventListener('click', () => this.setLanguage(button.dataset.lang));
        });

        document.getElementById('learnButton').addEventListener('click', () => this.startLearnMode());
        document.getElementById('quizButton').addEventListener('click', () => this.startQuizMode());
        document.getElementById('quitButton').addEventListener('click', () => this.quit());

        document.getElementById('speakButton').addEventListener('click', () => this.startSpeakMode());
    }

    /**
     * Initialise la reconnaissance vocale pour le mode de prononciation
     */
    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = this.currentLanguage === 'en' ? 'en-US' : 
                                    this.currentLanguage === 'es' ? 'es-ES' :
                                    this.currentLanguage === 'de' ? 'de-DE' :
                                    this.currentLanguage === 'it' ? 'it-IT' :
                                    this.currentLanguage === 'ja' ? 'ja-JP' : 'fr-FR';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                this.checkPronunciation(transcript);
            };

            this.recognition.onend = () => {
                const listenButton = document.getElementById('startListening');
                listenButton.classList.remove('listening');
            };
        }
    }

    /**
     * Initialise l'écran de transition
     */
    initializeTransitionScreen() {
        const transitionScreen = document.createElement('div');
        transitionScreen.className = 'transition-screen';
        transitionScreen.innerHTML = '<div class="text"></div>';
        document.body.appendChild(transitionScreen);
        this.transitionScreen = transitionScreen;
        
        const timer = document.createElement('div');
        timer.className = 'timer';
        timer.style.display = 'none';
        timer.innerHTML = '<div class="timer-bar"></div>';
        document.body.appendChild(timer);
        this.timer = timer;
        this.timerBar = timer.querySelector('.timer-bar');
    }

    // MINUTEUR

    /**
     * Démarre le minuteur pour le mode quiz ou prononciation
     */
    startTimer() {
        clearInterval(this.timerInterval);
        this.timer.style.display = 'block';
        this.timerBar.style.width = '100%';
        this.timer.classList.remove('warning', 'danger');
        
        const startTime = Date.now();
        this.timerInterval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingPercent = 100 - (elapsedTime / this.timeLimit * 100);
            
            if (remainingPercent <= 0) {
                this.stopTimer();
                this.handleTimeUp();
            } else {
                this.timerBar.style.width = remainingPercent + '%';
                
                if (remainingPercent <= 30) {
                    this.timer.classList.add('danger');
                } else if (remainingPercent <= 60) {
                    this.timer.classList.add('warning');
                }
            }
        }, 50);
    }
    
    /**
     * Arrête le minuteur pour le mode quiz ou prononciation
     */
    stopTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    }
    
    /**
     * Gère le temps écoulé pour le mode quiz ou prononciation
     */
    handleTimeUp() {
        if (document.querySelector('.speak-screen.active')) {
            // Gestion pour le mode prononciation
            const listenButton = document.getElementById('startListening');
            listenButton.classList.remove('listening');
            this.recognition.stop();
            this.showScoreAnimation(0, false);
            this.speechAttempts++;
            
            if (this.speechAttempts < 2) {
                document.getElementById('showHint').style.display = 'block';
                this.speakFeedback('Temps écoulé, encore une chance', () => {
                    setTimeout(() => {
                        this.speak(this.currentQuizWord[this.currentLanguage], () => {
                        }, true);
                    }, 500);
                });
            } else {
                this.showScoreAnimation(0, false, this.currentSpeakWord[this.currentLanguage]);
                this.speakFeedback('Temps écoulé');
                const correctCard = document.querySelector('.speak-card');
                
                setTimeout(() => {
                    this.speak(this.currentSpeakWord[this.currentLanguage], () => {
                        setTimeout(() => {
                            this.nextSpeakWord();
                        }, 1500);
                    }, true);
                }, 1500);
            }
        } else {
            // Gestion pour le mode quiz
            this.toggleQuizInteraction(false);
            this.showScoreAnimation(0, false);
            this.attempts++;
            
            if (this.attempts < 2) {
                this.speakFeedback('Temps écoulé, encore une chance', () => {
                    setTimeout(() => {
                        this.speak(this.currentQuizWord[this.currentLanguage], () => {
                            this.toggleQuizInteraction(true);
                            this.startTimer();
                        }, true);
                    }, 500);
                });
            } else {
                this.showScoreAnimation(0, false, this.currentQuizWord[this.currentLanguage]);
                this.speakFeedback('Temps écoulé');
                const correctCard = document.querySelector(`.quiz-card[data-id="${this.currentQuizWord.id}"]`);
                correctCard.classList.add('correct');
    
                setTimeout(() => {
                    this.speak(this.currentQuizWord[this.currentLanguage], () => {
                        setTimeout(() => {
                            correctCard.classList.remove('correct');
                            this.startNewQuestion();
                        }, 1500);
                    }, true);
                }, 1500);
            }
        }
    }

    // TRANSITION

    /**
     * Met à jour le message de transition en fonction du nombre de questions posées
     */
    updateTransitionMessage() {
        const messageElement = this.transitionScreen.querySelector('.text');
        if (this.questionsCount === 0) {
            messageElement.innerHTML = 'Préparez-vous !<br>Le Safari commence... 🦁';
        } else {
            messageElement.textContent = 'Mot Suivant';
        }
    }

    /**
     * Affiche l'écran de transition entre les questions du quiz
     */
    showTransitionScreen() {
        this.updateTransitionMessage();
        this.transitionScreen.classList.add('active');

        setTimeout(() => {
            this.currentQuizWords = this.getRandomWords(this.getWorldCount());
            this.currentQuizWord = this.currentQuizWords[Math.floor(Math.random() * this.currentQuizWords.length)];
            this.attempts = 0;
            this.questionsCount++;
            this.renderQuizCards();
            
            setTimeout(() => {
                this.transitionScreen.classList.remove('active');
                this.toggleQuizInteraction(false);
                
                setTimeout(() => {
                    this.speak(this.currentQuizWord[this.currentLanguage], () => {
                        this.toggleQuizInteraction(true);
                        this.startTimer();
                    }, true);
                }, 500);
            }, 2000);
        }, 100);
    }

    // PROGRESS BAR

    /**
     * Initialise la barre de progression
     */
    initializeProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `
            <div class="progress-fill"></div>
            <div class="progress-text"></div>
        `;
        document.body.appendChild(progressBar);
        this.progressBar = progressBar;
        this.progressBar.style.display = 'none';
    }

    /**
     * Met à jour la barre de progression en fonction de l'état actuel
     * @param {number} current - L'élément actuel
     * @param {number} total - Le nombre total d'éléments
     * @param {string} mode - Le mode actuel (apprentissage ou quiz)
     */
    updateProgress(current, total, mode = 'learn') {
        const percentage = (current / total) * 100;
        const fill = this.progressBar.querySelector('.progress-fill');
        const text = this.progressBar.querySelector('.progress-text');
        
        fill.style.width = `${percentage}%`;
        
        if (mode === 'learn') {
            text.textContent = `Animal ${current}/${total}`;
        } else {
            text.textContent = `Question ${current}/20`;
        }
    }

    // INTERFACE UTILISATEUR

    /**
     * Définit la langue actuelle de l'application
     * @param {string} lang - La langue à définir
     */
    setLanguage(lang) {
        this.currentLanguage = lang;
        document.querySelectorAll('.flag-button').forEach(button => {
            button.classList.toggle('selected', button.dataset.lang === lang);
        });

        // Gestion du warning sur mobile
        if (window.innerWidth <= 768) {
            const warningElement = document.getElementById('languageWarning');
            if (warningElement) {
                if (lang !== 'fr') {
                    warningElement.style.display = 'block';
                    // Retourner automatiquement en français après 3 secondes
                    setTimeout(() => {
                        this.setLanguage('fr');
                        warningElement.style.display = 'none';
                    }, 3000);
                } else {
                    warningElement.style.display = 'none';
                }
            }
        }
    }

    /**
     * Affiche l'écran spécifié et masque les autres écrans
     * @param {string} screenId - L'identifiant de l'écran à afficher
     */
    showScreen(screenId) {
        document.querySelectorAll('.home-screen, .learn-screen, .quiz-screen, .speak-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        document.getElementById('quitButton').style.display = 
            screenId === 'homeScreen' ? 'none' : 'block';
        
        this.progressBar.style.display = screenId === 'homeScreen' ? 'none' : 'block';
        
        if (this.timer) {
            this.timer.style.display = (screenId === 'quizScreen' || screenId === 'speakScreen') ? 'block' : 'none';
        }

        this.currentScreen = screenId;
    }

    // VOCABULAIRE

    /**
     * Parle le texte spécifié à l'aide de la synthèse vocale
     * @param {string} text - Le texte à prononcer
     * @param {function} callback - La fonction de rappel à appeler une fois la prononciation terminée
     * @param {boolean} isQuizWord - Indique si le mot est utilisé dans le quiz
     */
    speak(text, callback = null, isQuizWord = false) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = this.currentLanguage === 'en' ? 'en-US' : 
                        this.currentLanguage === 'es' ? 'es-ES' :
                        this.currentLanguage === 'de' ? 'de-DE' :
                        this.currentLanguage === 'it' ? 'it-IT' :
                        this.currentLanguage === 'ja' ? 'ja-JP' : 'fr-FR';
        if (isQuizWord) {
            utterance.volume = 1;
            utterance.rate = 0.9;
        }

        utterance.onend = () => {
            if (callback) {
                callback();
            }
        };

        this.synthesis.speak(utterance);
    }

    /**
     * Parle le message de feedback spécifié à l'aide de la synthèse vocale
     * @param {string} message - Le message de feedback à prononcer
     * @param {function} callback - La fonction de rappel à appeler une fois la prononciation terminée
     */
    speakFeedback(message, callback = null) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'fr-FR';
        utterance.volume = 1;

        utterance.onend = () => {
            if (callback) {
                callback();
            }
        };

        this.synthesis.speak(utterance);
    }

    // MODE APPRENTISSAGE

    /**
     * Démarre le mode d'apprentissage des mots
     */
    startLearnMode() {
        this.currentCardIndex = 0;
        this.shuffledWords = [...vocabulary.words].sort(() => Math.random() - 0.5);
        this.showScreen('learnScreen');
        this.updateProgress(1, this.shuffledWords.length, 'learn');
        this.showNextCard();
    }

    /**
     * Affiche la carte suivante dans le mode d'apprentissage
     */
    showNextCard() {
        if (this.currentCardIndex >= this.shuffledWords.length) {
            this.showLearnCompleteScreen();
            return;
        }
    
        const word = this.shuffledWords[this.currentCardIndex];
        const container = document.getElementById('cardContainer');
        const oldCard = container.querySelector('.card');
        
        if (oldCard) {
            oldCard.classList.add('exit');
            setTimeout(() => {
                this.renderNewCard(word, container);
            }, 500);
        } else {
            this.renderNewCard(word, container);
        }
    
        this.updateProgress(this.currentCardIndex + 1, this.shuffledWords.length, 'learn');
    }
    
    /**
     * Affiche une nouvelle carte de mot dans le conteneur spécifié
     * @param {object} word - Le mot à afficher
     * @param {HTMLElement} container - Le conteneur dans lequel afficher la carte
     */
    renderNewCard(word, container) {
        container.innerHTML = `
            <img src="${word.image}" alt="${word[this.currentLanguage]}">
            <h2>${word[this.currentLanguage]}</h2>
            <div class="speaker-icon" onclick="app.speak('${word[this.currentLanguage]}')">🔊</div>
            <button class="next-button" onclick="app.nextCard()">
                <span>Suivant</span>
                <img src="https://api.iconify.design/icons8:right-round.svg?color=white" alt="Suivant" class="next-icon">
            </button>
        `;
    }

    /**
     * Passe à la carte suivante dans le mode d'apprentissage
     */
    nextCard() {
        this.currentCardIndex++;
        this.updateProgress(this.currentCardIndex + 1, vocabulary.words.length, 'learn');
        this.showNextCard();
    }

    // MODE QUIZ

    /**
     * Récupère le nombre de mots à afficher dans le quiz en fonction de l'orientation de
     * @returns {number} Le nombre de mots à afficher dans le quiz
     */
    getWorldCount() {
        if (window.innerHeight > window.innerWidth) {
            return 6;
        } else {
            return 15;
        }
    }

    /**
     * Récupère un nombre aléatoire de mots du vocabulaire
     * @param {number} count - Le nombre de mots à récupérer
     */
    getRandomWords(count) {
        let words = [...vocabulary.words];
        let result = [];
        while (result.length < count && words.length > 0) {
            const randomIndex = Math.floor(Math.random() * words.length);
            result.push(words.splice(randomIndex, 1)[0]);
        }
        return result;
    }

    /**
     * Active ou désactive l'interaction avec les cartes du quiz
     * @param {boolean} enable - Indique si l'interaction doit être activée ou désactivée
     */
    toggleQuizInteraction(enable) {
        const cards = document.querySelectorAll('.quiz-card');
        cards.forEach(card => {
            if (enable) {
                card.style.pointerEvents = 'auto';
                card.style.opacity = '1';
            } else {
                card.style.pointerEvents = 'none';
                card.style.opacity = '0.7';
            }
        });
    }

    /**
     * Démarre le mode quiz pour tester les connaissances des utilisateurs
     */
    startQuizMode() {
        this.score = 0;
        this.questionsCount = 0;
        this.attempts = 0;
        document.getElementById('score').textContent = '0';
        this.showScreen('quizScreen');
        this.updateProgress(1, 20, 'quiz');
        this.startNewQuestion();
    }

    /**
     * Démarre une nouvelle question dans le quiz
     */
    startNewQuestion() {
        if (this.questionsCount >= 2) {
            this.showResultScreen();
            return;
        }

        this.updateProgress(this.questionsCount + 1, 20, 'quiz');
        this.showTransitionScreen();
    }

    /**
     * Affiche les cartes de quiz pour les mots actuels
     */
    renderQuizCards() {
        const container = document.getElementById('quizContainer');
        container.innerHTML = this.currentQuizWords.map(word => `
            <div class="quiz-card" data-id="${word.id}">
                <img src="${word.image}" alt="">
            </div>
        `).join('');

        container.querySelectorAll('.quiz-card').forEach(card => {
            card.addEventListener('click', () => this.checkAnswer(parseInt(card.dataset.id)));
        });
    }

    /**
     * Vérifie la réponse de l'utilisateur pour le mot spécifié
     * @param {number} wordId - L'identifiant du mot à vérifier
     */
    checkAnswer(wordId) {
        this.stopTimer();
        this.toggleQuizInteraction(false);
        const card = document.querySelector(`.quiz-card[data-id="${wordId}"]`);
        
        // Vérifier si la réponse est correcte
        if (wordId === this.currentQuizWord.id) {
            // Réponse correcte
            const points = this.attempts === 0 ? 1 : 0.5;
            this.score += points;
            document.getElementById('score').textContent = this.score;
            
            this.showScoreAnimation(points, true, this.currentQuizWord[this.currentLanguage]);
            
            card.classList.add('correct');
            setTimeout(() => {
                card.classList.remove('correct');
                this.speakFeedback('Bonne réponse !', () => {
                    setTimeout(() => {
                        this.startNewQuestion();
                    }, 1000);
                });
            }, 1000);
        } else {
            // Réponse incorrecte
            card.classList.add('incorrect');
            setTimeout(() => {
                card.classList.remove('incorrect');
            }, 1000);

            this.attempts++;
            if (this.attempts < 2) {
                // Mauvaise réponse après une tentative
                this.showScoreAnimation(0, false);
                this.speakFeedback('Mauvaise réponse, encore une chance', () => {
                    setTimeout(() => {
                        this.speak(this.currentQuizWord[this.currentLanguage], () => {
                            this.toggleQuizInteraction(true);
                        }, true);
                    }, 500);
                });
            } else {
                // Mauvaise réponse après deux tentatives
                this.showScoreAnimation(0, false, this.currentQuizWord[this.currentLanguage]);
                this.speakFeedback('Mauvaise réponse');
                const correctCard = document.querySelector(`.quiz-card[data-id="${this.currentQuizWord.id}"]`);
                correctCard.classList.add('correct');

                setTimeout(() => {
                    this.speak(this.currentQuizWord[this.currentLanguage], () => {
                        setTimeout(() => {
                            correctCard.classList.remove('correct');
                            this.startNewQuestion();
                        }, 1500);
                    }, true);
                }, 1500);
            }
        }
    }

    /**
     * Affiche une animation de score pour la réponse de l'utilisateur
     * @param {number} points - Les points à afficher
     * @param {boolean} isCorrect - Indique si la réponse est correcte
     * @param {string} displayWord - Le mot à afficher (si la réponse est incorrecte)
     */
    showScoreAnimation(points, isCorrect = true, displayWord = null) {
        const scorePopup = document.createElement('div');
        scorePopup.className = 'score-popup';
        
        let scoreContent = isCorrect ? 
            `<div class="score ${points === 0.5 ? 'half-point' : ''}">${points > 0 ? '+' + points : '0'}</div>` :
            `<div class="score incorrect">❌</div>`;
            
        let wordContent = displayWord ? `<div class="word">${displayWord}</div>` : '';
        
        scorePopup.innerHTML = scoreContent + wordContent;
        document.body.appendChild(scorePopup);
    
        setTimeout(() => {
            document.body.removeChild(scorePopup);
        }, 1000);
    }

    // ÉCRAN DE RÉSULTATS

    /**
     * Affiche l'écran de résultats pour le mode quiz
     */
    showResultScreen() {
        const resultScreen = document.createElement('div');
        resultScreen.className = 'result-screen';
        
        const content = document.createElement('div');
        content.className = 'result-content';
        
        let trophyEmoji = '🏆';
        if (this.score < 10) trophyEmoji = '🥉';
        else if (this.score < 15) trophyEmoji = '🥈';
        else if (this.score < 20) trophyEmoji = '🥇';
        
        content.innerHTML = `
            <div class="trophy">${trophyEmoji}</div>
            <div class="final-score">Score : ${this.score}/20</div>
            <div class="result-buttons">
                <button class="result-button" onclick="app.shareScore()">
                    <img src="https://api.iconify.design/material-symbols:share-outline.svg" alt="Partager">
                    Partager
                </button>
                <button class="result-button" onclick="app.quit()">
                    <img src="https://api.iconify.design/material-symbols:home-outline.svg" alt="Accueil">
                    Accueil
                </button>
            </div>
        `;
        
        resultScreen.appendChild(content);
        document.body.appendChild(resultScreen);
    }

    /**
     * Affiche l'écran de résultats pour le mode d'apprentissage
     */
    showLearnCompleteScreen() {
        const learnCompleteScreen = document.createElement('div');
        learnCompleteScreen.className = 'result-screen';
        
        const content = document.createElement('div');
        content.className = 'result-content';
        
        content.innerHTML = `
            <div class="trophy">🎉</div>
            <div class="final-score">Vous avez appris tous les animaux !</div>
            <div class="result-buttons">
                <button class="result-button" onclick="app.quit()">
                    <img src="https://api.iconify.design/material-symbols:home-outline.svg" alt="Accueil">
                    Accueil
                </button>
                <button class="result-button" onclick="app.startQuizMode()">
                    <img src="https://api.iconify.design/material-symbols:quiz-outline.svg" alt="Effectuer le Quiz">
                    Effectuer le Quiz
                </button>
            </div>
        `;
        
        learnCompleteScreen.appendChild(content);
        document.body.appendChild(learnCompleteScreen);
    }

    // PARTAGE

    /**
     * Affiche le menu de partage personnalisé
     * @param {Object} messages - Les messages pour chaque plateforme
     * @param {Object} shareData - Les données de partage
     */
    showShareMenu(messages, shareData) {
        const existingMenu = document.querySelector('.share-menu');
        if (existingMenu) existingMenu.remove();

        const shareMenu = document.createElement('div');
        shareMenu.className = 'share-menu';
        
        const menuContent = `
            <div class="share-menu-content">
                <h3>Partager mon score</h3>
                <div class="share-buttons">
                    ${navigator.share ? 
                        `<button data-action="native" class="share-button-native">
                            <img src="https://api.iconify.design/mdi:share-variant.svg" alt="Share">
                            Partager via votre appareil
                        </button>` 
                    : ''}
                    <button data-platform="twitter" class="share-button-twitter">
                        <img src="https://api.iconify.design/mdi:twitter.svg" alt="Twitter">
                        Twitter
                    </button>
                    <button data-platform="linkedin" class="share-button-linkedin">
                        <img src="https://api.iconify.design/mdi:linkedin.svg" alt="LinkedIn">
                        LinkedIn
                    </button>
                </div>
                <button class="close-button">Fermer</button>
            </div>
        `;

        shareMenu.innerHTML = menuContent;

        shareMenu.querySelectorAll('button[data-platform]').forEach(button => {
            button.addEventListener('click', () => {
                const platform = button.dataset.platform;
                this.openShare(platform, messages[platform] || messages.default, shareData.url);
            });
        });

        const nativeButton = shareMenu.querySelector('button[data-action="native"]');
        if (nativeButton) {
            nativeButton.addEventListener('click', () => {
                this.nativeShare(messages.default);
            });
        }

        shareMenu.querySelector('.close-button').addEventListener('click', () => shareMenu.remove());
        shareMenu.addEventListener('click', (e) => {
            if (e.target === shareMenu) shareMenu.remove();
        });

        document.body.appendChild(shareMenu);
    }

    /**
     * Ouvre le lien de partage pour un réseau social spécifique
     * @param {string} platform - La plateforme de partage
     * @param {string} text - Le texte à partager
     * @param {string} [url] - L'URL optionnelle à partager
     */
    openShare(platform, text, url = 'https://zoolingo.mchaix.fr') {
        const urls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
            linkedin: `https://www.linkedin.com/feed/?shareActive=true&shareUrl=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        };

        if (urls[platform]) {
            window.open(urls[platform], '_blank');
        }
    }

    /**
     * Gère le partage natif via l'API Web Share
     * @param {string} text - Le texte à partager
     */
    nativeShare(text) {
        navigator.share({
            title: 'Mon score sur ZooLingo',
            text: text,
            url: 'https://zoolingo.mchaix.fr'
        }).catch(() => {
            // Ne rien faire en cas d'erreur ou d'annulation
        });
    }
    
    /**
     * Partage le score sur les réseaux sociaux
     */
    shareScore() {
        // Configuration des langues
        const langConfig = {
            fr: { flag: '🇫🇷', name: 'Français' },
            en: { flag: '🇺🇸', name: 'Anglais' },
            es: { flag: '🇪🇸', name: 'Espagnol' },
            de: { flag: '🇩🇪', name: 'Allemand' },
            it: { flag: '🇮🇹', name: 'Italien' },
            ja: { flag: '🇯🇵', name: 'Japonais' }
        };
    
        const langInfo = langConfig[this.currentLanguage];
        if (!langInfo) return;
    
        const shareData = {
            title: 'Mon score sur ZooLingo',
            mode: (this.currentScreen === "speak-screen") ? 'Prononciation' : 'Safari Quiz',
            score: this.score,
            language: langInfo,
            url: 'https://zoolingo.mchaix.fr'
        };
    
        const messages = {
            default: `${shareData.mode === 'Prononciation' ? '🗣️' : '🦁'} J'ai obtenu ${shareData.score}/20 au Quiz de ${shareData.mode} en ${langInfo.name} ${langInfo.flag} sur ZooLingo ! Apprenez les animaux en plusieurs langues sur zoolingo.mchaix.fr 🌍`,
            linkedin: `Je viens d'obtenir ${shareData.score}/20 au Quiz de ${shareData.mode} en ${langInfo.name} ${langInfo.flag} sur ZooLingo, une application ludique pour apprendre les langues! 🌍`
        };
    
        this.showShareMenu(messages, shareData);
    }

    // MODE PRONONCIATION

    /**
     * Démarre le mode de prononciation pour tester la prononciation des mots
     */
    startSpeakMode() {
        this.speakWords = this.getRandomWords(20);
        this.currentSpeakWord = this.speakWords[0];
        this.score = 0;
        this.speechAttempts = 0;
        this.usedHint = false;
        this.showScreen('speakScreen');
        this.initializeSpeechRecognition();
        this.updateProgress(1, 20, 'speak');
        document.getElementById('speakScore').textContent = '0';
        
        // S'assurer que le container est vide
        const container = document.getElementById('speakCardContainer');
        container.innerHTML = '';
        this.renderSpeakCard();
    }

    /**
     * Affiche une nouvelle carte de mot à prononcer dans le conteneur spécifié
     * @param {object} word - Le mot à afficher
     * @param {HTMLElement} container - Le conteneur dans lequel afficher la carte 
     */
    renderNewSpeakCard(word, container) {
        // Create a wrapper div with speak-card class
        const speakCard = document.createElement('div');
        speakCard.className = 'speak-card';
        
        speakCard.innerHTML = `
            <img src="${word.image}" alt="${word[this.currentLanguage]}" class="main-image">
            <div class="speak-buttons">
                <button id="startListening" class="listen-button">
                    <img src="https://api.iconify.design/material-symbols:mic.svg" alt="Microphone">
                </button>
                <button id="showHint" class="hint-button" style="display: none;">
                    Voir le mot
                </button>
            </div>
        `;

        // Clear the container and append the new speak card
        container.innerHTML = '';
        container.appendChild(speakCard);
    
        // Réattacher les événements
        document.getElementById('startListening').addEventListener('click', () => this.toggleListening());
        document.getElementById('showHint').addEventListener('click', () => this.showWordHint());
    }

    /**
     * Affiche une nouvelle carte de mot à prononcer dans le conteneur spécifié
     */
    renderSpeakCard() {
        const container = document.getElementById('speakCardContainer');
        const oldCard = container.querySelector('.card');
        
        if (oldCard) {
            oldCard.classList.add('exit');
            setTimeout(() => {
                this.renderNewSpeakCard(this.currentSpeakWord, container);
            }, 500);
        } else {
            this.renderNewSpeakCard(this.currentSpeakWord, container);
        }

        this.startTimer();
    }

    /**
     * Bascule l'écoute pour le mode de prononciation
     */
    toggleListening() {
        const listenButton = document.getElementById('startListening');
        if (!listenButton.classList.contains('listening')) {
            this.recognition.start();
            listenButton.classList.add('listening');
        }
    }

    /**
     * Affiche le mot à prononcer pour aider l'utilisateur
     */
    showWordHint() {
        this.usedHint = true;
        const hintElement = document.createElement('div');
        hintElement.className = 'word-hint';
        hintElement.textContent = this.currentSpeakWord[this.currentLanguage];
        document.querySelector('.speak-card').appendChild(hintElement);
        document.getElementById('showHint').style.display = 'none';
    }

    /**
     * Vérifie la prononciation du mot parlé par l'utilisateur
     * @param {string} spokenWord - Le mot prononcé par l'utilisateur
     */
    checkPronunciation(spokenWord) {
        const correctWord = this.currentSpeakWord[this.currentLanguage].toLowerCase();
        const distance = this.levenshteinDistance(spokenWord, correctWord);
        const similarity = 1 - (distance / Math.max(spokenWord.length, correctWord.length));
    
        if (similarity >= 0.8) {
            // Bonne prononciation
            let points = 0;
            if (this.speechAttempts === 0) {
                points = 1;
            } else if (this.speechAttempts === 1 && !this.usedHint) {
                points = 0.5;
            } else if (this.speechAttempts === 1 && this.usedHint) {
                points = 0.25;
            }
    
            this.score += points;
            document.getElementById('speakScore').textContent = this.score;
            this.showScoreAnimation(points, true);
            this.stopTimer();
            setTimeout(() => this.nextSpeakWord(), 1000);
        } else {
            // Mauvaise prononciation
            this.speechAttempts++;
            if (this.speechAttempts === 1) {
                document.getElementById('showHint').style.display = 'block';
                this.showScoreAnimation(0, false);
                this.stopTimer();
                this.startTimer();
            } else {
                this.showScoreAnimation(0, false, this.currentSpeakWord[this.currentLanguage]);
                this.stopTimer();
                setTimeout(() => this.nextSpeakWord(), 2000);
            }
        }
    }

    /**
     * Passe au mot suivant dans le mode de prononciation
     */
    nextSpeakWord() {
        const currentIndex = this.speakWords.indexOf(this.currentSpeakWord);
        if (currentIndex < this.speakWords.length - 1) {
            this.speechAttempts = 0;
            this.currentSpeakWord = this.speakWords[currentIndex + 1];
            this.updateProgress(currentIndex + 2, 20, 'speak');
            this.renderSpeakCard();
        } else {
            this.showResultScreen();
        }
    }

    /**
     * Levenshtein Distance - Calcule la distance de Levenshtein entre deux chaînes de caractères
     * Permet de mesurer la similarité entre deux mots
     * @param {string} a - La première chaîne de caractères
     * @param {string} b - La deuxième chaîne de caractères
     * @returns {number} La distance de Levenshtein entre les deux chaînes
     */
    levenshteinDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        return matrix[b.length][a.length];
    }

    // QUITTER

    /**
     * Quitte le mode actuel et retourne à l'écran d'accueil
     */
    quit() {
        const resultScreen = document.querySelector('.result-screen');
        if (resultScreen) {
            document.body.removeChild(resultScreen);
        }
    
        this.stopTimer();
        if (this.timer) {
            this.timer.style.display = 'none';
        }
    
        this.progressBar.style.display = 'none';
        this.showScreen('homeScreen');
        this.currentCardIndex = 0;
        this.score = 0;
        this.questionsCount = 0;
        this.attempts = 0;
    }
}

// Initialisation de l'application
let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new VocabApp();
});