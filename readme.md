# ZooLingo - Application d'apprentissage des animaux en plusieurs langues

## Auteurs
- CHAIX Marius
- COLLIN Alex

## Description
ZooLingo est une application web interactive permettant d'apprendre le nom des animaux en plusieurs langues (français, anglais, espagnol, allemand, italien, japonais). L'application propose trois modes d'apprentissage différents et un système de score ludique.

## Comment exécuter le projet
Deux options sont disponibles :

1. Version en ligne :
  - Accéder directement à https://zoolingo.mchaix.fr

2. Version locale :
  - Cloner le repository
  - Lancer un serveur web local (par exemple avec Python : `python -m http.server 8000`)
  - Ouvrir http://localhost:8000 dans votre navigateur

## Fonctionnalités

### Mode Apprentissage 
- Découverte des animaux avec images et prononciation
- Barre de progression

### Mode Quiz
- 20 questions par session
- Système de points (1 point première tentative, 0.5 point deuxième tentative)
- Timer visuel avec animations
- Feedback visuel
- Animation des cartes (correct/incorrect)
- Mode responsive (6 cartes en portrait, 15 en paysage)

### Mode Prononciation
- Reconnaissance vocale en 3 langues
- Système de points adaptatif :
 * 1 point : bonne prononciation du premier coup
 * 0.5 point : bonne prononciation à la deuxième tentative sans indice
 * 0.25 point : bonne prononciation avec utilisation de l'indice
- Tolérance aux erreurs minimes de prononciation
- Feedback visuel

### Fonctionnalités Générales
- Support multilingue (Français, Anglais, Espagnol, Allemand, Italien, Japonais)
- Interface responsive
- Animations fluides
- Barre de progression
- Système de trophées (🥉, 🥈, 🥇, 🏆)
- Partage de score sur les réseaux sociaux
- Support du Web Share API avec fallback Twitter

## Technologies utilisées
- HTML5
- CSS3 (Animations, Flexbox, Grid)
- JavaScript (ES6+)
- Web Speech API (Synthèse et reconnaissance vocale)
- Web Share API

## Compatibilité
- Fonctionne sur les navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Interface responsive (mobile, tablette, desktop)
- Optimisé pour les écrans tactiles

## Notes techniques
- L'application utilise la Web Speech API pour la synthèse et la reconnaissance vocale
- Le calcul de similarité pour la prononciation utilise l'algorithme de Levenshtein
- L'application est entièrement client-side et ne nécessite pas de backend