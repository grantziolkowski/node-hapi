FROM postgres:13

ENV POSTGRES_PASSWORD=password
ENV DATABASE_NAME=hapijs_knex_test

COPY ./src/_db/setup.sql /docker-entrypoint-initdb.d/init.sql
RUN sed -i "s/:database/$DATABASE_NAME/g" /docker-entrypoint-initdb.d/init.sql
