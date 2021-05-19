# See frontend/dev-sandbox-console-plugin/README.md for details.

# Stage 0: build the demo plugin
# Manually pre-build the demo plugin:
# cd frontend
# yarn install
# cd dev-sandbox-console-plugin
# yarn install
# yarn build

# Stage 1: build the target image
FROM node:10

USER root

COPY ./dist /opt/dev-sandbox-console-plugin/dist
COPY ./node_modules /opt/dev-sandbox-console-plugin/node_modules
COPY ./http-server.sh /opt/dev-sandbox-console-plugin/http-server.sh

LABEL io.k8s.display-name="Dev Sandbox Console Plugin" \
      io.k8s.description="Provides an OpenShift console plugin for capturing events in segment.io." \
      io.openshift.tags="openshift,dev-sandbox,segmentio,telemetry" \
      maintainer="Christian Vogt <cvogt@redhat.com>"

RUN chmod g+wr -R /opt/dev-sandbox-console-plugin/dist

USER node

WORKDIR /opt/dev-sandbox-console-plugin
ENTRYPOINT [ "./http-server.sh", "./dist" ]
