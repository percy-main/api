###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY --chown=node:node package.json ./package.json
COPY --chown=node:node yarn.lock ./yarn.lock
RUN yarn install

# Copy source code
COPY --chown=node:node . .

# Set user
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./package.json
COPY --chown=node:node yarn.lock ./yarn.lock

# Copy dependencies from dev stage
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# Copy source
COPY --chown=node:node . .

# Run the build command to create production bundle
RUN yarn build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Re-install only production dependencies
RUN yarn install --production

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

WORKDIR /usr/src/app

# Copy deps, bundled code, and env config from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env.* ./

ENV VERSION=

# Start the server using the production build
CMD [ "node", "-r", "dotenv-flow/config", "dist/main" ]