import {bodyParser, Koa, Router} from '@vdegenne/koa';

const PORT = 41351;
const app = new Koa();
const router = new Router();

router.get('/api/my-ip', (ctx) => {
	ctx.body = {ip: ctx.ip};
});

router.post('/api/vote', bodyParser(), (ctx) => {});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}/`);
});
