# Listing des Événements du Serveur IO

## Événement 1 : USER_CONNECTED

### Description
Cet événement se déclenche lorsqu'un utilisateur se connecte au serveur.

### Structure de Données
- **userId** : String (Identifiant unique de l'utilisateur)
- **timestamp** : Date (Date et heure de la connexion)

---

## Événement 2 : USER_DISCONNECTED

### Description
Se produit lorsque l'utilisateur se déconnecte du serveur.

### Structure de Données
- **userId** : String (Identifiant unique de l'utilisateur)
- **timestamp** : Date (Date et heure de la déconnexion)

---

## Événement 3 : MESSAGE_SENT

### Description
Déclenché quand un utilisateur envoie un message dans le chat.

### Structure de Données
- **userId** : String (Identifiant unique de l'utilisateur)
- **message** : String (Contenu du message)
- **timestamp** : Date (Date et heure de l'envoi)

---

## Événement 3.5 : MESSAGE_RECEIVED

### Description
Déclenché quand un utilisateur recois un message dans le chat.

### Structure de Données
- **userId** : String (Identifiant unique de l'utilisateur)
- **message** : String (Contenu du message)
- **timestamp** : Date (Date et heure de l'envoi)

---

## Événement 4 : FILE_UPLOADED

### Description
Se produit lorsqu'un utilisateur télécharge un fichier sur le serveur.

### Structure de Données
- **userId** : String (Identifiant unique de l'utilisateur)
- **fileName** : String (Nom du fichier téléchargé)
- **fileSize** : Number (Taille du fichier en octets)
- **timestamp** : Date (Date et heure du téléchargement)

---

## Événement 5 : USER_STATUS_CHANGED

### Description
Déclenché lorsque l'état d'un utilisateur change (en ligne, hors ligne, occupé, etc.).

### Structure de Données
- **userId** : String (Identifiant unique de l'utilisateur)
- **newStatus** : String (Nouvel état de l'utilisateur)
- **timestamp** : Date (Date et heure du changement)

---

## Événement 6 : GROUP_CREATED

### Description
Se produit lorsqu'un nouveau groupe est créé par un utilisateur.

### Structure de Données
- **groupId** : String (Identifiant unique du groupe)
- **creatorId** : String (Identifiant de l'utilisateur qui a créé le groupe)
- **timestamp** : Date (Date et heure de la création)

---

## Événement 7 : GROUP_MEMBER_ADDED

### Description
Déclenché lorsqu'un membre est ajouté à un groupe.

### Structure de Données
- **groupId** : String (Identifiant unique du groupe)
- **userId** : String (Identifiant de l'utilisateur ajouté)
- **timestamp** : Date (Date et heure de l'ajout)

---

## Événement 8 : GROUP_MEMBER_REMOVED

### Description
Déclenché lorsqu'un membre est retiré d'un groupe.

### Structure de Données
- **groupId** : String (Identifiant unique du groupe)
- **userId** : String (Identifiant de l'utilisateur ajouté)
- **timestamp** : Date (Date et heure de l'ajout)

---

## Événement 9 : NOTIFICATION_RECEIVED

### Description
Se produit lorsqu'un utilisateur reçoit une notification.

### Structure de Données
- **userId** : String (Identifiant unique de l'utilisateur)
- **notificationType** : String (Type de notification)
- **timestamp** : Date (Date et heure de la réception)

---

## Événement 10 : USER_SETTINGS_UPDATED

### Description
Déclenché lorsque l'utilisateur met à jour ses paramètres.

### Structure de Données
- **userId** : String (Identifiant unique de l'utilisateur)
- **settingName** : String (Nom du paramètre mis à jour)
- **newValue** : Any (Nouvelle valeur du paramètre)
- **timestamp** : Date (Date et heure de la mise à jour)

---

## Événement 11 : ERROR_OCCURED

### Description
Se produit lorsqu'une erreur survient sur le serveur.

### Structure de Données
- **errorCode** : String (Code de l'erreur)
- **errorMessage** : String (Message d'erreur détaillé)
- **timestamp** : Date (Date et heure de l'erreur)

---

## Événement 12 : CONNECTION_ERROR

### Description
Une erreur est survenue lors de la tentative de connexion.

### Structure de Données
- **errorCode** : String (Code de l'erreur)
- **errorMessage** : String (Message d'erreur détaillé)
- **timestamp** : Date (Date et heure de l'erreur)

---

## Événement 13 : DATA_RECEIVED

### Description
L'application a reçu des données depuis le serveur.

### Structure de Données
- **dataType** : String 
- **data** : Object
- **timestamp** : Date
---

## Événement 14 : USER_CHANGED_GROUP

### Description
Un utilisateur a changé de groupe / channel.

### Structure de Données
- **userId** : String 
- **newChannelId** : Object
- **timestamp** : Date

---

