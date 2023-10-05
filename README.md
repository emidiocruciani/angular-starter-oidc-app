# angular-starter-oidc-app

Angular app with OIDC enabled. This project is part of a 
bundle of services that I'm developing for learning purposes only. Once 
finished, this repository could be a starting point for an app that requires OIDC.

### Technology stack
- docker
- angular

## Disclaimer

Files included in this repository are meant to be used in local
environment only. Please ensure all passwords or keys included here are not
used in production.

### List of files that include keys/passwords/secrets
- ./local/compose.yml

## Requirements

- Docker image for auth server [see](https://github.com/emidiocruciani/django-starter-oidc-authserver/)
- Docker image for resource server [see](https://github.com/emidiocruciani/spring-starter-oidc-resourceserver/)

## Installation

```shell
# ensure angular and node 18 are installed

# ensure required docker images were built (see previous paragraph)

# install and run services
. ./local/scripts/install
```

## Related projects

- Auth server [django-starter-oidc-authserver](https://github.com/emidiocruciani/django-starter-oidc-authserver/)
- Resource server [spring-starter-oidc-resourceserver](https://github.com/emidiocruciani/spring-starter-oidc-resourceserver/)
