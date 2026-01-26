FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /neimark-admin

COPY /build /neimark-admin/build
COPY ./nginx.conf /etc/nginx/nginx.conf