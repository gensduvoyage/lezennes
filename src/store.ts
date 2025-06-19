import {ReactiveController, state} from '@snar/lit';
import {saveToLocalStorage} from 'snar-save-to-local-storage';
import toast from 'toastit';
import {API} from './API.js';
import {confirm} from './confirm.js';
import {FormBuilder} from './forms/FormBuilder.js';

@saveToLocalStorage('gensduvoyage:store')
export class AppStore extends ReactiveController {
	@state() voteType: VoteType | null = null;
	@state() remarks: string = '';
	@state() voted: boolean | null = null;

	firstUpdated() {
		if (this.voted === null) {
			API.findVote().then((vote) => {
				if (vote) {
					this.voted = true;
					this.voteType = vote.type;
					this.remarks = vote.remarks;
				} else {
					this.voted = false;
				}
			});
		}
	}

	canVote() {
		const hash = window.location.hash.slice(1);
		if (hash.length === 1) {
			return false;
		}
		if (this.voted === true) {
			return false;
		}
		return true;
	}

	@confirm({
		headline: 'Êtes-vous sûr de continuer ?',
		content:
			"Vous ne pouvez voter qu'une seule fois et une fois votre vote pris en compte vous ne pourrez pas le modifier !",
	})
	async submit() {
		try {
			const {ok} = await API.vote({type: this.voteType, remarks: this.remarks});
			if (ok) {
				toast('Vote pris en compte, merci.');
				store.voted = true;
				window.location.hash = '#0';
			}
		} catch {
			toast('Une erreur est survenue, veuillez réessayer plus tard...');
		}
	}
}

const store = new AppStore();
const F = new FormBuilder(store);
export {F, store};
