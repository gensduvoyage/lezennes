import {bodyParser, cors, Koa, Router} from '@vdegenne/koa';
import {ArrayJSONDataFile} from '@vdegenne/server-helpers';
const __dirname = import.meta.dirname;

class DataStructure extends ArrayJSONDataFile<VoteWithIP> {
	getItemFromIP(IP: string) {
		return this._data.find((item) => item.IP === IP);
	}
}

const data = new DataStructure(`${__dirname}/../../data.json`, {
	beautifyJson: true,
	force: true,
});

const fields = ['id', 'type', 'IP', 'remarks'] as const;
true as AllKeysPresent<VoteWithIP, typeof fields>;

const PORT = 41351;
const app = new Koa();
app.proxy = true;
app.use(cors());
const router = new Router();

router.get('/api/my-ip', (ctx) => {
	ctx.body = {ip: ctx.ip};
});

router.get('/api/can-vote', (ctx) => {
	ctx.body = {canVote: data.getItemFromIP(ctx.ip)};
});

// router.post('/api/vote', bodyParser(), (ctx) => {});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}/`);
});
