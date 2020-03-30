mongoimport --db production --collection conferences \
--authenticationDatabase production --username "prodUser" \
--password "superSecret" --drop --file /docker-entrypoint-initdb.d/conferences.json
