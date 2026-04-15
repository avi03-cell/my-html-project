FROM nginx:alpine

# Copy website files
COPY index.html /usr/share/nginx/html/index.html

# Make nginx listen on port 8080 (Cloud Run requirement)
RUN sed -i 's/listen       80;/listen 8080;/' /etc/nginx/conf.d/default.conf

ENV PORT 8080

EXPOSE 8080