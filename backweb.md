Spec pour communication back/web
===

Requêtes pour obtenir des entités gécodées :
---

### Route

Les requêtes sont effectuées en GET sur la route publique : ```/getActions```

### Paramètres

Les paramètres suivants peuvent être envoyés :

	{
		"type": [ type0, type1, ..., typeN ],
		"cible": [ public0, public1, ..., publicN ],
		"startDate": 2012-04-01,
		"endDate": 2013-07-01,
	}

**type** : array contenant les IDs des types d'action (plaidoyer, dépistage, etc). Array vide ou absence du paramètre = tous les types d'actions. ==> il faudra me communiquer les IDs utilisés en base.

**cible** : array contenant les IDs des types de public (femmes enceintes, jeunes, etc). Array vide ou absence du paramètre = tous les types de public ==> il faudra me communiquer les IDs utilisés en base.

**startDate** : date de début au format YYYY-MM-DD (ISO 8601). Absence du paramètre: pas de date de début.

**endDate** : date de fin au format YYYY-MM-DD (ISO 8601). Absence du paramètre: pas de date de début.

Exemple d'url en GET :

	/getActions?type[]=1&type[]=2&type[]=3&startDate=2012-04-01&endDate=2015-04-01


Pour récupérer ces array en Django : ```request.GET.getlist('cible')```


### Resource

Au format GeoJSON. Les actions sont identifiées par des ```Feature``` et une géométrie de type ```Point```. Les données associées sont dans l'objet ```properties```.

**propriétés** 

À définir en détail.

	{
		"titre": "[string]",
		"startDate": "[YYYY-MM-DD]",
		"endDate": "[YYYY-MM-DD]",
		"statut": "completed|pending"
		"organisme": {
			"id": "[string]",
			"nom": "[string]",
			"description": "[string]"
		},

		"type": [
			{
				"id": "[string]",
				"nom": "[string]"
			},
			...
		],

		cible: [
			{
				"id": "[string]",
				"nom": "[string]"
			},
			...
		]

	}

```endDate``` peut être omis dans le cas d'une action en cours.
	

Exemple de GeoJSON complet :
	
	{
	  "type": "FeatureCollection",
	  "features": [
	    {
	      "type": "Feature",
	      "properties": {
			"titre": "Titre de l"action",
			"startDate": "2014-01-01",
			"endDate": "2015-01-01",
			"statut": "completed"
			"organisme": {
				"id": "1",
				"nom": "MSF",
				"description": "description de MSF..."
			},
			"type": [
				{
					"id": "1",
					"nom": "Dépistage"
				}
			],
			cible: [
				{
					"id": "27",
					"nom": "Populations migrantes"
				},
				{
					"id": "33",
					"nom": "Populations carcérales"
				}
			]
	      },
	      "geometry": {
	        "type": "Point",
	        "coordinates": [
	          42.1875,
	          58.81374171570782
	        ]
	      }
	    },
	    {
	      "type": "Feature",
	      "properties": {
	      	"titre": "Titre de l"action 2",
			"startDate": "2013-05-01",
			"statut": "pending"
			"organisme": {
				"id": "43",
				"nom": "Onusida",
				"description": "description de Onusida..."
			},
			"type": [
				{
					"id": "1",
					"nom": "Dépistage"
				},
				{
					"id": "5",
					"nom": "Prise en charge médicale"
				}
			],
			cible: [
				{
					"id": "27",
					"nom": "Populations migrantes"
				}
			]
	      },
	      "geometry": {
	        "type": "Point",
	        "coordinates": [
	          60.8203125,
	          58.99531118795094
	        ]
	      }
	    }
	  ]
	}

