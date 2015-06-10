Cela fait bien longtemps que je suis intéressé par les mesures météo. Depuis quelques années, j'ai 
une [station du commerce][1], de la marque IROX, avec un capteur de température extérieure et une 
station intérieure au design plutôt réussi. Malheureusement jamais rien n'a fonctionné comme attendu.
L'appairage des deux éléments est laborieux, la portée un peu courte. L'heure ne se met pas à jour
automatiquement et pour couronner le toute, la station extérieure a cessé de fonctionner après quelques
mois, surement dû à l'humidité et aux araignées qui ont élu domicile dans le boitier.

Investir dans une station de plus haute gamme, avec possibilité d'enregistrement des valeurs et une
plus grande variété de capteurs, ne m'attire pas, notamment à cause du prix prohibitif de ce genre de
solution, mais aussi vu le design très _années 80_ des stations intérieures. En général un énorme LCD,
rempli de chiffres en tout genre, mais finalement très peu lisible. Le manque de transparence pour le
transfer de donnée sur un serveur est aussi rebutant.

Durant cette même période, mon intérêt pour le monde des _makers _ avec notamment l’[Arduino][2] et le
[RaspberryPi][3] n’a cessé d’augmenter. C’est donc assez naturellement qu’un projet de station météo 
tournant sur des Arduino voit le jour. 

L'idée est assez simple, avoir un Arduino à l'extérieur qui mesure un maximum de variables et qui les 
transmet par radio à un autre Arduino situé dans mon salon. Ce second Arduino est connecté au serveur
pour enregistrer les valeurs. Il contrôle aussi l'affichage de la station IROX. Finalement le serveur
se charge de restituer ces valeurs par le biais de pages web.

Ce blog retracera toutes les aventures liées à ce projet. Il parlera d'électronique, d'informatique, 
de menuiserie et de météorologie ... bonne lecture.


[1]: http://www.irox.com/fr/Produits/Stations_Meteo/EBR606C.htm
[2]: http://www.arduino.cc
[3]: http://www.raspberrypi.org
