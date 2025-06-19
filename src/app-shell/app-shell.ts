import {withController} from '@snar/lit';
import {LitElement, html} from 'lit';
import {withStyles} from 'lit-with-styles';
import {customElement} from 'lit/decorators.js';
import {voteTypes} from '../constants.js';
import {F, store} from '../store.js';
import styles from './app-shell.css?inline';
import toast from 'toastit';

declare global {
	interface Window {
		app: AppShell;
	}
	interface HTMLElementTagNameMap {
		'app-shell': AppShell;
	}
}

@customElement('app-shell')
@withStyles(styles)
@withController(store)
export class AppShell extends LitElement {
	render() {
		return html`<!-- -->
			<header>
				<h2 class="flex items-center gap-2 justify-center">
					<md-icon>fmd_bad</md-icon>Gens du Voyage au parc de Lezennes
				</h2>
				<md-filled-card class="flex flex-row items-center gap-5 p-5" primary>
					<md-icon>info</md-icon>
					<div>
						Sondage 100% anonyme : aucune information personnelle n'est
						demandée.<br />
						À caractère informatif, mais pourra servir de support dans d'autres
						procédures.<br />
						Les résultats actuels seront dévoilés seulement après votre vote
						enregistré.
					</div>
				</md-filled-card>
			</header>
			<p>Êtes-vous pour ou contre l’installation de ce camp ?</p>
			<div class="flex flex-col gap-5">
				<md-outlined-segmented-button-set
					@segmented-button-set-selection=${(event: CustomEvent) => {
						const {index} = event.detail;
						const type = voteTypes[index];
						store.voteType = type;
					}}
				>
					<md-outlined-segmented-button
						label="Pour"
						?selected=${store.voteType === 'Pour'}
					>
						<md-icon slot="icon">thumb_up</md-icon>
					</md-outlined-segmented-button>
					<md-outlined-segmented-button
						label="Contre"
						?selected=${store.voteType === 'Contre'}
					>
						<md-icon slot="icon">thumb_down</md-icon>
					</md-outlined-segmented-button>
				</md-outlined-segmented-button-set>
				<div class="flex flex-col gap-3">
					<p primary>
						Toute remarque est importante quelque soit votre vote.<br />
						Par exemple, s’il y a des choses qui vous dérangent, ou si vous
						n’êtes pas contre mais que vous avez des suggestions pour améliorer
						leur acceptation, faites-le-nous savoir.
					</p>
					${F.TEXTAREA('Remarques', 'remarks', {rows: 6})}
				</div>
				<md-filled-button
					?disabled=${!store.voteType && store.canVote()}
					class="mb-20"
					@click=${() => {
						if (!store.canVote()) {
							toast("Can't vote.");
							return;
						}
						store.submit();
					}}
					>Soumettre</md-filled-button
				>
			</div>
			<!-- -->`;
	}

	async connectedCallback() {
		super.connectedCallback();
		if (!this.hasUpdated) {
			await this.updateComplete;
		}
		shell.loading = false;
	}
}

export const app = (window.app = new AppShell());
