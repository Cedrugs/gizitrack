FROM httpd:2.4

COPY . /usr/local/apache2/htdocs/

RUN chmod -R a+rx /usr/local/apache2/htdocs/