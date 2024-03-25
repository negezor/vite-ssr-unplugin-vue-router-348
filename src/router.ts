import { routes } from 'vue-router/auto-routes';

console.log('routes', routes);

if (routes === undefined) {
    throw new Error('Imported routes from vue-router/auto-routes is undefined');
}

export function createRouter() {
    // ...
}