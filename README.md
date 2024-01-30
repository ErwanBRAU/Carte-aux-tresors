La version de node utilisée pour ce projet est la v18.17.1.

Pour lancer le projet, se positionner dans le dossier src et lancer la commande
`node treasureMap.js [emplacement du fichier d'entrée] [emplacement du fichier de sortie]`.
Positionner le fichier d'entrée dans le dossier "data" pour plus de cohérence. La variable `emplacement du fichier d'entrée` doit donc être de la sorte `../data/[nom du fichier.txt]`.
De même, pour la variable `emplacement du fichier de sortie`, qui doit être de la sorte `../data/[nom du fichier.txt]`.
Si aucune valeur n'est entrée, le code attribue par défaut les valeurs :

- `emplacement du fichier d'entrée` = '../data/wordingData.txt'
- `emplacement du fichier de sortie` = '../data/solvedWording.txt'

Pour lancer les tests, se positionner dans le dossier parent du projet et lancer la commande `npm tun testJest`.
