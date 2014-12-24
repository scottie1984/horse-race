#!/bin/sh
NODE_ENV=development supervisor -e 'html|js' node bin/www
