Uses
[express](),
[passport](),
[connect-redis](),
[express-session](),
[pouchdb](),
[pouchdb-find]()*,
[falcor](),
[falcor-express](),
[falcor-router](),
[falcor-http-datasource](?),
[react](),
[redux](),
[redux-promises](?),
[redux-falcor](https://github.com/ekosz/redux-falcor),
[redux-pouchdb](),
[redux-search](),
[redux-simple-router](),
[react-router](),
[react-motion](),
[react-motion-ui-pack](?),
[react-headroom](),
[react-helmet](),
[react-intl](?),
[react-portal](),
[react-maps](?),
[radium](),

Development
[babel](),
[webpack](),
[webpack-devserver](),
[redux-devtools](),
[react-transform]()



For the first stages of the app, it will use a monolythic server structure running the whole app and api in the same node instance.

Redis will be used to store sessions, PouchDB running with PouchDB-Server will be used for user information data syncing and offline capabilities.




## Todos
- Convert server from Hapi to Express
- If logged pre-fetch user data, user device, user location and locale
- Server with Passport authentication and session
- Login component (auth)
- Server with Falcor API routing
- Mobile and Desktop navbar component (Link components)
- Mobile Home component and Desktop List and <aps component (star, add)
- Mobile and Desktop Item component (star, add)
- Mobile and Desktop Agenda component (user.agenda)
- Mobile and Desktop Dashboard component (logged-in)
- Mobile and Desktop User component (follow, message)
- Mobile and Desktop Search component (redux-search)


## Data model
```
User = {
	_id: string,
	slug: string,
	name: string,
	password: hash,
	avatar: string,
	location: {
		city: string,
		state: string,
		country: string,
	},
	about: string,
	starred: [pointItemId: string...],
	agenda: [{
		agendaItemId: string,
		coverId: string,
		items: [{
			pointItemId: string,
			comments: [{
					userId: string,
					body: string,
					votes: int
			}...],
			coverId: string,
			mediaId: [string...],
			date: string,
			time: string
		}...],
	}...],
	guide: {
		verified: bool,
		credentials: string,
		regions: [regionId...]
		comments: [{
			userId: string,
			body: string,
			votes: int
		}...],
		intineraries: [agendaItemId: string...],
		badges: [badgeId: string...]

	}
	permissions: [{
		pointItemId: string,
		role: string
	}...],
	followers: [userId...],
	settings: {
		locale: string,
		locationHistory: [string...],
		currentLocationId: string,
		monthlyFee: string,
		cards [{
			cardNumber: string,
			cardName: string,
			cardSafety: int
		}],
		paymentHistory: [{
			date: string,
			value: int
		}]
	},
	messages: [{
		userId: string,
		date: string,
		seen: bool,
		body: string
	}...],
	notifications: [{
		pointItemId: string,
		userId: string,
		status: string,
		body: string
	}...]
}

Points = [{
	_id: string,
	slug: string,
	rank: int,
	category: string,
	title: string,
	avatar: string,
	media: [string...],
	description: string,
	contact: {
		email: string,
		address: string,
		phones: [string...],

	},
	location: {
		placeId: string,
		regionId: string,
		lat: int,
		lng: int
	},
	stars: int,
	added: int,
	creatorId: string,
	addons: [string]
	messages: [{
		userId: string,
		date: string,
		seen: bool,
		body: string
	}...],
	notifications: [{
		pointItemId: string,
		userId: string,
		status: string,
		body: string
	}...]
}...]


```

## Installation

Make sure you're using Node >= 4.0.0.

```bash
	git clone https://github.com/luandro/hapi-universal-redux.git
	cd hapi-universal-redux

	npm install
	npm run dev     # start Hapi server and webpack-dev-server hot server

	# production build and run
	NODE_ENV=production npm run build
	NODE_ENV=production npm run start
```

## Usage

Run `npm run dev` in your terminal and play with `views/Main.js` to get a feel of
the server-side rendering and client-side hot updates.


## License

Copyright © 2015, Moinho Digital. All rights reserved. May not be copied without permission.
