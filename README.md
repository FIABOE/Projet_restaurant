# Le Jardin d'Auguste

Site web vitrine d'un restaurant gastronomique parisien, intégrant un pipeline CI/CD complet via GitHub Actions avec déploiement automatique sur GitHub Pages.

---

## Table des matières

- [Aperçu](#aperçu)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [Pipeline CI/CD](#pipeline-cicd)
- [Travailler en équipe](#travailler-en-équipe)
- [Déploiement](#déploiement)
- [Technologies](#technologies)

---

## Aperçu

Site statique multi-sections incluant une carte de restaurant interactive, un formulaire de réservation, une galerie et une section de témoignages. Le projet est conçu pour illustrer un workflow de déploiement continu professionnel : chaque modification passe par une validation automatique avant d'être mise en ligne.

---

## Prérequis

- Un compte [GitHub](https://github.com)
- [Node.js](https://nodejs.org) v18 ou supérieur (pour les outils de validation en local)
- Git

---

## Installation

Cloner le dépôt :

```bash
git clone https://github.com/<username>/<repo>.git
cd <repo>
```

Installer les dépendances de validation (optionnel, pour tester en local) :

```bash
npm install -g html-validator-cli stylelint stylelint-config-recommended eslint
```

Lancer le site en local :

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

Ouvrir `http://localhost:8000` dans le navigateur.

---

## Structure du projet

```
.
├── index.html                    # Page principale
├── style.css                     # Feuille de styles
├── script.js                     # Logique JavaScript
├── README.md
└── .github/
    └── workflows/
        └── deploy.yml            # Pipeline GitHub Actions
```

---

## Pipeline CI/CD

Le pipeline est défini dans `.github/workflows/deploy.yml`. Il se compose de deux jobs distincts.

### Déclencheurs

| Événement | Branches concernées | Effet |
|-----------|-------------------|-------|
| `push` | Toutes | Exécute la validation |
| `pull_request` | `main` | Exécute la validation, affiche le statut sur la PR |
| `push` sur `main` | `main` | Validation + déploiement |

### Job 1 — `validation`

S'exécute sur tous les pushs, toutes branches confondues.

| Étape | Outil | Description |
|-------|-------|-------------|
| Vérification des fichiers | Bash | Vérifie la présence de `index.html`, `style.css`, `script.js` |
| Validation HTML | `html-validator-cli` | Contrôle la conformité de la structure HTML |
| Validation CSS | `stylelint` + `stylelint-config-recommended` | Détecte les erreurs CSS réelles (config non stricte) |
| Validation JavaScript | `eslint` | Détecte les erreurs de syntaxe JS avant déploiement |

### Job 2 — `deploy`

Ne s'exécute **que sur `main`**, et uniquement si le job `validation` a réussi (`needs: validation`).

| Étape | Outil | Description |
|-------|-------|-------------|
| Déploiement | `peaceiris/actions-gh-pages@v4` | Publie le contenu sur la branche `gh-pages` |

### Schéma d'exécution

```
Push sur n'importe quelle branche
            │
            ▼
    ┌───────────────┐
    │  validation   │  ← HTML + CSS + JS
    └───────┬───────┘
            │
     ┌──────┴──────┐
     │             │
  ❌ Échec      ✅ Succès
     │             │
  Pipeline      Branch main ?
  stoppé       ┌────┴────┐
              Non       Oui
               │         │
            Aucune   ┌───────┐
            action   │ deploy│
                     └───────┘
```

---

## Travailler en équipe

### Workflow recommandé

```bash
# 1. Créer une branche depuis main
git checkout -b feature/ma-modification

# 2. Effectuer les modifications

# 3. Pousser la branche
git push origin feature/ma-modification

# 4. Ouvrir une Pull Request vers main sur GitHub
# → La validation se déclenche automatiquement
# → ✅ coche verte ou ❌ croix rouge apparaît sur la PR

# 5. Merger uniquement si la validation est verte
```

### Branch protection (obligatoire en équipe)

Pour empêcher tout merge malgré une validation échouée, activer la protection de branche :

```
Settings → Branches → Add branch protection rule
  Branch name pattern : main
  ☑ Require a pull request before merging
  ☑ Require status checks to pass before merging
      → Sélectionner le job : validation
```

Sans cette configuration, un développeur peut merger malgré une croix rouge — la protection de branche rend le passage de la validation obligatoire.

---

## Déploiement

### Configuration initiale

1. Aller dans **Settings → Pages**
2. Source : déployer depuis la branche `gh-pages`
3. Sauvegarder

Le site sera accessible à l'adresse :

```
https://<username>.github.io/<repo>/
```

### Mettre à jour le site

Tout push sur `main` déclenche un déploiement automatique si la validation réussit.

```bash
git add .
git commit -m "feat: description de la modification"
git push origin main
```

---

## Technologies

| Catégorie | Outil | Rôle |
|-----------|-------|------|
| Frontend | HTML / CSS / JavaScript | Site statique, aucune dépendance |
| CI/CD | GitHub Actions | Automatisation validation et déploiement |
| Hébergement | GitHub Pages | Mise en ligne gratuite depuis le dépôt |
| Validation HTML | `html-validator-cli` | Conformité de la structure HTML |
| Validation CSS | `stylelint` | Détection des erreurs CSS |
| Validation JS | `ESLint` | Détection des erreurs de syntaxe JavaScript |
| Déploiement | `peaceiris/actions-gh-pages@v4` | Publication sur GitHub Pages |

---

## Licence

Ce projet est fourni à titre de démonstration. Aucune licence open-source n'est appliquée.
