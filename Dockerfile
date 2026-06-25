# Utilisation d'une image de base allégée et officielle
FROM node:22-alpine

# Définition du répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie uniquement des fichiers de description des dépendances pour optimiser le cache Docker
COPY package.json package-lock.json ./

# Installation des dépendances de production uniquement
RUN npm ci --only=production

# Copie du reste du code source
COPY . .

# Sécurité : On change le propriétaire des fichiers vers l'utilisateur restreint "node" natif de l'image
RUN chown -R node:node /usr/src/app

# Sécurité : On passe sur l'utilisateur "node" au lieu de "root" pour l'exécution
USER node

# Exposition du port défini par l'application
EXPOSE 3000

# Commande de lancement du serveur
CMD ["npm", "start"]
