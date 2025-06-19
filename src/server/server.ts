import {bodyParser, cors, Koa, Router} from '@vdegenne/koa';
import {ArrayJSONDataFile, checkFields} from '@vdegenne/server-helpers';
const __dirname = import.meta.dirname;

class DataStructure extends ArrayJSONDataFile<VoteWithIP> {
	getItemFromIP(IP: string) {
		return this._data.find((item) => item.IP === IP);
	}

	getStats(): Stats {
		return {
			total: this._data.length,
			pour: this._data.filter((i) => i.type === 'Pour').length,
			contre: this._data.filter((i) => i.type === 'Contre').length,
		};
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

router.get('/api/find-vote', (ctx) => {
	const body: API_findVote = {
		vote: data.getItemFromIP(ctx.ip),
		stats: data.getStats(),
	};
	ctx.body = body;
});

router.post('/api/vote', bodyParser(), (ctx) => {
	const object = checkFields<VoteWithIP>({
		ctx,
		fields: fields as any,
		requireds: ['type'],
	});
	const ip = ctx.ip;
	if (!ip) {
		ctx.throw("Couldn't register vote.");
	}
	object.IP = ip;
	delete object.id; // Removing id if the user is kidding around.
	data.push(object as VoteWithIP);
	ctx.body = {} as any;
});

router.get('/api/stats', (ctx) => {
	ctx.body = data.getStats();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}/`);
});
