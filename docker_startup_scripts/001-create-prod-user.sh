mongo --username "$MONGO_INITDB_ROOT_USERNAME" --password "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase "admin" \
--eval "db = db.getSiblingDB('production'); db.createUser({user: 'prodUser', pwd: 'superSecret', roles: [ { role: 'readWrite', db: 'production' } ]});"

mongo --username "$MONGO_INITDB_ROOT_USERNAME" --password "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase "admin" \
--eval "db = db.getSiblingDB('test'); db.createUser({user: 'testUser', pwd: 'superSecret', roles: [ { role: 'readWrite', db: 'test' } ]});"
