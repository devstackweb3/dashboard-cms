# dashboard-cms | Back-End (Notion inspired)
CMS - Content Management System | Articles, Authors &amp; Customers requests

## Tech Stack 
- NextJS (Node module)
- Hasura Client
Récupération des données sur la database PostGre 
Hasura Serveur permet de faire fonctionner de manière constante les API 
- Apollo Client
  simplifie les requêtes envoyées à Hasura -> pas besoin de déclarer le fetch des objets JSON réceptionnés du coté client ni de conceptualiser chaque méthode CRUD du coté Back-End. 
  permet de déclarer des requêtes directement du coté front
- PostGreSQL | 

### Tools
- pgAdmin4 | Graphical Overview of PostGreSQL
- Docker | Hasura serveur sur container docker

  `Image docker (catalogue de services)`

  `Container docker (généré depuis image docker)`

- NextJS | npm run dev

## Deployment Configuration 

### Docker | Image "hasura/graphql-engine"
Container "nervous_hermann"
*Nom du container est amené à évoluer si Container Docker est amené à être stoppé/redémarré*
Héberge le serveur hasura
Checker l'état des container actifs | VPS : 
`sudo docker ps`

Déploiement container | ordinateur local : 
start

### 
